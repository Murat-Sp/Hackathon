from flask import Flask, request, render_template
import mysql.connector
from mysql.connector import Error

app = Flask(__name__, template_folder=r"C:\Users\Admin\PycharmProjects\PythonProject\templates")
def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            password='root',
            database='projectX'
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
        connection = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            password='root',
            database='projectX'
        )
        cursor = connection.cursor()
        sql_query = "SELECT * FROM users WHERE email = %s AND password = %s "
        cursor.execute(sql_query, (email, password))
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        for i in data:
         if email == i[1] and password == i[2]:
          if not data:
            return "Користувач не знайдений або неправильний пароль.", 404
        name = i[1]
        return render_template('profile.html', name=name)

    except mysql.connector.Error as e:
        print(f"Помилка бази даних: {e}")
        return "Помилка сервера.", 500

if __name__ == '__main__':
    app.run(debug=True)