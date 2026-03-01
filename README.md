🎨 Online Examination System – Frontend

This is the frontend application for the Online Examination System built using React (Vite).
It provides the user interface for both Examiners and Examinees, communicating with the Django backend via REST APIs.

🚀 Overview

The frontend handles:

Rendering exams and questions

Allowing examiners to create exams

Allowing examinees to attempt exams

Submitting answers to backend

Displaying results dynamically

This application consumes REST APIs exposed by the Django backend.

🛠️ Technologies Used

React (Vite)

JavaScript (ES6+)

Axios (API communication)

React Router (if used)

🏗️ Application Structure
src/

 ├── components/
 
 ├── pages/
 
 ├── services/       # API calls

 ├── App.jsx
 
 └── main.jsx
 
🔗 API Communication

The frontend communicates with the backend through REST endpoints such as:

GET /api/exams/

POST /api/exams/

POST /api/submit/

GET /api/results/

Axios is used to send HTTP requests and handle responses.

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/yourusername/online-exam-frontend.git

cd online-exam-frontend

2️⃣ Install dependencies

npm install

3️⃣ Configure API Base URL

Create a .env file:

VITE_API_BASE_URL=http://127.0.0.1:8000/api

4️⃣ Run development server

npm run dev

App runs at:

http://localhost:5173
🎯 Features
Examiner Interface

Create exams

Add questions and answers

View submitted results

Examinee Interface

View available exams

Attempt questions

Submit answers

View scores

📌 Future Improvements

Authentication (JWT)

Timed exams

Improved UI/UX

Form validation enhancements

Deployment configuration
Real-world application structure
