# GitHub User Activity CLI

A command-line interface tool to fetch and display GitHub user activity.

## Features

- Fetch recent activity of any GitHub user
- Display activity in a clean, formatted way
- Handle errors gracefully
- No external dependencies for API calls

## Installation

1. Clone this repository
2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the CLI with a GitHub username as an argument:

```bash
python github_activity.py <username>
```

Example:
```bash
python github_activity.py kamranahmedse
```

## Output Format

The tool will display the user's recent activity in the following format:
- Pushed commits to repository
- Opened issues
- Starred repositories
- And other GitHub events

## Error Handling

The tool handles various error cases:
- Invalid usernames
- API rate limiting
- Network issues
- Invalid responses 