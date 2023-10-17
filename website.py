from flask import Flask, render_template, request, redirect, url_for, session, flash,send_file,jsonify,make_response
import mysql.connector
import base64
import io
import os
import time
import random
import string
import base64
from docx import Document
from docx.shared import Pt, RGBColor, Inches,Cm
from werkzeug.utils import secure_filename
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.oxml import OxmlElement
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from docx2pdf import convert
from datetime import datetime
from lxml import etree
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import numpy as np
from scipy.stats import randint
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_selection import chi2
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score
from sklearn.metrics import confusion_matrix
from sklearn import metrics
from os import urandom


nsmap = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'w14': 'http://schemas.microsoft.com/office/word/2010/wordml',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
    'm': 'http://schemas.openxmlformats.org/officeDocument/2006/math',
}

db_connection = mysql.connector.connect(
    host="u488180748_BATSTAT3u",
    user="u488180748_BATSTAT3u",
    password="BATSTAT3u",
    database="capstoneproject"
)



app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management


pdfkit_options = {
    'page-size': 'Custom',
    'page-width': '215.9mm',  # 8.5 inches converted to millimeters
    'page-height': '330.2mm',  # 13 inches converted to millimeters
    'encoding': 'UTF-8',
}





def replace_placeholder1(doc, placeholder, image_path,font_size=12, alignment=WD_ALIGN_PARAGRAPH.LEFT, bold=False,indentation_spaces=0):
    for paragraph in doc.paragraphs:
        if placeholder in paragraph.text:
            for run in paragraph.runs:
                run.clear()

            # Add the image to the paragraph
            indentation = "               " * indentation_spaces
            paragraph.alignment = alignment
            paragraph.left_indent = Cm(10)
            run = paragraph.add_run()
            run.bold = bold
            run.font.size = Pt(font_size)

            run.add_text(indentation)
            run.add_picture(image_path, width=Cm(2.88), height=Cm(1.56))  # Adjust width and height as needed

def replace_placeholder(doc, placeholder, new_text, font_size=12, bold=False, italic=False, alignment=None):
    for paragraph in doc.paragraphs:
        if placeholder in paragraph.text:
            for run in paragraph.runs:
                if placeholder in run.text:
                    run.text = run.text.replace(placeholder, new_text)
                    run.font.size = Pt(font_size)
                    run.font.bold = bold
                    run.font.italic = italic
                    run.font.color.rgb = RGBColor(0, 0, 0)  # Black color
                    if alignment:
                        run.alignment = alignment

                    

def clear_and_add_line(doc, line_number, new_text, font_size=12, bold=False, italic=False, alignment=None,indentation=None):
    for i, paragraph in enumerate(doc.paragraphs):
        if i == line_number:
            for run in paragraph.runs:
                run.clear()
            run = paragraph.add_run(new_text)
            run.font.size = Pt(font_size)
            run.font.bold = bold
            run.font.italic = italic
            run.font.color.rgb = RGBColor(0, 0, 0)  # Black color
            if alignment:
                run.alignment = alignment

            if indentation is not None:
                # Set the left indentation for the paragraph
                paragraph.paragraph_format.left_indent = Pt(indentation)

            break

def replace_table_cell_placeholder(table, row_index, col_index, new_text):
    cell = table.cell(row_index, col_index)
    
    # Clear the existing text in the cell
    for paragraph in cell.paragraphs:
        for run in paragraph.runs:
            run.text = ""
    
    # Add the new text to the cell
    cell.text = new_text

def replace_table_cell_placeholder1(table, row_index, col_index, new_text, placeholder):
    cell = table.cell(row_index, col_index)
    
    
    # Flag to track if the placeholder was found and replaced
    placeholder_replaced = False
    if new_text == "":
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                if placeholder in run.text:
                    
                    run.text = run.text.replace(placeholder, "N/A")
                    placeholder_replaced = True

        # Add the new text to the cell if the placeholder was not found
        if not placeholder_replaced:
            cell.text = new_text
    else:
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                if placeholder in run.text:
                    
                    run.text = run.text.replace(placeholder, new_text)
                    placeholder_replaced = True

        # Add the new text to the cell if the placeholder was not found
        if not placeholder_replaced:
            cell.text = new_text

def replace_table_cell_placeholder2(table, row_index, col_index, new_text, placeholder):
    cell = table.cell(row_index, col_index)
    
    
    
    if new_text == "checked":
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                if placeholder in run.text:
                    
                    run.text = run.text.replace(placeholder, "☑")

    else:
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                if placeholder in run.text:
                    
                    run.text = run.text.replace(placeholder, "☐")
                    pdfkit_options

                 


def toggle_table_cell_checkbox(table, row_index, col_index, status):
    cell = table.cell(row_index, col_index)
    print(status)
    if status == "checked":
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.text = ""
        cell.text = "☑"

        # Center-align the text horizontally
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.font.size = Pt(11)  # Adjust font size if needed
                paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    else:
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.text = ""
        cell.text = "☐"

        # Center-align the text horizontally
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.font.size = Pt(11)  # Adjust font size if needed
                paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER




def replace_table_cell_placeholder_with_image(table, row_index, col_index, image_path, placeholder, indentation_spaces=0):
    cell = table.cell(row_index, col_index)

    # Iterate through the runs in the cell
    for paragraph in cell.paragraphs:
        for run in paragraph.runs:
            if placeholder in run.text:
                # Clear the existing run
                run.clear()

                # Add an image with the specified path
                indentation = "   " * indentation_spaces
                paragraph.left_indent = Cm(3)
                run = paragraph.add_run()
                run.add_text(indentation)
                run.add_picture(image_path, width=Cm(2.88), height=Cm(1.56)) 

def generate_random_code(length=8):
    # Define the characters to choose from
    characters = string.ascii_uppercase + string.digits

    # Generate a random code
    code = '#' + ''.join(random.choice(characters) for _ in range(length - 1))

    return code

@app.route('/submit_report', methods=['POST'])
def submit_report():
    
    kind = request.form.get('forms')
    if kind == "Formal Complaint":
        department = request.form.get('department')
        provision = request.form.get('provision')
        final = request.form.get('final')
        report_text = request.form.get('narrate')
        name = request.form.get('name')
        section = request.form.get('section')
        number = request.form.get('number')
        email = request.form.get('email')
        witness1 = request.form.get('witness1')
        witness2 = request.form.get('witness2')
        witness3 = request.form.get('witness3')
        evidence1 = request.form.get('witness1')
        evidence2 = request.form.get('witness2')
        evidence3 = request.form.get('witness3')
        pic = request.files['file9']
        current_datetime = datetime.now()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y") 
        random_code = generate_random_code()

        print(pic)

        if department == "CAFAD":
            Name_Coordinator = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator = "Lovely Rose Tipan Hernandez"
            
            
        username = session.get('username', '')
        print(username)
        
        pdf_filename = 'Formal Complaint Letter.docx'

        doc = Document(pdf_filename)
        # Replace placeholders

        replace_table_cell_placeholder1(doc.tables[0], 2, 2, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 4, 1, Name_Coordinator,"NAME")
        replace_table_cell_placeholder1(doc.tables[0], 11, 8, name,"(student)")
        replace_table_cell_placeholder1(doc.tables[0], 12, 8, department,"(college)")
        replace_table_cell_placeholder1(doc.tables[0], 13, 8, section,"(section)")
        replace_table_cell_placeholder1(doc.tables[0], 16, 3, provision,"(provision)")
        replace_table_cell_placeholder1(doc.tables[0], 23, 3, report_text,"(narration)")
        replace_table_cell_placeholder1(doc.tables[0], 30, 3, final,"(final)")
        replace_table_cell_placeholder_with_image(doc.tables[0], 37, 18, pic,"lol")
        replace_table_cell_placeholder1(doc.tables[0], 38, 18, number,"(number)")
        replace_table_cell_placeholder1(doc.tables[0], 39, 18, email, "(email)")
        replace_table_cell_placeholder1(doc.tables[0], 40, 6, witness1,"(witness1)")
        replace_table_cell_placeholder1(doc.tables[0], 41, 6, witness2,"(witness2)")
        replace_table_cell_placeholder1(doc.tables[0], 42, 6, witness3,"(witness3)")
        replace_table_cell_placeholder1(doc.tables[0], 44, 9, evidence1,"(evidence1)")
        replace_table_cell_placeholder1(doc.tables[0], 45, 9, evidence2,"(evidence2)")
        replace_table_cell_placeholder1(doc.tables[0], 46, 9, evidence3,"(evidence3)")

        doc.save("modified_document.docx")
         # Convert the Word document to PDF using docx2pdf
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Formal Complaint'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()


        
            
        
        # Check if the POST request has the file part for the supporting document file
        if 'file1' not in request.files:
            flash('No supporting document file part')
            return redirect(request.url)
        
        support_file = request.files['file1']
        
        # Check if the user submitted an empty supporting document file input
    
        if support_file.filename == '':
            support_data = None
            support_filename = "None"
            support_extension = "None"

            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO reports (report_id, course, report, file_form, file_form_name,file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (random_code, department, report_text,   pdf_data, file_name,support_filename, support_extension, support_data, username, current_datetime, "Pending"))
            db_connection.commit()
            
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            
            flash('The report is submitted', 'success')
            return redirect('/hello')
            
        
        else:
            # Securely get the filenames and file extensions
            support_filename = secure_filename(support_file.filename)
        
            support_extension = os.path.splitext(support_filename)[1]
            
            # Read the file data into memory
            
            support_data = support_file.read()
            
            
            # Insert the report with file information into the database, including file data
            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO reports (report_id, course, report, file_form, file_form_name,file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (random_code, department, report_text,   pdf_data, file_name,support_filename, support_extension, support_data, username, current_datetime, "Pending"))
            db_connection.commit()
            
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            
            flash('The report is submitted', 'success')
            return redirect('/hello')
    else:
        department = request.form.get('department')
        remarks = request.form.get('remarks')
        report_text = request.form.get('Incident')
        name = request.form.get('name1')
        section = request.form.get('section1')
        designation = request.form.get('designation')
        program = request.form.get('program') 
        pic = request.files['file3']
        current_datetime = datetime.now()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y") 
        current_time = current_datetime.strftime('%I:%M %p')
        random_code = generate_random_code()
                 
        username = session.get('username', '')

        pdf_filename = 'Incident Report.docx'
        doc = Document(pdf_filename)
        # Replace placeholders
    
        replace_table_cell_placeholder(doc.tables[0], 2, 3, str(current_date))
        replace_table_cell_placeholder(doc.tables[0], 3, 3, name)
        replace_table_cell_placeholder(doc.tables[0], 4, 3, department)
        replace_table_cell_placeholder(doc.tables[0], 5, 3, program)
        replace_table_cell_placeholder(doc.tables[0], 6, 4, report_text)
        replace_table_cell_placeholder(doc.tables[0], 10, 4, remarks)
        
        replace_table_cell_placeholder_with_image(doc.tables[0], 14, 1, pic,"(signature)",29)
        replace_table_cell_placeholder1(doc.tables[0], 14, 1, designation,"(designation)")
        replace_table_cell_placeholder1(doc.tables[0], 14, 1, str(current_date),"lol")
        replace_table_cell_placeholder(doc.tables[0], 2, 8, current_time)
        replace_table_cell_placeholder(doc.tables[0], 3, 10, username)
        replace_table_cell_placeholder(doc.tables[0], 5, 8, section)
        
        replace_table_cell_placeholder(doc.tables[1], 2, 3, str(current_date))
        replace_table_cell_placeholder(doc.tables[1], 3, 3, name)
        replace_table_cell_placeholder(doc.tables[1], 4, 3, department)
        replace_table_cell_placeholder(doc.tables[1], 5, 3, program)
        replace_table_cell_placeholder(doc.tables[1], 6, 4, report_text)
        replace_table_cell_placeholder(doc.tables[1], 10, 4, remarks)
        
        replace_table_cell_placeholder_with_image(doc.tables[1], 14, 1, pic,"(signature)",29)
        replace_table_cell_placeholder1(doc.tables[1], 14, 1, designation,"(designation)")
        replace_table_cell_placeholder1(doc.tables[1], 14, 1, str(current_date),"lol")
        replace_table_cell_placeholder(doc.tables[1], 2, 8, current_time)
        replace_table_cell_placeholder(doc.tables[1], 3, 10, username)
        replace_table_cell_placeholder(doc.tables[1], 5, 8, section)
        
    
        
        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Incident Report'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()

        
            
        
        # Check if the POST request has the file part for the supporting document file
        if 'file4' not in request.files:
            flash('No supporting document file part')
            return redirect(request.url)
        
        support_file = request.files['file4']
        
        # Check if the user submitted an empty supporting document file input
    
        if support_file.filename == '':
            support_data = None
            support_filename = "None"
            support_extension = "None"

            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO reports (report_id, course, report, file_form, file_form_name,file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (random_code, department, report_text,   pdf_data, file_name,support_filename, support_extension, support_data, username, current_datetime, "Pending"))
            db_connection.commit()
            
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            
            flash('The report is submitted', 'success')
            return redirect('/hello')
            
        
        else:
            # Securely get the filenames and file extensions
            support_filename = secure_filename(support_file.filename)
        
            support_extension = os.path.splitext(support_filename)[1]
            
            # Read the file data into memory
            
            support_data = support_file.read()
            
            
            # Insert the report with file information into the database, including file data
            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO reports (report_id, course, report, file_form, file_form_name,file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (random_code, department, report_text,   pdf_data, file_name,support_filename, support_extension, support_data, username, current_datetime, "Pending"))
            db_connection.commit()
            
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            
            flash('The report is submitted', 'success')
            return redirect('/hello')

@app.route('/submit_request', methods=['GET', 'POST'])
def submit_request():
    kind = request.form.get('forms')
    print(kind)
    if kind == "Temporary Gate Pass":

        remarks = request.form.get('remarks')
        department = request.form.get('department')
        print(department)
        section = request.form.get('section2')
        program = request.form.get('program')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y") 

        student = session.get('namestudent', '') 
        username = session.get('username', '')

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'Temporary Gate Pass.docx'
        doc = Document(pdf_filename)

        

        replace_table_cell_placeholder1(doc.tables[0], 2, 11, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 11, 1, formatted_date,"(date1)")
        replace_table_cell_placeholder1(doc.tables[0], 11, 1, Name_Coordinator1,"(Coord)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 3, student,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 6, 4, remarks,"(remarks)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 11, username,"(code)")
        replace_table_cell_placeholder1(doc.tables[0], 5, 9, section, "(section)")
        replace_table_cell_placeholder1(doc.tables[0], 4, 3, department, "(department)")
        replace_table_cell_placeholder1(doc.tables[0], 5, 3, program, "(program)")

        replace_table_cell_placeholder1(doc.tables[1], 2, 11, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[1], 11, 1, formatted_date,"(date1)")
        replace_table_cell_placeholder1(doc.tables[1], 11, 1, Name_Coordinator1,"(Coord)")
        replace_table_cell_placeholder1(doc.tables[1], 3, 3, student,"(name)")
        replace_table_cell_placeholder1(doc.tables[1], 6, 4, remarks,"(remarks)")
        replace_table_cell_placeholder1(doc.tables[1], 3, 11, username,"(code)")
        replace_table_cell_placeholder1(doc.tables[1], 5, 9, section, "(section)")
        replace_table_cell_placeholder1(doc.tables[1], 4, 3, department, "(department)")
        replace_table_cell_placeholder1(doc.tables[1], 5, 3, program, "(program)")

        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Temporary Gate Pass'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()
        
        
        if 'file5' not in request.files:
            flash('No supporting document file part')
            return redirect(request.url)
        
        support_file = request.files['file5']
        
        # Check if the user submitted an empty supporting document file input
    
        if support_file.filename == '':
            support_file = None 
        
       
        
        if support_file:
            # Securely get the filenames and file extensions
           
            support_filename = secure_filename(support_file.filename)
            support_extension = os.path.splitext(support_filename)[1]
            
        
            support_data = support_file.read()
            
            # Insert the report with file information into the database, including file data
            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO forms_osd (form_id,course, report, file_form_name, file_form, file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                            (random_code, department, remarks, file_name, pdf_data, support_filename, support_extension, support_data, username, current_datetime,"Pending"))
            db_connection.commit()
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            flash('Report submitted successfully')
            return redirect('/hello')
        
    elif kind == "Request for Non-Wearing of Uniform":
        fieldwork = request.form.get('fieldwork')
        prolonged = request.form.get('prolonged')
        foreign = request.form.get('foreign')
        pregnant = request.form.get('pregnant')
        cases = request.form.get('cases')
        majeure = request.form.get('majeure')
        internship = request.form.get('internship')
        specify = request.form.get('specify')
        remarks = request.form.get('remarks')
        department = request.form.get('department')
        specify1 = request.form.get('specifyTextarea')
        print(specify1)
        print(department)
        section = request.form.get('section2')
        college = request.form.get('college')
        program = request.form.get('program')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y") 
        pic = request.files['file3']

        student = session.get('namestudent', '') 
        username = session.get('username', '')

        if fieldwork == "fieldwork":
            status = "checked"
        else:
            status = "not"

        if prolonged == "prolonged":
            status1 = "checked"
        else:
            status1 = "not"

        if foreign == "foreign":
            status2 = "checked"
        else:
            status2 = "not"

        if pregnant == "pregnant":
            status3 = "checked"
        else:
            status3 = "not"

        if cases == "cases":
            status4 = "checked"
        else:
            status4 = "not"

        if majeure == "majeure":
            status5 = "checked"
        else:
            status5 = "not"

        if internship == "internship":
            status6 = "checked"
        else:
            status6 = "not"

        if specify == "specify":
            status7 = "checked"
        else:
            status7 = "not"

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'Request for Non-Wearing of Uniform.docx'
        doc = Document(pdf_filename)

        toggle_table_cell_checkbox(doc.tables[0], 6, 0, status)
        toggle_table_cell_checkbox(doc.tables[0], 7, 0, status1)
        toggle_table_cell_checkbox(doc.tables[0], 8, 0, status2)
        toggle_table_cell_checkbox(doc.tables[0], 9, 0, status3)
        toggle_table_cell_checkbox(doc.tables[0], 10, 0, status4)
        toggle_table_cell_checkbox(doc.tables[0], 11, 0, status5)
        toggle_table_cell_checkbox(doc.tables[0], 12, 0, status6)
        toggle_table_cell_checkbox(doc.tables[0], 13, 0, status7)


        replace_table_cell_placeholder1(doc.tables[0], 16, 1, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 13, 2, specify1,"(specify)")
        replace_table_cell_placeholder1(doc.tables[0], 2, 4, student,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 4, college,"(college)")
        replace_table_cell_placeholder1(doc.tables[0], 4, 4, program,"(program)")
        replace_table_cell_placeholder1(doc.tables[0], 2, 10, username,"(srcode)")
        replace_table_cell_placeholder1(doc.tables[0], 4, 10, section,"(section)")
        replace_table_cell_placeholder_with_image(doc.tables[0], 16, 1, pic,"(signature)",29)

        




        

        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Request for Non-Wearing of Uniform'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()
        
        
        if 'file6' not in request.files:
            flash('No supporting document file part')
            return redirect(request.url)
        
        support_file = request.files['file6']
        
        # Check if the user submitted an empty supporting document file input
    
        if support_file.filename == '':
            support_file = None 
        
       
        
        if support_file:
            # Securely get the filenames and file extensions
           
            support_filename = secure_filename(support_file.filename)
            support_extension = os.path.splitext(support_filename)[1]
            
        
            support_data = support_file.read()
            
            # Insert the report with file information into the database, including file data
            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO forms_osd (form_id,course,file_form_name, file_form, file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                            (random_code, department,file_name, pdf_data, support_filename, support_extension, support_data, username, current_datetime,"Pending"))
            db_connection.commit()
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            flash('Report submitted successfully')
            return redirect('/hello')

            #Request for new id 
    elif kind == "Request for New ID":
        fieldwork = request.form.get('fieldwork')
        prolonged = request.form.get('prolonged')
        foreign = request.form.get('foreign')
        pregnant = request.form.get('pregnant')    
        specify2 = request.form.get('specify1')
        print(specify2)
        remarks = request.form.get('remarks')
        department = request.form.get('department')
        specify3 = request.form.get('specifyTextarea1')
        section = request.form.get('section1')
        college = request.form.get('college')
        program = request.form.get('program')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y") 
        pic = request.files['file8']
        print(pic)

        student = session.get('namestudent', '') 
        username = session.get('username', '')

        if fieldwork == "fieldwork":
            status = "checked"
        else:
            status = "not"

        if prolonged == "prolonged":
            status1 = "checked"
        else:
            status1 = "not"

        if foreign == "foreign":
            status2 = "checked"
        else:
            status2 = "not"

        if pregnant == "pregnant":
            status3 = "checked"

        else:
            status3 = "not"


        if specify2 == "specify1":
            status7 = "checked"
        else:
            status7 = "not"

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'request for new id.docx'
        doc = Document(pdf_filename)
#problem
        replace_table_cell_placeholder2(doc.tables[0], 7, 0, status,"SHIFT")
        replace_table_cell_placeholder2(doc.tables[0], 7, 4, status1,"LOST")
        replace_table_cell_placeholder2(doc.tables[0], 7, 8, status2,"TORN")
        replace_table_cell_placeholder2(doc.tables[0], 9, 2, status3,"UPDATE")
        replace_table_cell_placeholder2(doc.tables[0], 9, 4, status7,"OTHERS")

        
        replace_table_cell_placeholder1(doc.tables[0], 2, 3, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 10, 1, formatted_date,"(date1)")
        replace_table_cell_placeholder1(doc.tables[0], 10, 8, Name_Coordinator1,"NAME")
        replace_table_cell_placeholder1(doc.tables[0], 8, 8, specify3,"(specify)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 3, student,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 4, 3, college,"(college)")
        replace_table_cell_placeholder1(doc.tables[0], 5, 3, program,"(program)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 10, username,"(srcode)")
        replace_table_cell_placeholder1(doc.tables[0], 5, 10, section,"(yearlevel)")
        replace_table_cell_placeholder_with_image(doc.tables[0], 10, 1, pic,"(signature)",29)
        
       


        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Request for New ID'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()
        
        
        if 'file4' not in request.files:
            flash('No supporting document file part')
            return redirect(request.url)
        
        support_file = request.files['file4']
        
        # Check if the user submitted an empty supporting document file input
    
        if support_file.filename == '':
            support_file = None 
        
       
        
        if support_file:
            # Securely get the filenames and file extensions
           
            support_filename = secure_filename(support_file.filename)
            support_extension = os.path.splitext(support_filename)[1]
            
        
            support_data = support_file.read()
            
            # Insert the report with file information into the database, including file data
            db_cursor = db_connection.cursor()
            db_cursor.execute("INSERT INTO forms_osd (form_id,course,file_form_name, file_form, file_support_name, file_support_type, file_support, username, date_time, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                            (random_code, department,file_name, pdf_data, support_filename, support_extension, support_data, username, current_datetime,"Pending"))
            db_connection.commit()
            db_cursor.close()
            os.remove("modified_document.docx")
            os.remove("modified_document.pdf")
            
            flash('Report submitted successfully')
            return redirect('/hello')

@app.route('/submit_call', methods=['POST'])
def submit_call():

    student = request.form.get('student')
    section = request.form.get('section')
    Time = request.form.get('meeting-time')
    # Parse the input time
    parsed_time = datetime.strptime(Time, "%H:%M")

    # Convert it to the desired format
    formatted_time = parsed_time.strftime("%I:%M %p")

    date2 = request.form.get('date2')    
    remarks = request.form.get('remarks')
    current_datetime = datetime.now()
    random_code = generate_random_code()
    current_date = current_datetime.date()
    formatted_date = current_date.strftime("%m/%d/%Y") 

    username = session.get('namestudent', '')


    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM accounts_cics WHERE Name = %s", (student,))
    result_cics = db_cursor.fetchone()

    if result_cics:
        college = 'CICS'
        db_cursor2 = db_connection.cursor()
        db_cursor2.execute("SELECT Course FROM accounts_cics WHERE Name = %s", (student,))
        course1 = db_cursor2.fetchone()

        if course1:
            course = course1[0]  # Get the first (and only) element of the tuple
            print(course)  # Now, 'course' is a string
        else:
            print("No course found for the student.")
       

    else:
        user_source = 'CAFAD'  # Handle the case where the user source is not found


    

    pdf_filename = 'call slip.docx'
    doc = Document(pdf_filename)

    replace_table_cell_placeholder1(doc.tables[0], 2, 3, student,"(name)")
    replace_table_cell_placeholder1(doc.tables[0], 4, 9, section, "(section)")
    replace_table_cell_placeholder1(doc.tables[0], 6, 6, formatted_time,"(time)")
    replace_table_cell_placeholder1(doc.tables[0], 6,3, date2,"(date1)")
    replace_table_cell_placeholder1(doc.tables[0], 3, 3, college,"(college)")
    replace_table_cell_placeholder1(doc.tables[0], 4, 3, course, "(program)")
    replace_table_cell_placeholder1(doc.tables[0], 2, 8, formatted_date, "(date)")
    replace_table_cell_placeholder1(doc.tables[0], 7, 1, username, "NAME")

    replace_table_cell_placeholder1(doc.tables[1], 2, 3, student,"(name)")
    replace_table_cell_placeholder1(doc.tables[1], 4, 9, section, "(section)")
    replace_table_cell_placeholder1(doc.tables[1], 6, 6, formatted_time,"(time)")
    replace_table_cell_placeholder1(doc.tables[1], 6,3, date2,"(date1)")
    replace_table_cell_placeholder1(doc.tables[1], 3, 3, college,"(college)")
    replace_table_cell_placeholder1(doc.tables[1], 4, 3, course, "(program)")
    replace_table_cell_placeholder1(doc.tables[1], 2, 8, formatted_date, "(date)")
    replace_table_cell_placeholder1(doc.tables[1], 7, 1, username, "NAME")

    replace_table_cell_placeholder1(doc.tables[2], 2, 3, student,"(name)")
    replace_table_cell_placeholder1(doc.tables[2], 4, 9, section, "(section)")
    replace_table_cell_placeholder1(doc.tables[2], 6, 6, formatted_time,"(time)")
    replace_table_cell_placeholder1(doc.tables[2], 6,3, date2,"(date1)")
    replace_table_cell_placeholder1(doc.tables[2], 3, 3, college,"(college)")
    replace_table_cell_placeholder1(doc.tables[2], 4, 3, course, "(program)")
    replace_table_cell_placeholder1(doc.tables[2], 2, 8, formatted_date, "(date)")
    replace_table_cell_placeholder1(doc.tables[2], 7, 1, username, "NAME")
        


    doc.save("modified_document.docx")
    pdf_path = os.path.join('modified_document.pdf')
    convert("modified_document.docx", pdf_path)

    

    file_name = f'{random_code}_Call Slip'
    with open(pdf_path, "rb") as pdf_file:
        pdf_data = pdf_file.read()
        
        

    
    # Insert the report with file information into the database, including file data
    db_cursor1 = db_connection.cursor()
    db_cursor1.execute("INSERT INTO callslip (call_id, name, coord,reason, date, time,file, file_name) VALUES (%s, %s, %s, %s, %s,%s,%s,%s)",
                    (random_code, student, username,remarks, current_date, formatted_time,pdf_data, file_name))
    db_connection.commit()
    db_cursor.close()
    db_cursor1.close()
    db_cursor2.close()
    os.remove("modified_document.docx")
    os.remove("modified_document.pdf")


    return redirect('/hello')



@app.route('/submit_written', methods=['POST'])
def submit_written():
    kind = request.form.get('forms')
    print(kind)
    if kind == "Written Warning":

        remarks = request.form.get('remarks')
        norms = request.form.get('norms')
        courseorposition = session.get('course', '')
        department = request.form.get('department')
        sanction = request.form.get('sanctions')
        students= request.form.get('student')
        complainant= request.form.get('student2')
        date2= request.form.get('date2')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y")
        
        username = session.get('namestudent', '')

        sanction_mapping = [
    "12.1.1 - attendance, punctuality, cutting classes",
"12.1.2 - dress code, uniform",
"12.1.3 - property misuse",
"12.1.4 - noise disturbance",
"12.1.5 - posting violation",
"12.1.6 - notice removal",
"12.1.7 - littering",
"12.1.8 - smoking violation",
"12.1.9 - trespassing",
"12.1.10 - misconduct",
"12.1.11 - harassment",
"12.1.12 - provocation, fight",
"12.1.13 - PDA",
"12.1.14 - truancy",
        ]
        sanction_mapping1 = [
"13.1 - repeat offenses",
"13.2 - insubordination",
"13.3 - smoking violation",
"13.4 - alcohol violation",
"13.5 - intoxication",
"13.6 - trespassing",
"13.7 - property misuse",
"13.13 - abusive behavior",
"13.14 - unauthorized membership",
"13.15 - online misconduct",
"13.16 - vandalism",
"13.17 - academic disruption",
"13.18 - solicitation",
"13.19 - physical harm",
"13.20 - weapons possession",
"13.21 - theft",
"13.22 - bribery",
"13.23 - sexual misconduct",
"13.24 - obscenity",
"13.25 - defamation",
"13.26 - physical harm",
"13.27 - falsification",
"13.28 - disrepute",
"13.29 - riot",
"13.30 - destruction of property",
"13.31 - burglary",
"13.32 - hazing",
"13.33 - drugs",
"13.34 - firearms possession",
"13.35 - threats",
"13.36 - felonies",
"13.37 - moral turpitude",
        ]
        sanction_mapping2 = [
    "14.1 - cheating, mobile phone",
    "14.2 - cheating, talking",
    "14.3 - cheating, dictating answers",
    "14.4 - cheating, notes possession",
    "14.5 - cheating, outside information",
    "14.6 - cheating, leakage facilitation",
    "14.7 - cheating, buying/selling questions",
    "14.8 - cheating, copying answers",
    "14.9 - cheating, covert devices",
    "14.10 - cheating, impersonation",
    "14.11 - plagiarism",
    "14.12 - cheating, surrogate attendance",
    "14.13 - plagiarism",
    "14.14 - cheating, caught",
    "14.15 - cheating, aiding"
        ]

        
        sanction_number = None

        if sanction in sanction_mapping:
            sanction_number = "12"
        elif sanction in sanction_mapping1:
            sanction_number = "13"
        elif sanction in sanction_mapping2:
            sanction_number = "14"

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'written warning.docx'
        doc = Document(pdf_filename)

        

        replace_table_cell_placeholder1(doc.tables[0], 2, 12, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 3, students,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 6, 7, date2,"(date2)")
        replace_table_cell_placeholder1(doc.tables[0], 7, 10, remarks,"(complain)")
        replace_table_cell_placeholder1(doc.tables[0], 6, 10, complainant,"(name1)")
        replace_table_cell_placeholder1(doc.tables[0], 11, 6, sanction_number,"(section)")
        replace_table_cell_placeholder1(doc.tables[0], 19, 8, username, "coord")
        replace_table_cell_placeholder1(doc.tables[0], 22, 2, username, "NAME")
        replace_table_cell_placeholder1(doc.tables[0], 12, 2, norms, "norms")
        
        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Written Warning'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()


   
    
        
        # Insert the report with file information into the database, including file data
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO sanctions (sanctions_id,username, course, date_time, sanction, written, written_name) VALUES (%s,%s, %s, %s, %s, %s,%s)",
                        (random_code,students, courseorposition, current_datetime, sanction, pdf_data,file_name ))
        db_connection.commit()
        db_cursor.close()
        os.remove("modified_document.docx")
        os.remove("modified_document.pdf")
        
        flash('Report submitted successfully')
        return redirect('/hello')
        
    elif kind ==  'Written Reprimand':

        remarks = request.form.get('remarks')
        norms = request.form.get('norms')
        courseorposition = session.get('course', '')
        print(courseorposition)
        department = request.form.get('department')
        sanction = request.form.get('sanctions')
        students= request.form.get('student')
        complainant= request.form.get('student2')
        date2= request.form.get('date2')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y")
        
        username = session.get('namestudent', '')

        sanction_mapping = [
    "12.1.1 - attendance, punctuality, cutting classes",
"12.1.2 - dress code, uniform",
"12.1.3 - property misuse",
"12.1.4 - noise disturbance",
"12.1.5 - posting violation",
"12.1.6 - notice removal",
"12.1.7 - littering",
"12.1.8 - smoking violation",
"12.1.9 - trespassing",
"12.1.10 - misconduct",
"12.1.11 - harassment",
"12.1.12 - provocation, fight",
"12.1.13 - PDA",
"12.1.14 - truancy",
        ]
        sanction_mapping1 = [
"13.1 - repeat offenses",
"13.2 - insubordination",
"13.3 - smoking violation",
"13.4 - alcohol violation",
"13.5 - intoxication",
"13.6 - trespassing",
"13.7 - property misuse",
"13.13 - abusive behavior",
"13.14 - unauthorized membership",
"13.15 - online misconduct",
"13.16 - vandalism",
"13.17 - academic disruption",
"13.18 - solicitation",
"13.19 - physical harm",
"13.20 - weapons possession",
"13.21 - theft",
"13.22 - bribery",
"13.23 - sexual misconduct",
"13.24 - obscenity",
"13.25 - defamation",
"13.26 - physical harm",
"13.27 - falsification",
"13.28 - disrepute",
"13.29 - riot",
"13.30 - destruction of property",
"13.31 - burglary",
"13.32 - hazing",
"13.33 - drugs",
"13.34 - firearms possession",
"13.35 - threats",
"13.36 - felonies",
"13.37 - moral turpitude",
        ]
        sanction_mapping2 = [
    "14.1 - cheating, mobile phone",
    "14.2 - cheating, talking",
    "14.3 - cheating, dictating answers",
    "14.4 - cheating, notes possession",
    "14.5 - cheating, outside information",
    "14.6 - cheating, leakage facilitation",
    "14.7 - cheating, buying/selling questions",
    "14.8 - cheating, copying answers",
    "14.9 - cheating, covert devices",
    "14.10 - cheating, impersonation",
    "14.11 - plagiarism",
    "14.12 - cheating, surrogate attendance",
    "14.13 - plagiarism",
    "14.14 - cheating, caught",
    "14.15 - cheating, aiding"
        ]

        
        sanction_number = None

        if sanction in sanction_mapping:
            sanction_number = "12"
        elif sanction in sanction_mapping1:
            sanction_number = "13"
        elif sanction in sanction_mapping2:
            sanction_number = "14"

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'Written Reprimand.docx'
        doc = Document(pdf_filename)

        

        replace_table_cell_placeholder1(doc.tables[0], 2, 8, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 3, students,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 6, 8, sanction_number,"(section)")
        replace_table_cell_placeholder1(doc.tables[0], 7, 2, norms, "norms")
        replace_table_cell_placeholder1(doc.tables[0], 15, 2, username, "NAME")


        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Written Reprimand'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()


   
    
        
        # Insert the report with file information into the database, including file data
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO sanctions (sanctions_id,username, course, date_time, sanction, written, written_name) VALUES (%s,%s, %s, %s, %s, %s,%s)",
                        (random_code,students, courseorposition, current_datetime, sanction, pdf_data,file_name ))
        db_connection.commit()
        db_cursor.close()
        os.remove("modified_document.docx")
        os.remove("modified_document.pdf")
        
        flash('Report submitted successfully')



        return redirect('hello')
    

    else:
        remarks = request.form.get('remarks')
        norms = request.form.get('norms')
        courseorposition = session.get('course', '')
        print(courseorposition)
        department = request.form.get('department')
        sanction = request.form.get('sanctions')
        students= request.form.get('student')
        effectivity= request.form.get('effectivity')
        days= request.form.get('days')
        current_datetime = datetime.now()
        random_code = generate_random_code()
        current_date = current_datetime.date()
        formatted_date = current_date.strftime("/%m/%d/%Y")
        
        username = session.get('namestudent', '')

        sanction_mapping = [
    "12.1.1 - attendance, punctuality, cutting classes",
"12.1.2 - dress code, uniform",
"12.1.3 - property misuse",
"12.1.4 - noise disturbance",
"12.1.5 - posting violation",
"12.1.6 - notice removal",
"12.1.7 - littering",
"12.1.8 - smoking violation",
"12.1.9 - trespassing",
"12.1.10 - misconduct",
"12.1.11 - harassment",
"12.1.12 - provocation, fight",
"12.1.13 - PDA",
"12.1.14 - truancy",
        ]
        sanction_mapping1 = [
"13.1 - repeat offenses",
"13.2 - insubordination",
"13.3 - smoking violation",
"13.4 - alcohol violation",
"13.5 - intoxication",
"13.6 - trespassing",
"13.7 - property misuse",
"13.13 - abusive behavior",
"13.14 - unauthorized membership",
"13.15 - online misconduct",
"13.16 - vandalism",
"13.17 - academic disruption",
"13.18 - solicitation",
"13.19 - physical harm",
"13.20 - weapons possession",
"13.21 - theft",
"13.22 - bribery",
"13.23 - sexual misconduct",
"13.24 - obscenity",
"13.25 - defamation",
"13.26 - physical harm",
"13.27 - falsification",
"13.28 - disrepute",
"13.29 - riot",
"13.30 - destruction of property",
"13.31 - burglary",
"13.32 - hazing",
"13.33 - drugs",
"13.34 - firearms possession",
"13.35 - threats",
"13.36 - felonies",
"13.37 - moral turpitude",
        ]
        sanction_mapping2 = [
    "14.1 - cheating, mobile phone",
    "14.2 - cheating, talking",
    "14.3 - cheating, dictating answers",
    "14.4 - cheating, notes possession",
    "14.5 - cheating, outside information",
    "14.6 - cheating, leakage facilitation",
    "14.7 - cheating, buying/selling questions",
    "14.8 - cheating, copying answers",
    "14.9 - cheating, covert devices",
    "14.10 - cheating, impersonation",
    "14.11 - plagiarism",
    "14.12 - cheating, surrogate attendance",
    "14.13 - plagiarism",
    "14.14 - cheating, caught",
    "14.15 - cheating, aiding"
        ]

        
        sanction_number = None

        if sanction in sanction_mapping:
            sanction_number = "12"
        elif sanction in sanction_mapping1:
            sanction_number = "13"
        elif sanction in sanction_mapping2:
            sanction_number = "14"

        sanction_mapping3 = {
    "12.1.1 - attendance, punctuality, cutting classes": "12.1.1",
"12.1.2 - dress code, uniform": "12.1.2",
"12.1.3 - property misuse": "12.1.3",
"12.1.4 - noise disturbance": "12.1.4",
"12.1.5 - posting violation": "12.1.5",
"12.1.6 - notice removal": "12.1.6",
"12.1.7 - littering": "12.1.7",
"12.1.8 - smoking violation": "12.1.8",
"12.1.9 - trespassing": "12.1.9",
"12.1.10 - misconduct": "12.1.10",
"12.1.11 - harassment": "12.1.11",
"12.1.12 - provocation, fight": "12.1.12",
"12.1.13 - PDA": "12.1.13",
"12.1.14 - truancy": "12.1.14",
"13.1 - repeat offenses": "13.1",
"13.2 - insubordination": "13.2",
"13.3 - smoking violation": "13.3",
"13.4 - alcohol violation": "13.4",
"13.5 - intoxication": "13.5",
"13.6 - trespassing": "13.6",
"13.7 - property misuse": "13.7",
"13.13 - abusive behavior": "13.13",
"13.14 - unauthorized membership": "13.14",
"13.15 - online misconduct": "13.15",
"13.16 - vandalism": "13.16",
"13.17 - academic disruption": "13.17",
"13.18 - solicitation": "13.18",
"13.19 - physical harm": "13.19",
"13.20 - weapons possession": "13.20",
"13.21 - theft": "13.21",
"13.22 - bribery": "13.22",
"13.23 - sexual misconduct": "13.23",
"13.24 - obscenity": "13.24",
"13.25 - defamation": "13.25",
"13.26 - physical harm": "13.26",
"13.27 - falsification": "13.27",
"13.28 - disrepute": "13.28",
"13.29 - riot": "13.29",
"13.30 - destruction of property": "13.30",
"13.31 - burglary": "13.31",
"13.32 - hazing": "13.32",
"13.33 - drugs": "13.33",
"13.34 - firearms possession": "13.34",
"13.35 - threats": "13.35",
"13.36 - felonies": "13.36",
"13.37 - moral turpitude": "13.37",
"14.1 - cheating, mobile phone": "14.1",
"14.2 - cheating, talking": "14.2",
"14.3 - cheating, dictating answers": "14.3",
"14.4 - cheating, notes possession": "14.4",
"14.5 - cheating, outside information": "14.5",
"14.6 - cheating, leakage facilitation": "14.6",
"14.7 - cheating, buying/selling questions": "14.7",
"14.8 - cheating, copying answers": "14.8",
"14.9 - cheating, covert devices": "14.9",
"14.10 - cheating, impersonation": "14.10",
"14.11 - plagiarism": "14.11",
"14.12 - cheating, surrogate attendance": "14.12",
"14.13 - plagiarism": "14.13",
"14.14 - cheating, caught": "14.14",
"14.15 - cheating, aiding": "14.15"
    
}
        sanction_number1 = sanction_mapping3.get(sanction, "Unknown")
        

        if department == "CAFAD":
            Name_Coordinator1 = "CAFAD Coordinator"

        elif department == "CICS":
            Name_Coordinator1 = "Lovely Rose Tipan Hernandez"

        pdf_filename = 'letter of suspension.docx'
        doc = Document(pdf_filename)

        

        replace_table_cell_placeholder1(doc.tables[0], 2, 13, formatted_date,"(date)")
        replace_table_cell_placeholder1(doc.tables[0], 3, 3, students,"(name)")
        replace_table_cell_placeholder1(doc.tables[0], 13, 6, sanction_number1,"(offense)")
        replace_table_cell_placeholder1(doc.tables[0], 13, 14, days,"(days)")
        replace_table_cell_placeholder1(doc.tables[0], 14, 4, effectivity,"wew")
        replace_table_cell_placeholder1(doc.tables[0], 6, 14, sanction_number,"(section)")
        replace_table_cell_placeholder1(doc.tables[0], 18, 3, username, "KRAZY")
        replace_table_cell_placeholder1(doc.tables[0], 7, 2, norms, "norms")
        
        doc.save("modified_document.docx")
        pdf_path = os.path.join('modified_document.pdf')
        convert("modified_document.docx", pdf_path)

    

        file_name = f'{random_code}_Letter of Suspension'
        with open(pdf_path, "rb") as pdf_file:
            pdf_data = pdf_file.read()


   
    
        
        # Insert the report with file information into the database, including file data
        db_cursor = db_connection.cursor()
        db_cursor.execute("INSERT INTO sanctions (sanctions_id,username, course, date_time, sanction, written, written_name) VALUES (%s,%s, %s, %s, %s, %s,%s)",
                        (random_code,students, courseorposition, current_datetime, sanction, pdf_data,file_name ))
        db_connection.commit()
        db_cursor.close()
        os.remove("modified_document.docx")
        os.remove("modified_document.pdf")
        
        flash('Report submitted successfully')
        return redirect('hello')


@app.route('/submit_approve', methods=['GET', 'POST'])
def submit_approve():
    remarks = request.form.get('remarks')
    report_id = session.get('Idreport', '') 
    modified_file = request.files['file4']
    support_data = modified_file.read()
    print(report_id)
    print(remarks)
    status = "Approved"

    db_cursor = db_connection.cursor()
    db_cursor.execute("UPDATE forms_osd SET remarks = %s, status = %s, file_form = %s WHERE form_id = %s",(remarks,status,support_data,report_id))
    db_connection.commit()
    db_cursor.close()

    
    return redirect('/request')

@app.route('/submit_reject', methods=['GET', 'POST'])
def submit_reject():
    remarks = request.form.get('remarks')
    report_id = session.get('Idreport', '') 
    print(report_id)
    print(remarks)
    status = "Rejected"

    db_cursor = db_connection.cursor()
    db_cursor.execute("UPDATE forms_osd SET remarks = %s, status = %s WHERE form_id = %s",(remarks,status,report_id))
    db_connection.commit()
    db_cursor.close()

    
    return redirect('/request')

@app.route('/delete_sanction', methods=['POST'])
def delete_sanction():
    # Get the sanction ID from the request
    sanction_id = request.form.get('sanctionId')
    print(sanction_id)

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("DELETE FROM sanctions WHERE sanctions_id = %s;", (sanction_id,))
        db_connection.commit()
        db_cursor.close()
        return jsonify({"message": "Sanction deleted successfully"})
    except Exception as e:
        # Handle the exception, log the error, and return an error response
        error_message = f"Error deleting sanction: {str(e)}"
        app.logger.error(error_message)
        return jsonify({"error": error_message})

# Make sure to import jsonify from Flask
from flask import jsonify

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
        
        return redirect(url_for('homepage'))

    flash('Report submitted successfully!', 'success')
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
    
    username = session.get('username', '')
    user_role = session.get('role', '')
    user_source = session.get('source', '')


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
        # For other roles, simply retrieve reports for the logged-in user
        db_cursor.execute("SELECT * FROM reports WHERE username = %s", (username,))
        reports = db_cursor.fetchall()
        user_course = ""

    # Close the cursor
    db_cursor.close()

    return render_template('menu.html', reports=reports, user_source=user_source, user_course=user_course)

@app.route('/request', methods=['GET', 'POST'])
def requestpage():
    # Retrieve the username and role from the session
    username = session.get('username', '')
    user_role = session.get('role', '')
    user_source = session.get('source', '')


    # Query the database to retrieve reports for the logged-in user
    db_cursor = db_connection.cursor()

    if user_role == 'accounts_coordinators':
        # If the user is an accounts coordinator, retrieve the course of the user
        db_cursor.execute("SELECT course FROM accounts_coordinators WHERE username = %s", (username,))
        user_course = db_cursor.fetchone()

        if user_course:
            user_course = user_course[0]  # Extract the course from the result

            # Query reports where the course matches the user's course
            db_cursor.execute("SELECT * FROM forms_osd WHERE course = %s", (user_course,))
            reports = db_cursor.fetchall()
    else:
        # For other roles, simply retrieve reports for the logged-in user
        db_cursor.execute("SELECT * FROM forms_osd WHERE username = %s", (username,))
        reports = db_cursor.fetchall()
        user_course = ""

    # Close the cursor
    db_cursor.close()

    return render_template('request.html', reports=reports, user_source=user_source, user_course=user_course)


@app.route('/algorithm/<complaint_text>', methods=['GET', 'POST'])
def algorithm(complaint_text):

        # Load the dataset
    df = pd.read_csv("Grievance_News.csv")

    # Create category_id column
    df['category_id'] = df['offense_tag'].factorize()[0]

        # Text preprocessing and feature extraction
    tfidf = TfidfVectorizer(sublinear_tf=True, min_df=5, ngram_range=(1, 2), stop_words='english')
    features = tfidf.fit_transform(df.grievance).toarray()
    labels = df.category_id

        # Train and evaluate the model
    X = df['grievance']
    y = df['offense_tag']

    # Split the data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    models = [
        LinearSVC(),
    ]

    # 5 Cross-validation
    CV = 5
    cv_df = pd.DataFrame(index=range(CV * len(models)))
    entries = []
    for model in models:
        model_name = model.__class__.__name__
        accuracies = cross_val_score(model, features, labels, scoring='accuracy', cv=CV)
        for fold_idx, accuracy in enumerate(accuracies):
            entries.append((model_name, fold_idx, accuracy))
    cv_df = pd.DataFrame(entries, columns=['model_name', 'fold_idx', 'accuracy'])

    # Initialize and train the LinearSVC model
    model = LinearSVC()
    model.fit(tfidf.transform(X_train), y_train)

    # Predict on the test set
    y_pred = model.predict(tfidf.transform(X_test))

        # Sample complaint text
    complaint = complaint_text

    # Predict offenses for the complaint text
    decision_scores = model.decision_function(tfidf.transform([complaint]))

    # Convert decision scores to probabilities using softmax
    def softmax(x):
        exp_x = np.exp(x - np.max(x))
        return exp_x / exp_x.sum(axis=1, keepdims=True)

    predicted_probabilities = softmax(decision_scores)

    # Get the top 10 predicted offenses' category IDs in descending order of prediction score
    top_10_offense_indices = np.argsort(-predicted_probabilities)[0, :10]
    top_10_offense_ids = model.classes_[top_10_offense_indices]

    # Create a dictionary to store the top 10 predicted offenses and their scores
    top_10_offense_scores = {}
    for offense_id, probability in zip(top_10_offense_ids, predicted_probabilities[0, top_10_offense_indices]):
        top_10_offense_scores[offense_id] = round(probability * 100)  # Convert to whole number percentage

    # Calculate the total score for the top predicted offenses
    total_score = sum(top_10_offense_scores.values())

    # If the total score is less than 100, distribute the remaining score proportionally
    remaining_score = 100 - total_score
    if remaining_score > 0:
        # Calculate the proportion for each offense based on its probability
        proportions = [probability for _, probability in zip(top_10_offense_ids, predicted_probabilities[0, top_10_offense_indices])]
        proportion_sum = sum(proportions)

        # Adjust the scores based on proportions
        for i, offense_id in enumerate(top_10_offense_scores):
            additional_score = round(proportions[i] / proportion_sum * remaining_score)
            top_10_offense_scores[offense_id] += additional_score
            remaining_score -= additional_score
            if remaining_score == 0:
                break

    print(complaint)
    top_10_offense_scores_list = []
    for offense_id, score in top_10_offense_scores.items():
        print(f"Offense ID: {offense_id}, Score: {score}%")
        top_10_offense_scores_list.append({
            'offense_id': offense_id,
            'score': score,
            
        })


    return jsonify(top_10_offense_scores=top_10_offense_scores_list, complaints=complaint)

@app.route('/search_students', methods=['POST'])
def search_students():
    if request.method == 'POST':
        search_value = request.form['username']  # Updated to match the input name
        session['search_value'] = search_value

        

        # Perform a database query to search for students in the accounts_cics table
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM accounts_cics WHERE Name LIKE %s", ('%' + search_value + '%',))
        search_results = db_cursor.fetchall()
        db_cursor.close()

        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT * FROM sanctions WHERE username LIKE %s", ('%' + search_value + '%',))
        search_results = db_cursor.fetchall()
        db_cursor.close()

        # Check if any results were found
        if search_results:
            # Retrieve the first result (you can modify this logic as needed)
            first_result = search_results[0]

            # Extract the name and course from the result
            name = first_result['Name']
            course = first_result['CourseOrPosition']
          


            # Return the name and course as JSON
            return jsonify({'name': name, 'course': course, 'search_value': session.get('search_value')})
        else:
            # No results found, return an error message as JSON
            print(session.get('name'))
            print(session.get('course'))
            return jsonify({'error': 'No results found'})
        
        
@app.route('/forms')
def forms():
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
            db_cursor.execute("SELECT * FROM forms_osd WHERE course = %s", (user_course,))
            reports = db_cursor.fetchall()
    else:
        # For other roles, simply retrieve reports for the logged-in user
        db_cursor.execute("SELECT * FROM forms_osd WHERE username = %s", (username,))
        reports = db_cursor.fetchall()
        user_course = ""

    # Close the cursor
    db_cursor.close()

    return render_template('forms.html', reports=reports, user_source=user_source, user_course=user_course)

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

        
    return "Form not found", 404

@app.route('/sanctions', methods=['GET', 'POST'])
def sanctions():
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM sanctions WHERE username = %s", ("Aedrian Jeao De Torres",))
    sanctions = db_cursor.fetchall()
    print(sanctions)
    db_cursor.close()

   
    return render_template('homepage.html', sanctions=sanctions)

@app.route('/hello', methods=['GET', 'POST'])
def homepage():
    username = session.get('username', '')

    
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
        db_cursor1.execute("SELECT image_data, Name, Course, Year FROM accounts_cics WHERE username = %s", (username,))
        role ="student"

    elif user_source == 'accounts_coordinators':
        db_cursor1.execute("SELECT image_data, Name, Course FROM accounts_coordinators WHERE username = %s", (username,))
        role ="coord"
    else:
        # Handle the case where user_source is unknown
        db_cursor1.execute("SELECT image_data, Name, Course, Year FROM accounts_cics WHERE username = %s", (username,))

    result_user_data = db_cursor1.fetchone()

    if role == "student":
        profile_picture_data, name, course, year = result_user_data
        session['namestudent'] = name
        print(name)

    elif role == "coord":
        profile_picture_data, name, course = result_user_data
        
        year=""
        session['namestudent'] = name
        session['courseall'] = course
        print(name)

    else:
        # Handle the case where user data is not found
        profile_picture_data = None
        name = "Name not found"
        course = "Course/Position not found"


     # Retrieve the sanctions data within the homepage route
    db_cursor_sanctions = db_connection.cursor()
    db_cursor_sanctions.execute("SELECT * FROM sanctions WHERE username = %s", (name,))
    sanctions = db_cursor_sanctions.fetchall()
    db_cursor_sanctions.close()

    db_cursor_call = db_connection.cursor()
    db_cursor_call.execute("SELECT * FROM callslip WHERE coord = %s", (name,))
    call = db_cursor_call.fetchall()
    db_cursor_call.close()

    

    # Encode the profile picture data as a Base64 string
    if profile_picture_data is not None:
        profile_picture_base64 = base64.b64encode(profile_picture_data).decode('utf-8')
    else:
        profile_picture_base64 = None  # Handle the case where there is no profile picture data

    # Pass the sorted offenses, username, profile picture (Base64), name, course, and user_source to the template
    return render_template('homepage.html', username=username,profile_picture_base64=profile_picture_base64, name=name, course=course, year=year,user_source=user_source,sanctions=sanctions,call=call)

def lookup_student_info(username):
    try:
        db_cursor = db_connection.cursor(dictionary=True)
       

        # Assuming you have a table called 'students' with columns 'username', 'name', and 'course'
        query = "SELECT Name, Course FROM accounts_cics WHERE username = %s"
        db_cursor.execute(query, (username,))
        student_data = db_cursor.fetchone()

        if student_data:
            student_name = student_data['Name']
            student_course = student_data['Course']
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


# Usage example:
@app.route('/count', methods=['POST'])
def count():
    

    username = session.get('courseall','')

    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT COUNT(*) FROM reports WHERE course = %s", (username,))
    result = db_cursor.fetchone()

    db_cursor.execute("SELECT COUNT(*) FROM forms_osd WHERE course = %s", (username,))
    result1 = db_cursor.fetchone()

    countreports = result[0]
    countrequest = result1[0]

    print(countreports)

    # Return the result as JSON
    student_data = {'Reports': countreports, 'Request': countrequest}
    return jsonify(student_data)

@app.route('/download_report_file/<string:report_id>')
def download_report_file(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT file_form, file_form_name FROM reports WHERE report_id = %s", (report_id,))
    result = db_cursor.fetchone()

    if result is not None:
        file_data, file_name = result

        # Set the content type header to PDF
        content_type = 'application/pdf'

        # Set the filename to "default.pdf"
        response = make_response(file_data)
        response.headers['Content-Type'] = content_type

        # Set the filename to "default.pdf"
        response.headers['Content-Disposition'] = f'attachment; filename="{file_name}.pdf"'

        # Close the cursor after fetching the result
        db_cursor.close()

        return response

    # Handle the case where the file is not found
    db_cursor.close()
    return "File not found", 404



@app.route('/download_supporting_document/<string:report_id>')
def download_supporting_document(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT file_support_name, file_support_type, file_support FROM reports WHERE report_id = %s", (report_id,))
    result = db_cursor.fetchone()

    if result is not None:
        file_name, file_type, file_data = result

        # Set the content type header based on the supporting document's type stored in the database
        content_type = file_type

        # Set the filename to have the original name and extension
        response = make_response(file_data)
        response.headers['Content-Type'] = content_type

        # Set the filename based on the stored name and extension
        response.headers['Content-Disposition'] = f'attachment; filename="{file_name}{file_type}"'

        # Close the cursor after fetching the result
        db_cursor.close()

        return response

    # Handle the case where the file is not found
    db_cursor.close()
    return "File not found", 404

@app.route('/download_report_file1/<string:report_id>')
def download_report_file1(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT file_form, file_form_name FROM forms_osd WHERE form_id = %s", (report_id,))
    result = db_cursor.fetchone()

    if result is not None:
        file_data, file_name = result

        # Set the content type header to PDF
        content_type = 'application/pdf'

        # Set the filename to "default.pdf"
        response = make_response(file_data)
        response.headers['Content-Type'] = content_type

        # Set the filename to "default.pdf"
        response.headers['Content-Disposition'] = f'attachment; filename="{file_name}.pdf"'

        # Close the cursor after fetching the result
        db_cursor.close()

        return response

    # Handle the case where the file is not found
    db_cursor.close()
    return "File not found", 404



@app.route('/download_supporting_document1/<string:report_id>')
def download_supporting_document1(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT file_support_name, file_support_type, file_support FROM forms_osd WHERE form_id = %s", (report_id,))
    result = db_cursor.fetchone()

    if result is not None:
        file_name, file_type, file_data = result

        # Set the content type header based on the supporting document's type stored in the database
        content_type = file_type

        # Set the filename to have the original name and extension
        response = make_response(file_data)
        response.headers['Content-Type'] = content_type

        # Set the filename based on the stored name and extension
        response.headers['Content-Disposition'] = f'attachment; filename="{file_name}{file_type}"'

        # Close the cursor after fetching the result
        db_cursor.close()

        return response

    # Handle the case where the file is not found
    db_cursor.close()
    return "File not found", 404

@app.route('/change_report_status/<string:report_id>', methods=['POST'])
def change_report_status(report_id):
    new_status = request.form['new_status']
    print(new_status)
    print(report_id)
    db_cursor = db_connection.cursor()
    db_cursor.execute("UPDATE reports SET status = %s WHERE report_id = %s;", (new_status, report_id))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    flash('Status has been successfully changed', 'success')

    return redirect(url_for('menu'))

@app.route('/change_report_status1/<string:report_id>', methods=['POST'])
def change_report_status1(report_id):
    new_status = request.form['new_status']
    print(new_status)
    print(report_id)
    db_cursor = db_connection.cursor()
    db_cursor.execute("UPDATE forms_osd SET status = %s WHERE form_id = %s;", (new_status, report_id))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    flash('Status has been successfully changed', 'success')

    return redirect(url_for('requestpage'))

@app.route('/delete_call/<string:report_id>', methods=['POST'])
def delete_call(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("DELETE FROM callslip WHERE call_id = %s;", (report_id,))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    return redirect(url_for('homepage'))

@app.route('/delete_report/<string:report_id>', methods=['POST'])
def delete_report(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("DELETE FROM reports WHERE report_id = %s;", (report_id,))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    return redirect(url_for('menu'))

@app.route('/delete_report1/<string:report_id>', methods=['POST'])
def delete_report1(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("DELETE FROM forms_osd WHERE form_id = %s;", (report_id,))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    return redirect(url_for('requestpage'))

@app.route('/delete_all_report1/<string:report_id>/<string:status>', methods=['POST'])
def delete_all_report1(report_id, status):
    if status == "Result":
        db_cursor = db_connection.cursor()
        db_cursor.execute("DELETE FROM forms_osd WHERE course = %s AND status = 'Approved' OR status = 'Rejected';", (report_id,))
        db_connection.commit()  # Make sure to commit the changes to the database
        db_cursor.close()
        return redirect(url_for('requestpage'))
        
    else:
        db_cursor = db_connection.cursor()
        db_cursor.execute("DELETE FROM forms_osd WHERE course = %s AND status = %s;", (report_id, status))
        db_connection.commit()  # Make sure to commit the changes to the database
        db_cursor.close()
        return redirect(url_for('requestpage'))

    

@app.route('/delete_all_report/<string:report_id>', methods=['POST'])
def delete_all_report(report_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute("DELETE FROM reports WHERE course = %s;", (report_id,))
    db_connection.commit()  # Make sure to commit the changes to the database
    db_cursor.close()

    return redirect(url_for('menu'))

@app.route('/lookup_sanctions', methods=['POST'])
def lookup_sanctions():
    if request.method == 'POST':
        name = session.get('name', '')  # Updated to match the input name

        # Perform a database query to search for sanctions based on the username
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT date_time, sanction, sanctions_id FROM sanctions WHERE Username LIKE %s", ('%' + name + '%',))
        search_sanctions = db_cursor.fetchall()
        db_cursor.close()

        # Check if any sanctions were found
        if search_sanctions:
            # Convert datetime objects to string representations
            formatted_sanctions = [{'date_time': str(entry[0]), 'sanction': entry[1],'sanctions_id': entry[2]} for entry in search_sanctions]
            return jsonify({'sanctions': formatted_sanctions})
        else:
            return jsonify({'error': 'No sanctions found'})
        
@app.route('/logout', methods=['GET'])
def logout():
    # Clear the session data
    session.clear()
    
    # Redirect the user to the login page or any other appropriate page
    return redirect('/')


@app.route('/preview_call_file/<string:report_id>', methods=['GET'])
def preview_call_file(report_id):
    db_cursor = None  # Initialize db_cursor to None

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT file FROM callslip WHERE call_id = %s", (report_id,))
        file_content = db_cursor.fetchone()


        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/pdf',
            )

            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'

            return response
    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here
    finally:
        if db_cursor is not None:
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404



@app.route('/preview_written_file/<string:report_id>', methods=['GET'])
def preview_written_file(report_id):
    db_cursor = None  # Initialize db_cursor to None

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT written FROM sanctions WHERE sanctions_id = %s", (report_id,))
        file_content = db_cursor.fetchone()


        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/pdf',
            )

            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'

            return response
    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here
    finally:
        if db_cursor is not None:
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404

@app.route('/preview_report_file/<string:report_id>' , methods=['GET'])
def preview_report_file(report_id):
    db_cursor = None  # Initialize db_cursor to None
    

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT file_form FROM reports WHERE report_id = %s", (report_id,))
        file_content = db_cursor.fetchone()

        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/pdf',
            )
            
            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'
            
            return response

    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here

    finally:
        if db_cursor is not None:
            
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404,


@app.route('/preview_support_file/<string:report_id>', methods=['GET'])
def preview_support_file(report_id):
    db_cursor = None  # Initialize db_cursor to None

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT file_support FROM reports WHERE report_id = %s", (report_id,))
        file_content = db_cursor.fetchone()
        db_cursor.execute("SELECT file_support_type FROM reports WHERE report_id = %s", (report_id,))
        file_type = db_cursor.fetchone()

        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/octet-stream',
            )

            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'

            return response

    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here

    finally:
        if db_cursor is not None:
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404

@app.route('/preview_report_file1/<string:report_id>' , methods=['GET'])
def preview_report_file1(report_id):
    db_cursor = None  # Initialize db_cursor to None
    

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT file_form FROM forms_osd WHERE form_id = %s", (report_id,))
        file_content = db_cursor.fetchone()

        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/pdf',
            )
            
            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'
            
            return response

    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here

    finally:
        if db_cursor is not None:
            
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404,


@app.route('/preview_support_file1/<string:report_id>' , methods=['GET'])
def preview_support_file1(report_id):
    db_cursor = None  # Initialize db_cursor to None
    

    try:
        db_cursor = db_connection.cursor()
        db_cursor.execute("SELECT file_support FROM forms_osd WHERE form_id = %s", (report_id,))
        file_content = db_cursor.fetchone()

        if file_content:
            file_content = file_content[0]

            response = send_file(
                io.BytesIO(file_content),
                mimetype='application/pdf',
            )
            
            response.headers['Content-Disposition'] = f'inline; filename=report_{report_id}.pdf'
            
            return response

    except Exception as e:
        # Handle any exceptions, e.g., log the error
        pass  # Add your error handling code here

    finally:
        if db_cursor is not None:
            
            db_cursor.close()  # Close the cursor if it's not None

    # Handle the case where the file was not found
    return "File not found", 404,

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')