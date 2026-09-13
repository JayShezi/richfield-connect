# Richfield Connect

Richfield Connect is a social platform project built with **React** and **Vite** for coursework.  
It allows students to connect, share posts, and view profiles in a modern web interface.

---

## 📂 Project Structure

richfield-connect/
├── public/                # Static assets (index.html, favicon)
├── src/
│   ├── assets/            # Images (hero.png, react.svg, vite.svg)
│   ├── components/        # Reusable UI parts
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SignUpForm.jsx
│   │   ├── Post.jsx
│   │   ├── ProfilePreview.jsx
│   │   └── CreatePost.jsx
│   ├── context/           # Global state management
│   │   └── AppContext.jsx
│   ├── views/             # Page views
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Feed.jsx
│   │   ├── Profile.jsx
│   │   └── About.jsx
│   ├── App.jsx            # Main app component
│   ├── App.css            # App styling
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
│   └── vite.config.js     # Vite configuration
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/JayShezi/richfield-connect.git
cd richfield-connect

---

2. Install dependencies
npm install

---

3. Run the development server
npm run dev
Open http://localhost:5177/ in your browser.

---

✨ Features

🔐 Sign Up Form — Register new users
📰 Feed Page — View posts from others
👤 Profile Page — Preview and manage user profiles
📌 About Page — Learn about the project
🌐 Navbar & Footer — Easy navigation and layout consistency

---

🛠️ Technologies Used

React (JSX components)
Vite (fast dev server + build tool)
CSS (styling)
Git & GitHub (version control)

---

📖 Future Improvements

Add login authentication
Enable post editing/deletion
Improve responsive design for mobile devices
Add dark mode support

Developed as part of the Web Technology coursework









