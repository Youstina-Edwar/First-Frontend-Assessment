# First-Frontend-Assessment
# Task Manager App

A modern Task Manager application built with React that helps users organize and track their daily tasks.
The application provides task creation, editing, deletion, completion tracking, searching, filtering, drag-and-drop reordering, and persistent storage using the browser's Local Storage.

## Features

# Task Management
- Add new tasks with:
  - Title
  - Description
  - Priority level (Low, Medium, High)
- Edit tasks
- Delete tasks
- Mark tasks as complete or incomplete

# Task Organization
- Drag and drop tasks to reorder them
- Filter tasks by:
  - All
  - Active
  - Completed
- Search tasks by title

# Data Persistence
- Tasks are automatically saved in Local Storage
- Data remains available after page refresh or browser restart

# User Experience
- Success messages for task creation
- Form validation for empty task titles
- Responsive design for desktop and mobile devices

# Custom Hooks
- `useLocalStorage` for persistent storage
- `useTasks` for task-related operations and state management



## Installation and Setup

# Prerequisites

install:
- Node.js
- npm

# Clone the Repository

```bash
git clone https://github.com/Youstina-Edwar/First-Frontend-Assessment.git
```

# Navigate to the Project

```bash
cd Task1
```

# Install Dependencies

```bash
npm install
```

# Start Development Server

```bash
npm run dev
```



## Technology Stack

# Frontend
- React
- JavaScript

# Styling
- Tailwind CSS

# State Management
- React Hooks
  - useState
  - useEffect
  - Custom Hooks

# Drag and Drop
- @hello-pangea/dnd

# Data Storage
- Browser Local Storage

# Build Tool
- Vite




## Known Issues / Limitations

- Local Storage data is limited to a single browser and device.
- No user authentication or cloud synchronization.




## Project Structure

```text
src/
│
├── Components/
│   ├── AddTask.jsx
│   ├── EditTask.jsx
│   └── DeleteTask.jsx
│
├── Hooks/
│   ├── LocalStorage.jsx
│   └── useTasks.jsx
│
├── App.jsx
└── main.jsx
```



## Author

**Youstina Edwar**

Frontend Intern

Built as part of a Frontend Assessment project using React and Tailwind CSS