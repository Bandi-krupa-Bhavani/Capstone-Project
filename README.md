📚 BookVerse – Smart Digital Library Portal

BookVerse is an AI-enabled, user-friendly digital library platform designed for SR University students and faculty. It allows users to explore books, manage favourites, track reading progress, and receive personalised recommendations — all with a modern UI and real-time Firebase backend.

🚀 Features
🔐 Secure Authentication

Firebase Email/Password & Google Sign-in

Protected routes

User profiles stored in Firestore

 Elegant Dashboard

Clean brown-themed UI

Sticky header + sliding left sidebar

Explore cards for CS, Programming, Advanced Topics, Mechanical, Civil, Electrical, Lifestyle, Research Papers

📖 My Library
⭐ My Favourites

Real-time Firestore sync

LocalStorage fallback

Grid-based modern cards UI

📘 Continue Reading

Tracks the user’s progress

Updates instantly with Firestore listeners

Seamless switching between devices

🎯 AI-Like Recommendations

Sidebar carousel (Because you liked…)

Based on favourites’ metadata like author, tags, domain

Changes in real-time

📚 Domain     Pages

CS Fundamentals, Programming & more

JSON-based book data (local + Firebase mirrored)

Fully responsive card layout + instant search

🎉 Motivational Welcome Popup

Appears on every login

Random image + random caption

Clean close button interaction

PDF Viewer

TTS Controls (Play, Pause, Resume, Seek)

🔥 Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Firebase Auth, Firestore
Hosting: Vercel
Fonts: Inter & Playfair Display
Icons: Font Awesome

🏗️ System Architecture
User
   │
   ▼
Frontend (Vercel)
   │
   ▼
Firebase Authentication
   │
   ▼
Firebase Firestore
   │
   ├── users/{uid}/favourites
   ├── users/{uid}/continueReading
   └── users/{uid}/editProfiles/profile

🔄 Flow Diagram
Login/Signup
      │
      ▼
Dashboard Loaded
      │
      ├── Explore Books
      ├── Add/Remove Favourites
      ├── Update Continue Reading
      └── View Recommendations

📁 Folder Structure
/Capstone-Project
│
├── library-management/
│     ├── index.html
│     ├── home.html
│     ├── dashboard.html
│     ├── cs-fundamentals.html
│     ├── favourites.html
│     ├── continue-reading.html
│     ├── css/
│     ├── js/
│     ├── assets/
│     ├── json/
│     └── firebase-config.js
│
└── README.md

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/Bandi-krupa-Bhavani/Capstone-Project.git

2️⃣ Navigate into project
cd Capstone-Project/library-management

3️⃣ Add your Firebase configuration

Inside firebase-config.js add your:

API Key

Auth Domain

Project ID

Storage Bucket

Messaging Sender ID

App ID

4️⃣ Run locally

Use Live Server in VS Code.

5️⃣ Deploy to Vercel

Go to Vercel

Import GitHub repo

Set root directory → library-management

Deploy 🚀

⭐ Why BookVerse Stands Out

Built specifically for SR University

Real-time behaviour across favourites & reading lists

Smart recommendations

Modern aesthetic UI

Smooth navigation flow

Popup branding & personalised welcome

Optimised for both desktop & mobile

👨‍💻 Team BookVerse

Vignesh Masani

Bhavani

Shivani

Chaitanya

Jyoshna

📄 License

This project is for academic and research use under SR University Capstone Project Guidelines.
