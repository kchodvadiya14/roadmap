import os
import json
from datetime import datetime
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import markdown2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Create necessary directories
os.makedirs('articles', exist_ok=True)
os.makedirs('templates', exist_ok=True)
os.makedirs('static', exist_ok=True)

# Login manager setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin'):
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def get_articles():
    articles = []
    for filename in os.listdir('articles'):
        if filename.endswith('.json'):
            with open(os.path.join('articles', filename), 'r') as f:
                article = json.load(f)
                article['slug'] = filename[:-5]  # Remove .json extension
                articles.append(article)
    return sorted(articles, key=lambda x: x['date'], reverse=True)

@app.route('/')
def home():
    articles = get_articles()
    return render_template('home.html', articles=articles)

@app.route('/article/<slug>')
def article(slug):
    try:
        with open(os.path.join('articles', f'{slug}.json'), 'r') as f:
            article = json.load(f)
            article['content'] = markdown2.markdown(article['content'])
            return render_template('article.html', article=article)
    except FileNotFoundError:
        return redirect(url_for('home'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if (username == os.getenv('ADMIN_USERNAME') and 
            password == os.getenv('ADMIN_PASSWORD')):
            session['admin'] = True
            return redirect(url_for('dashboard'))
        flash('Invalid credentials')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('admin', None)
    return redirect(url_for('home'))

@app.route('/dashboard')
@admin_required
def dashboard():
    articles = get_articles()
    return render_template('dashboard.html', articles=articles)

@app.route('/add_article', methods=['GET', 'POST'])
@admin_required
def add_article():
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        slug = title.lower().replace(' ', '-')
        
        article = {
            'title': title,
            'content': content,
            'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        with open(os.path.join('articles', f'{slug}.json'), 'w') as f:
            json.dump(article, f, indent=4)
        
        return redirect(url_for('dashboard'))
    return render_template('add_article.html')

@app.route('/edit_article/<slug>', methods=['GET', 'POST'])
@admin_required
def edit_article(slug):
    try:
        with open(os.path.join('articles', f'{slug}.json'), 'r') as f:
            article = json.load(f)
            
        if request.method == 'POST':
            title = request.form.get('title')
            content = request.form.get('content')
            new_slug = title.lower().replace(' ', '-')
            
            article = {
                'title': title,
                'content': content,
                'date': article['date']  # Keep original date
            }
            
            # Delete old file if slug changed
            if new_slug != slug:
                os.remove(os.path.join('articles', f'{slug}.json'))
            
            with open(os.path.join('articles', f'{new_slug}.json'), 'w') as f:
                json.dump(article, f, indent=4)
            
            return redirect(url_for('dashboard'))
            
        return render_template('edit_article.html', article=article)
    except FileNotFoundError:
        return redirect(url_for('dashboard'))

@app.route('/delete_article/<slug>')
@admin_required
def delete_article(slug):
    try:
        os.remove(os.path.join('articles', f'{slug}.json'))
    except FileNotFoundError:
        pass
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True) 