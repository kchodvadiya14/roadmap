#!/usr/bin/env python3

import sys
import json
import requests
from datetime import datetime
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text

console = Console()

def fetch_user_activity(username):
    """Fetch user activity from GitHub API."""
    url = f"https://api.github.com/users/{username}/events"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Activity-CLI"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            console.print(f"[red]Error: User '{username}' not found on GitHub[/red]")
        elif response.status_code == 403:
            console.print("[red]Error: GitHub API rate limit exceeded. Please try again later.[/red]")
        else:
            console.print(f"[red]Error: Failed to fetch user activity: {str(e)}[/red]")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        console.print(f"[red]Error: Network error occurred: {str(e)}[/red]")
        sys.exit(1)

def format_event(event):
    """Format a single GitHub event into a readable string."""
    event_type = event['type']
    repo_name = event['repo']['name']
    created_at = datetime.strptime(event['created_at'], "%Y-%m-%dT%H:%M:%SZ")
    formatted_date = created_at.strftime("%Y-%m-%d %H:%M:%S")
    
    if event_type == 'PushEvent':
        commits = event['payload']['commits']
        commit_count = len(commits)
        return f"Pushed {commit_count} commit{'s' if commit_count != 1 else ''} to {repo_name} ({formatted_date})"
    
    elif event_type == 'IssuesEvent':
        action = event['payload']['action']
        issue_title = event['payload']['issue']['title']
        return f"{action.capitalize()} issue '{issue_title}' in {repo_name} ({formatted_date})"
    
    elif event_type == 'WatchEvent':
        return f"Starred {repo_name} ({formatted_date})"
    
    elif event_type == 'CreateEvent':
        ref_type = event['payload']['ref_type']
        return f"Created {ref_type} in {repo_name} ({formatted_date})"
    
    elif event_type == 'ForkEvent':
        return f"Forked {repo_name} ({formatted_date})"
    
    else:
        return f"{event_type} in {repo_name} ({formatted_date})"

def display_activity(events):
    """Display the user's activity in a formatted table."""
    if not events:
        console.print("[yellow]No recent activity found for this user.[/yellow]")
        return

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Activity", style="cyan")
    
    for event in events:
        formatted_event = format_event(event)
        table.add_row(formatted_event)
    
    console.print("\n")
    console.print(Panel.fit(table, title="GitHub Activity", border_style="green"))
    console.print("\n")

def main():
    if len(sys.argv) != 2:
        console.print("[red]Error: Please provide a GitHub username[/red]")
        console.print("Usage: python github_activity.py <username>")
        sys.exit(1)

    username = sys.argv[1]
    console.print(f"[bold green]Fetching activity for GitHub user: {username}[/bold green]")
    
    events = fetch_user_activity(username)
    display_activity(events)

if __name__ == "__main__":
    main() 