from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/static/javascript/<path:path>')
def get_js(path):
    return send_from_directory('static', path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/admin')
def admin_index():
    return render_template('admin/index.html')

@app.route('/admin/type')
def admin_type_index():
    return render_template('admin/type/index.html')

@app.route('/admin/type/add')
def admin_type_add():
    return render_template('admin/type/add.html')

@app.route('/admin/user')
def admin_user_index():
    return render_template('admin/user/index.html')

if __name__ == '__main__':
    app.run(debug=True)