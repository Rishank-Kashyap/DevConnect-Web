# DevConnect 🚀

DevConnect is a full-stack social networking platform designed for developers to connect, collaborate, and engage with the community. This repository contains the frontend, built with React, Redux, and modern state management tools.

## Features 🌟

### Authentication & Security 🔐
✅ User signup, login, and logout with JWT-based authentication  
✅ Uses httpOnly cookies for secure token storage and session management   
✅ Token-based protected routes for authenticated users  
✅ Role-based access control for admin and users  

### User Profiles 👨‍💻
✅ Create, view, and update developer profiles  
✅ Add bio, skills, and professional details  
✅ Fetch profile details using RESTful APIs  

### Developer Feed 📢
✅ Post and share updates, insights, and discussions  
✅ Engage with posts through likes and comments  
✅ Infinite scrolling for optimized performance  

### Connections & Networking 🌐
✅ Send, accept, and reject connection requests  
✅ View pending requests and existing connections  
✅ Retrieve mutual connections and suggestions  

### State Management & Performance ⚡
✅ Redux Toolkit for centralized state management  
✅ Optimized API requests using RTK Query  
✅ Asynchronous data fetching with React Query 

### Additional Features ✨
✅ Fully responsive UI for a seamless experience across devices  
✅ Error handling with error boundaries  
✅ Form validation using Yup and React Hook Form  

---

## **Tech Stack 🛠️**
### **Frontend (React + Redux) ⚛️**
🔹 **React.js** - Component-based architecture for modular development  
🔹 **Redux Toolkit** - Centralized state management for API calls and UI state  
🔹 **RTK Query & React Query** - Efficient data fetching and caching  
🔹 **React Router** - Client-side navigation for seamless experience   
🔹 **Axios** - HTTP requests with automatic token handling  

---

# **Frontend Routes and API Endpoints**

## **Frontend Routes 📌**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/`  | Landing page of the application |
| `GET`  | `/login`  | User login page |
| `GET`  | `/signup`  | User signup page |
| `GET`  | `/feed`  | User feed page (protected) |
| `GET`  | `/feed/info`  | View detailed user profile from feed (protected) |
| `GET`  | `/profile`  | View logged-in user’s profile (protected) |
| `GET`  | `/editProfile`  | Edit user profile details (protected) |
| `GET`  | `/connections`  | View user’s accepted connections (protected) |
| `GET`  | `/connections/info`  | View details of a specific connection (protected) |
| `GET`  | `/requests`  | View pending incoming connection requests (protected) |
| `GET`  | `/requests/info`  | View detailed information of a specific request (protected) |
| `GET`  | `/editPassword`  | Change user password (protected) |
| `POST` | `/logout`  | Logs out the user and clears session data (protected) |
| `GET`  | `*`  | Error page for undefined routes |

---
