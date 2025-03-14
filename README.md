# 📌 Todo App

A simple and modern **Todo Web Application** built with **Next.js**, **PostgreSQL**, **Prisma**, and **ShadCN** UI components.

## 🚀 Features

✅ User authentication with NextAuth.js\
✅ Add, edit, and delete todos\
✅ User-specific todo lists\
✅ Responsive UI with ShadCN components\
✅ PostgreSQL database with Prisma ORM

## 🛠 Tech Stack

- **Frontend**: Next.js, React, ShadCN, Tailwind CSS
- **Backend**: Next.js API routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Google OAuth using NextAuth.js

## ⚙️ Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root and add the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4️⃣ Set up Prisma

Run the following commands to set up the database:

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Start the development server

```sh
npm run dev
```

The app will be available at:\
👉 `http://localhost:3000`

---

## 📂 Project Structure

```
📦 todo-app
 ┣ 📂 prisma          # Prisma schema & migrations
 ┣ 📂 src
 ┃ ┣ 📂 app          # Next.js app directory
 ┃ ┃ ┣ 📂 api        # API routes for todos & auth
 ┃ ┃ ┣ 📂 components # Reusable UI components
 ┃ ┃ ┣ 📂 styles     # Global styles & Tailwind CSS
 ┃ ┃ ┗ 📜 layout.tsx # Root layout file
 ┣ 📜 .env           # Environment variables
 ┣ 📜 next.config.js # Next.js configuration
 ┣ 📜 package.json   # Project dependencies
 ┗ 📜 README.md      # Documentation
```

---

## 🚀 Deployment

### **Vercel Deployment**

1. Push your code to GitHub/GitLab
2. Go to [Vercel](https://vercel.com/) and import your repository
3. Set up environment variables in Vercel
4. Deploy the app! 🎉

---

## 🛠 Future Improvements

- ✅ Dark mode support
- ✅ Drag & Drop todos
- ✅ Notifications & reminders
- ✅ Collaborative todo lists

---

## 📝 License

This project is **MIT licensed**.

---

### 🔥 Happy Coding! 🚀

