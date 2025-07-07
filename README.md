# 📝 Document Summarizer

A full-stack AI-powered web application that allows users to **upload PDF or DOCX files**, automatically **extract and summarize** the content, and ask **contextual questions** about the document. Built with **React** and **Flask**, and powered by **Google Gemini API**, this tool simplifies document comprehension.

---

## 🚀 Features

- 📂 Upload `.pdf` or `.docx` files
- 🔍 Extract text from uploaded files
- 🧠 Generate concise summaries using Google Gemini
- ❓ Ask questions about the document and receive AI-generated answers
- 💾 Store document content and metadata in a MySQL database
- 🖥️ Responsive and user-friendly UI built with React

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Frontend  | React, Axios, Tailwind CSS |
| Backend   | Flask, Flask-CORS       |
| Database  | MySQL                   |
| NLP Model | Google Gemini API       |
| File Parsing | pdfplumber (PDF), python-docx (DOCX) |

---

## 🧪 How It Works

1. Users upload a `.pdf` or `.docx` file from the frontend.
2. Flask backend extracts the content using `pdfplumber` or `python-docx`.
3. Extracted content is saved into a MySQL database.
4. Google Gemini API is used to generate a summary of the document.
5. Users can ask context-based questions and receive AI answers from Gemini.

