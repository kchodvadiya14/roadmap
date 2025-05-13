import argparse
import json
import os
from datetime import datetime

DATA_FILE = 'expenses.json'

# Load or initialize expenses
def load_expenses():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_expenses(expenses):
    with open(DATA_FILE, 'w') as f:
        json.dump(expenses, f, indent=2)

def add_expense(description, amount):
    expenses = load_expenses()
    expense = {
        "id": expenses[-1]["id"] + 1 if expenses else 1,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "description": description,
        "amount": amount
    }
    expenses.append(expense)
    save_expenses(expenses)
    print(f"# Expense added successfully (ID: {expense['id']})")

def list_expenses():
    expenses = load_expenses()
    print("# ID  Date       Description      Amount")
    for e in expenses:
        print(f"# {e['id']:<3} {e['date']}  {e['description']:<15} ${e['amount']}")

def delete_expense(expense_id):
    expenses = load_expenses()
    new_expenses = [e for e in expenses if e["id"] != expense_id]
    if len(new_expenses) == len(expenses):
        print("# Expense ID not found.")
    else:
        save_expenses(new_expenses)
        print("# Expense deleted successfully")

def update_expense(expense_id, description=None, amount=None):
    expenses = load_expenses()
    for e in expenses:
        if e["id"] == expense_id:
            if description:
                e["description"] = description
            if amount is not None:
                e["amount"] = amount
            save_expenses(expenses)
            print("# Expense updated successfully")
            return
    print("# Expense ID not found.")

def summary(month=None):
    expenses = load_expenses()
    total = 0
    for e in expenses:
        if month:
            if int(e["date"].split("-")[1]) != month:
                continue
        total += e["amount"]
    if month:
        print(f"# Total expenses for month {month}: ${total}")
    else:
        print(f"# Total expenses: ${total}")

# CLI Argument Parser
parser = argparse.ArgumentParser(description="Expense Tracker CLI")
subparsers = parser.add_subparsers(dest='command')

# Add
add_parser = subparsers.add_parser('add')
add_parser.add_argument('--description', required=True)
add_parser.add_argument('--amount', type=float, required=True)

# List
subparsers.add_parser('list')

# Delete
delete_parser = subparsers.add_parser('delete')
delete_parser.add_argument('--id', type=int, required=True)

# Update
update_parser = subparsers.add_parser('update')
update_parser.add_argument('--id', type=int, required=True)
update_parser.add_argument('--description')
update_parser.add_argument('--amount', type=float)

# Summary
summary_parser = subparsers.add_parser('summary')
summary_parser.add_argument('--month', type=int)

# Run
args = parser.parse_args()

if args.command == 'add':
    if args.amount < 0:
        print("# Amount cannot be negative.")
    else:
        add_expense(args.description, args.amount)

elif args.command == 'list':
    list_expenses()

elif args.command == 'delete':
    delete_expense(args.id)

elif args.command == 'update':
    update_expense(args.id, args.description, args.amount)

elif args.command == 'summary':
    summary(args.month)

else:
    parser.print_help()
