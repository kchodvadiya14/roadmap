import sys
import json
import os
from datetime import datetime

TASK_FILE = 'tasks.json'

def load_tasks():
    if not os.path.exists(TASK_FILE):
        with open(TASK_FILE, 'w') as f:
            json.dump([], f)
    with open(TASK_FILE, 'r') as f:
        return json.load(f)

def save_tasks(tasks):
    with open(TASK_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

def get_new_id(tasks):
    return max([task['id'] for task in tasks], default=0) + 1

def add_task(description):
    tasks = load_tasks()
    now = datetime.now().isoformat()
    task = {
        "id": get_new_id(tasks),
        "description": description,
        "status": "todo",
        "createdAt": now,
        "updatedAt": now
    }
    tasks.append(task)
    save_tasks(tasks)
    print(f"Task added successfully (ID: {task['id']})")

def update_task(task_id, new_description):
    tasks = load_tasks()
    for task in tasks:
        if task['id'] == task_id:
            task['description'] = new_description
            task['updatedAt'] = datetime.now().isoformat()
            save_tasks(tasks)
            print(f"Task {task_id} updated successfully.")
            return
    print(f"Task with ID {task_id} not found.")

def delete_task(task_id):
    tasks = load_tasks()
    updated_tasks = [task for task in tasks if task['id'] != task_id]
    if len(updated_tasks) == len(tasks):
        print(f"Task with ID {task_id} not found.")
    else:
        save_tasks(updated_tasks)
        print(f"Task {task_id} deleted successfully.")

def mark_in_progress(task_id):
    tasks = load_tasks()
    for task in tasks:
        if task['id'] == task_id:
            task['status'] = 'in-progress'
            task['updatedAt'] = datetime.now().isoformat()
            save_tasks(tasks)
            print(f"Task {task_id} marked as in-progress.")
            return
    print(f"Task with ID {task_id} not found.")

def mark_done(task_id):
    tasks = load_tasks()
    for task in tasks:
        if task['id'] == task_id:
            task['status'] = 'done'
            task['updatedAt'] = datetime.now().isoformat()
            save_tasks(tasks)
            print(f"Task {task_id} marked as done.")
            return
    print(f"Task with ID {task_id} not found.")

def list_tasks(filter_by_status=None):
    tasks = load_tasks()
    if filter_by_status:
        tasks = [task for task in tasks if task['status'] == filter_by_status]

    if not tasks:
        print("No tasks found.")
        return

    for task in tasks:
        print(f"ID: {task['id']}")
        print(f"Description: {task['description']}")
        print(f"Status: {task['status']}")
        print(f"Created At: {task['createdAt']}")
        print(f"Updated At: {task['updatedAt']}")
        print("-" * 40)

def print_help():
    print("""
Usage:
  task-cli.py add "Task description"
  task-cli.py update <id> "New description"
  task-cli.py delete <id>
  task-cli.py mark-in-progress <id>
  task-cli.py mark-done <id>
  task-cli.py list
  task-cli.py list todo
  task-cli.py list done
  task-cli.py list in-progress
""")

if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print_help()
        sys.exit(1)

    command = args[0]

    if command == "add" and len(args) > 1:
        add_task(" ".join(args[1:]))

    elif command == "update" and len(args) > 2:
        try:
            update_task(int(args[1]), " ".join(args[2:]))
        except ValueError:
            print("Invalid ID format.")

    elif command == "delete" and len(args) > 1:
        try:
            delete_task(int(args[1]))
        except ValueError:
            print("Invalid ID format.")

    elif command == "mark-in-progress" and len(args) > 1:
        try:
            mark_in_progress(int(args[1]))
        except ValueError:
            print("Invalid ID format.")

    elif command == "mark-done" and len(args) > 1:
        try:
            mark_done(int(args[1]))
        except ValueError:
            print("Invalid ID format.")

    elif command == "list":
        if len(args) == 2 and args[1] in ["todo", "done", "in-progress"]:
            list_tasks(args[1])
        else:
            list_tasks()

    else:
        print("Invalid command.")
        print_help()
