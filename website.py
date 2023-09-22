from flask import Flask, render_template, request, redirect, url_for, session, flash,send_file,jsonify
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

@app.route('/submit_report', methods=['POST'] )
def submit_report():
    if request.method == 'POST':
        # Get the values from the form
        department = request.form['department']
        report = request.form['report']
        # Get the current date and time
        current_datetime = datetime.now()
        # Get the username from the session
        username = session.get('username', '')

        # Handle file uploads
        file = request.files['file']
        file1 = request.files['file1']

        # Read file data as binary
        file_data = file.read() if file else None
        file1_data = file1.read() if file1 else None

        # Insert the values into the database
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO reports (username, course, report, date_time, status,file_form,file_support) VALUES (%s, %s, %s, %s,%s,%s,%s)",
                          (username, department, report, current_datetime,"Pending",file_data, file1_data))
        db_connection.commit()
        db_cursor.close()

        # Optionally, you can redirect to a success page or perform other actions
        flash('Report submitted successfully!', 'success')
        return redirect(url_for('homepage'))

    # Handle other cases as needed
    return redirect(url_for('homepage'))

@app.route('/submit_sanction', methods=['POST'])
def submit_sanction():
    if request.method == 'POST':
        # Get the values from the form
        name = session.get('name')
        course = session.get('course')
        sanction = request.form['sanctions']
        # Get the current date and time
        current_datetime = datetime.now()
        # Get the username from the session
       

        # Insert the values into the database
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO sanctions (username, course, date_time, sanction) VALUES (%s, %s, %s, %s)",
                          (name, course, current_datetime, sanction))
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

        # Query the accounts_cics table to check if the provided username and password exist
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM accounts_cics WHERE username = %s AND password = %s",
                          (submitted_username, submitted_password))
        result_cics = db_cursor.fetchone()
        db_cursor.close()

        # Query the account_coordinators table to check if the provided username and password exist
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM accounts_coordinators WHERE username = %s AND password = %s",
                          (submitted_username, submitted_password))
        result_coordinators = db_cursor.fetchone()
        db_cursor.close()

        if result_cics:
            # User exists in the accounts_cics table, set the role and continue
            session['username'] = submitted_username  # Save the username in the session
            session['role'] = 'accounts_cics'  # Save the role in the session
            return redirect(url_for('homepage'))  # Redirect to another page after successful login
        elif result_coordinators:
            # User exists in the accounts_coordinators table, set the role and continue
            session['username'] = submitted_username  # Save the username in the session
            session['role'] = 'accounts_coordinators'  # Save the role in the session
            return redirect(url_for('homepage'))  # Redirect to another page after successful login
        else:
            # Invalid username or password, set error_message
            error_message = 'Invalid username or password'

    return render_template('index.html', username=username, error_message=error_message)


@app.route('/menu')
def menu():
    # Retrieve the username and role from the session
    username = session.get('username', '')
    user_role = session.get('role', '')
    user_source = session.get('source', '')
    print(f"Student Name: {user_role}")

    # Query the database to retrieve reports for the logged-in user
    db_cursor = db_connection.cursor()

    if user_role == 'accounts_coordinators':
        # If the user is an accounts coordinator, retrieve the course of the user
        db_cursor.execute("SELECT course FROM accounts_coordinators WHERE username = %s", (username,))
        user_course = db_cursor.fetchone()
        

        if user_course:
            user_course = user_course[0]  # Extract the course from the result

            # Query reports where the course matches the user's course
            db_cursor.execute("SELECT * FROM reports WHERE course = %s", (user_course,))
            reports = db_cursor.fetchall()
        else:
            reports = []  # If user's course is not found, return an empty list
    else:
        # For other roles, simply retrieve reports for the logged-in user
        db_cursor.execute("SELECT * FROM reports WHERE username = %s", (username,))
        reports = db_cursor.fetchall()

    # Close the cursor
    db_cursor.close()

    return render_template('menu.html', reports=reports, user_source=user_source, user_course=user_course)


@app.route('/search_students', methods=['POST'])
def search_students():
    if request.method == 'POST':
        search_value = request.form['username']  # Updated to match the input name

        # Perform a database query to search for students in the accounts_cics table
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM accounts_cics WHERE Name LIKE %s", ('%' + search_value + '%',))
        search_results = db_cursor.fetchall()
        db_cursor.close()

        # Check if any results were found
        if search_results:
            # Retrieve the first result (you can modify this logic as needed)
            first_result = search_results[0]

            # Extract the name and course from the result
            name = first_result['Name']
            course = first_result['CourseOrPosition']    

            print(session.get('name'))
            print(session.get('course'))

            # Return the name and course as JSON
            return jsonify({'name': name, 'course': course})
        else:
            # No results found, return an error message as JSON
            print(session.get('name'))
            print(session.get('course'))
            return jsonify({'error': 'No results found'})
        
@app.route('/forms')
def forms():
    user_source = session.get('source', '')
    db_cursor = db_connection.cursor()

    # Execute an SQL query to retrieve form data
    db_cursor.execute("SELECT id, filename FROM files")
    form_data = db_cursor.fetchall()

    # Close the cursor
    db_cursor.close()

    return render_template('forms.html', form_data=form_data, user_source=user_source)

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

    # Determine the user source (accounts_cics or accounts_coordinators) and set the user_source variable
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM accounts_cics WHERE username = %s", (username,))
    result_cics = db_cursor.fetchone()

    db_cursor.execute("SELECT * FROM accounts_coordinators WHERE username = %s", (username,))
    result_coordinators = db_cursor.fetchone()

    if result_cics:
        user_source = 'accounts_cics'
        session['source'] = user_source
    elif result_coordinators:
        user_source = 'accounts_coordinators'
        session['source'] = user_source
    else:
        user_source = 'unknown'  # Handle the case where the user source is not found

    # Close the cursor
    db_cursor.close()

    # Retrieve the profile picture path, name, and course for the logged-in user from the database
    db_cursor1 = db_connection.cursor()

    if user_source == 'accounts_cics':
        db_cursor1.execute("SELECT image_data, Name, CourseOrPosition FROM accounts_cics WHERE username = %s", (username,))
    elif user_source == 'accounts_coordinators':
        db_cursor1.execute("SELECT image_data, Name, Course FROM accounts_coordinators WHERE username = %s", (username,))
    else:
        # Handle the case where user_source is unknown
        db_cursor1.execute("SELECT image_data, Name, CourseOrPosition FROM accounts_cics WHERE username = %s", (username,))

    result_user_data = db_cursor1.fetchone()

    if result_user_data:
        profile_picture_data, name, course = result_user_data
    else:
        # Handle the case where user data is not found
        profile_picture_data = None
        name = "Name not found"
        course = "Course/Position not found"

    # Encode the profile picture data as a Base64 string
    if profile_picture_data is not None:
        profile_picture_base64 = base64.b64encode(profile_picture_data).decode('utf-8')
    else:
        profile_picture_base64 = None  # Handle the case where there is no profile picture data

    # Pass the sorted offenses, username, profile picture (Base64), name, course, and user_source to the template
    return render_template('homepage.html', username=username, profile_picture_base64=profile_picture_base64, name=name, course=course, user_source=user_source)

def lookup_student_info(username):
    try:
        db_cursor = db_connection.cursor(dictionary=True)

        # Assuming you have a table called 'students' with columns 'username', 'name', and 'course'
        query = "SELECT Name, CourseOrPosition FROM accounts_cics WHERE username = %s"
        db_cursor.execute(query, (username,))
        student_data = db_cursor.fetchone()

        if student_data:
            student_name = student_data['Name']
            student_course = student_data['CourseOrPosition']
            return student_name, student_course
        else:
            # Return None if the student is not found
            return None, None
    except mysql.connector.Error as err:
        # Handle any errors that may occur during the database query
        print(f"Error: {err}")
        return None, None
    finally:
        db_cursor.close()

# Usage example:
@app.route('/lookup_student', methods=['POST'])
def lookup_student():
    # Get the username from the request
    username = request.form.get('username')

    # Call the function to look up the student's name and course
    student_name, student_course = lookup_student_info(username)
    print(f"Student Name: {student_name}")
    print(f"Student Course: {student_course}")

    session['name'] =  student_name
    session['course'] = student_course

    # Return the result as JSON
    student_data = {'Name': student_name, 'CourseOrPosition': student_course}
    return jsonify(student_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')