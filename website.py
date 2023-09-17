from flask import Flask, render_template, request, redirect, url_for, session, flash,send_file
import mysql.connector
import base64
import io 
from datetime import datetime

db_connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="accounts"
)

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management

@app.route('/submit_report', methods=['POST'])
def submit_report():
    if request.method == 'POST':
        # Get the values from the form
        department = request.form['department']
        report = request.form['report']
        # Get the current date and time
        current_datetime = datetime.now()
        # Get the username from the session
        username = session.get('username', '')

        # Insert the values into the database
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO reports (username, course, report, date_time, status) VALUES (%s, %s, %s, %s,%s)",
                          (username, department, report, current_datetime,"Pending"))
        db_connection.commit()
        db_cursor.close()

        # Optionally, you can redirect to a success page or perform other actions
        flash('Report submitted successfully!', 'success')
        return redirect(url_for('homepage'))

    # Handle other cases as needed
    return redirect(url_for('homepage'))

@app.route('/', methods=['GET', 'POST'])
def index():
    # Retrieve the username from the session if it exists
    username = session.get('username', '')

    error_message = None

    if request.method == 'POST':
        # Get the submitted username and password
        submitted_username = request.form['username']
        submitted_password = request.form['lname']  # Assuming password input is named 'lname'

        # Query the database to check if the provided username and password exist
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM accounts_cics WHERE username = %s AND password = %s",
                          (submitted_username, submitted_password))
        result = db_cursor.fetchone()

        db_cursor.close()

        if result:
            # User exists in the database, continue to another page or perform actions
            session['username'] = submitted_username  # Save the username in the session
            return redirect(url_for('homepage'))  # Redirect to another page after successful login
        else:
            # Invalid username or password, set error_message
            error_message = 'Invalid username or password'

    db_cursor = db_connection.cursor()

    # Execute an SQL query to retrieve user data
    db_cursor.execute("SELECT * FROM accounts_cics")
    result = db_cursor.fetchall()

    # Close the cursor
    db_cursor.close()
    return render_template('index.html', username=username, data=result, error_message=error_message)

@app.route('/menu')
def menu():
    # Retrieve the username from the session
    username = session.get('username', '')

    # Query the database to retrieve reports for the logged-in user
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM reports WHERE username = %s", (username,))
    reports = db_cursor.fetchall()

    # Close the cursor
    db_cursor.close()


    return render_template('menu.html', reports=reports)

@app.route('/forms')
def forms():
    db_cursor = db_connection.cursor()

    # Execute an SQL query to retrieve form data
    db_cursor.execute("SELECT id, filename FROM files")
    form_data = db_cursor.fetchall()

    # Close the cursor
    db_cursor.close()

    return render_template('forms.html', form_data=form_data)

@app.route('/download_form/<int:form_id>')
def download_form(form_id):
    db_cursor = db_connection.cursor()

    # Retrieve the file data for the given form_id from your database
    db_cursor.execute("SELECT filename, file_data FROM files WHERE id = %s", (form_id,))
    result = db_cursor.fetchone()

    if result is not None:
        filename, file_data = result

        # Serve the file as a downloadable attachment
        response = send_file(
            io.BytesIO(file_data),
            as_attachment=True,
            mimetype='application/pdf',
            download_name=filename + '.pdf'
            )
    
        return response

    # Handle the case where the form_id is not found
    return "Form not found", 404


@app.route('/hello', methods=['GET', 'POST'])
def homepage():
    username = session.get('username', '')  # Retrieve the username from the session

    if request.method == 'POST':
        # Handle the POST request (form submission)
        username = request.form['username']
        # Save the username in the session
        session['username'] = username


    # Retrieve the profile picture path for the logged-in user from the database
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT image_data FROM accounts_cics WHERE username = %s", (username,))
    profile_picture_data = db_cursor.fetchone()[0]  # Assuming the path is in the first column

    db_cursor1 = db_connection.cursor()
    db_cursor1.execute("SELECT Name FROM accounts_cics WHERE username = %s", (username,))
    result = db_cursor1.fetchone()

    if result is not None:
        name = result[0]
    else:
        name = "Name not found"  # Provide a default value or handle the case where the result is None

    db_cursor2 = db_connection.cursor()
    db_cursor2.execute("SELECT CourseOrPosition FROM accounts_cics WHERE username = %s", (username,))
    course = db_cursor2.fetchone()

    if course is not None:
        course = course[0]  # Assuming the data is in the first column
    else:
        course = "Course/Position not found"  # Provide a default value or handle the case where the result is None

    # Encode the profile picture data as a Base64 string
    profile_picture_base64 = base64.b64encode(profile_picture_data).decode('utf-8')

    # Pass the sorted offenses, username, and profile picture (Base64) to the template
    return render_template('homepage.html', username=username, profile_picture_base64=profile_picture_base64, name=name,course=course)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')