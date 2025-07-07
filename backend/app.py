import os
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
from google import genai


# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Only run this block for Gemini Developer API
client = genai.Client(api_key='AIzaSyAIOZVaky74QcOurpgD9dj-RrxZppLpPsg')

# MySQL database connection
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Aryan@1234",
        database="document_summarizer"
    )
    return connection

# Extract text from PDF
def extract_text_from_pdf(file):
    text = ''
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    return text

# Extract text from DOCX
def extract_text_from_docx(file):
    doc = Document(file)
    text = ''
    for para in doc.paragraphs:
        text += para.text + '\n'
    return text

# Call Cohere API for document summarization
def call_gemini_summary_api(text):
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash-001',
            contents=f"Summarize the following text:\n\n{text}",
        )
        summary = response.text.strip()
        return summary
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None

# Route to handle file upload and text extraction
@app.route('/', methods=['POST'])
def getinpy():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return {'error': 'No file received'}, 400

    filename = uploaded_file.filename
    name, extension = filename.rsplit('.', 1)

    if extension.lower() == 'pdf':
        text = extract_text_from_pdf(uploaded_file)
    elif extension.lower() == 'docx':
        text = extract_text_from_docx(uploaded_file)
    else:
        return jsonify({'error': 'Invalid file type. Please upload a PDF or DOCX.'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO extracted_texts (filename, text) VALUES (%s, %s)",
        (filename, text)
    )
    connection.commit()
    cursor.close()
    connection.close()

    summary_text = call_gemini_summary_api(text)
    if not summary_text:
        return jsonify({'error': 'Failed to summarize the text with Cohere.'}), 500

    return jsonify({
        'message': 'File uploaded and text extracted successfully',
        'filename': filename,
        'summary': summary_text
    }), 200

# Route to handle question and answer using Cohere
@app.route('/Summary', methods=['POST'])
def ask_question():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Invalid or missing JSON in request'}), 400

    question = data.get('question')
    filename = data.get('filename')

    if not question or not filename:
        return jsonify({'error': 'Missing question or filename'}), 400

    # Get text from database
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT text FROM extracted_texts WHERE filename = %s", (filename,))
        result = cursor.fetchone()
        cursor.close()
        connection.close()
    except Exception as db_error:
        print(f"Database error: {db_error}")
        return jsonify({'error': 'Database error'}), 500

    if not result:
        return jsonify({'error': 'No extracted text found for this file'}), 400

    context = result['text']

    try:
        # Call gemini for the answer
        response = client.models.generate_content(
            model='gemini-2.0-flash-001',
            contents=f"Context: {context}\n\nQuestion: {question}\n\nAnswer:",
        )
        answer = response.text.strip()
        return jsonify({'answer': answer}), 200

    except Exception as e:
        print(f"Error calling Gemini for QnA: {e}")
        return jsonify({'error': 'Failed to get an answer from Cohere.'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
