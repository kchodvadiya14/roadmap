# Personal Blog

A simple personal blog built with Flask that allows you to write and publish articles.

## Features

- View published articles (guest section)
- Admin section for managing articles
- Basic authentication for admin access
- Markdown support for article content
- File-based storage for articles

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with the following content:
```
FLASK_APP=app.py
FLASK_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

5. Run the application:
```bash
flask run
```

The blog will be available at `http://localhost:5000`

## Project Structure

- `app.py`: Main application file
- `templates/`: HTML templates
- `static/`: CSS and other static files
- `articles/`: Directory for storing blog posts
- `requirements.txt`: Project dependencies 