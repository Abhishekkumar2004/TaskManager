# Task Manager

A full-stack MERN Task Manager application that allows users to register, log in securely, and manage their personal tasks. It includes JWT authentication, task CRUD operations, task statistics, progress tracking, task details, and a responsive modern interface.

## 🚀 Features

- 🔐 User registration and login
- 🍪 JWT authentication using HTTP cookies
- 🛡️ Protected routes
- 👤 User-specific task management
- ➕ Create tasks
- 🔄 Update task status
- ✅ Mark tasks as completed or pending
- ✏️ Edit task title and description
- 👁️ View task details
- 🗑️ Delete tasks
- 📊 Total, pending, and completed task statistics
- 📈 Task completion progress
- 🕒 Task creation date and time
- 🔔 Toast notifications
- 📱 Responsive design
- 🎨 Modern gradient UI
- ✨ Lucide icons
- 🔒 Password hashing with bcrypt
- 🗄️ MongoDB with Mongoose

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

---

## 📁 Project Structure

```text
TaskManager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── Pages/
│   │   └── services/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekkumar2004/TaskManager.git
cd TaskManager
```

---

## 🔧 Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

⚠️ Never upload your `.env` file to GitHub.

### Start the Backend

```bash
npm run dev
```

Backend server:

```text
http://localhost:3000
```

---

## 💻 Frontend Setup

Open another terminal and go to the project root:

```bash
cd TaskManager
```

Then go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend application:

```text
http://localhost:5173
```

---

## 🔐 Authentication

The application uses JWT authentication with HTTP cookies.

### Authentication Flow

1. User creates an account.
2. User logs in with email and password.
3. Backend validates the credentials.
4. A JWT is generated.
5. JWT is stored in a cookie.
6. Protected requests automatically send the cookie.
7. Backend verifies the JWT.
8. The authenticated user's ID is used to access their tasks.

Axios is configured to send credentials:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current authenticated user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all user's tasks |
| GET | `/api/tasks/:id` | Get a specific task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 📝 Task Model

Each task contains:

```javascript
{
  title: String,
  description: String,
  completed: Boolean,
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

Mongoose timestamps automatically create:

```text
createdAt
updatedAt
```

The application uses `createdAt` to display when a task was created.

---

## 👤 User Model

Each user contains:

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

Passwords are hashed using bcrypt before being stored in MongoDB.

---

## 📊 Dashboard

The dashboard provides:

- Total tasks
- Pending tasks
- Completed tasks
- Completion percentage
- Task progress
- Personalized welcome section

The Dashboard is focused on task statistics and progress.

---

## ➕ Create Task

The Create Task page provides:

- Task title
- Task description
- Completion status
- Task creation
- Form validation
- Toast notifications

---

## 📋 My Tasks

The My Tasks page displays all tasks created by the currently logged-in user.

Users can:

- View all personal tasks
- View task details
- Edit task title and description
- Mark tasks as completed or pending
- Delete tasks
- View task creation date and time

Tasks are displayed in a responsive layout with two cards per row on medium and larger screens.

---

## 👁️ Task Details

The Task Details page allows users to view detailed information about a selected task.

It includes:

- Task title
- Task description
- Completion status
- Creation date
- Creation time

The page uses:

```http
GET /api/tasks/:id
```

to retrieve a specific task.

---

## 🎨 UI

The application features:

- Modern gradient backgrounds
- Responsive design
- Glassmorphism-style cards
- Task status indicators
- Progress bar
- Hover animations
- Lucide icons
- Toast notifications
- Mobile-friendly layout
- Responsive two-column task cards

---

## 🔒 Security

The application includes:

- JWT authentication
- HTTP cookie-based authentication
- Password hashing with bcrypt
- Protected API routes
- User-specific task ownership
- CORS configuration
- MongoDB validation

Each task is associated with its authenticated user, so users can only access and modify their own tasks.

---

## 🚀 Future Improvements

- Task search
- Task filtering
- Task sorting
- Task categories
- Task priorities
- Task due dates
- Dark mode
- Pagination
- Email verification
- Password reset
- Deployment

---

## 👨‍💻 Author

**Abhishek Kumar**

GitHub:

```text
https://github.com/Abhishekkumar2004/TaskManager
```

---
This project is open-source and available under the MIT License.

⭐ If you like this project, consider giving it a star!
