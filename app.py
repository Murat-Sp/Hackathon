from flask import Flask, redirect, url_for, request, render_template, flash, session, jsonify
import mysql.connector
from mysql.connector import Error
import os
from werkzeug.utils import secure_filename
import re

app = Flask(__name__)
app.secret_key = "hello"

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            password='password',
            database='projectx'
        )
        if connection.is_connected():
            print("З'єднання з MySQL успішно встановлено.")
            return connection
    except Error as e:
        print(f"Помилка підключення до MySQL: {e}")

    return None


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login')
def login():

    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('UserName')
    email = request.form.get('Email')
    password = request.form.get('Pass')

    connection = get_connection()

    if connection is None:
        return "Помилка з'єднання з базою даних.", 500

    try:
        cursor = connection.cursor()

        # Перевіряємо, чи є користувачі з введеним email у базі даних
        sql_query = "SELECT COUNT(*) FROM users WHERE email = %s"
        cursor.execute(sql_query, [email])
        emailCount = int(cursor.fetchone()[0])

        # Якщо користувач з такою поштою існує, створюємо повідомлення та перенаправляємо на register
        if(emailCount > 0):
            flash("Електронна адреса вже зареєстрована!", "error")
            return redirect(url_for("register"))
        
        sql_query = "INSERT INTO `users` (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(sql_query, (name, email, password))

        connection.commit()
        cursor.close()

        return render_template('login.html')
    
    except Error as e:
        print(f"Помилка виконання SQL-запиту: {e}")
        return "Помилка виконання запиту.", 500
    
    finally:
        if connection.is_connected():
            connection.close()
            print("З'єднання з MySQL закрито.")

            
@app.route('/check_users', methods=['POST'])
def check_users():

    email = request.form.get('Email')
    password = request.form.get('Pass')

    if not email or not password:
        return "Будь ласка, введіть email і пароль.", 400
    
    try:

        connection = get_connection()
        cursor = connection.cursor()

        sql_query = "SELECT * FROM users WHERE email = %s AND password = %s "
        cursor.execute(sql_query, (email, password))
        data = cursor.fetchone()

        cursor.close()
        connection.close()

        if data:
            session["user"] = list(data)
            return redirect(url_for("profile"))
        
        else:
            flash("Неправильний логін або пароль!", "info")
            return redirect(url_for("login"))

    except mysql.connector.Error as e:
        print(f"Помилка бази даних: {e}")
        return "Помилка сервера.", 500
    
@app.route("/dashboard")
def dashboard():
    userPic = None
    if("user" in session):
        userPic = session["user"][4]
    return render_template("dashboard.html", userPic = userPic)

@app.route('/profile')
def profile():
    if "user" in session:

        username = session["user"][1]
        userPicture = session["user"][4]

        return render_template('profile.html', userPic = userPicture, name = username)
    
    else:
        flash("Ви не ввійшли в профіль!", "error")
        return render_template("login.html")

@app.route('/upload', methods = ['POST'])
def upload():

    if "file" not in request.files:
        return jsonify({"message": "Файл не знайдено"}), 400
    file = request.files["file"]

    if(file.filename == ""):
        return jsonify({"message": "Файл не обрано"}), 400
    
    if(session["user"][4] != None):
        os.remove(session["user"][4])

    filename = secure_filename(str(session["user"][0]) + "." + file.filename.split('.')[-1])
    filepath = os.path.join("static/images/profile_pictures", filename)
    file.save(filepath)

    try:

        connection = get_connection()
        cursor = connection.cursor()

        sql_query = "UPDATE `users` SET img = %s WHERE id = %s"
        cursor.execute(sql_query, (filepath, session["user"][0]))

        connection.commit()
        cursor.close()
        connection.close()

    except mysql.connector.Error as e:
        print(f"Помилка бази даних: {e}")
        return "Помилка сервера.", 500
    
    session["user"][4] = os.path.relpath(filepath)

    session.modified = True

    return jsonify({"message": "Файл завантажено"})


@app.route("/predStart")
def predStart():
    return render_template("predStart.html")

@app.route('/create-quest')
def create_quest():
    return render_template("create-quest.html")

@app.route('/task-fill')
def task_fill():
    return render_template('task-fill.html')

@app.route('/quest')
def quest():
    return render_template("quest.html")

@app.route("/result")
def result():
    return render_template("result.html")

if __name__ == '__main__':
    app.run(debug=True)