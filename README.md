# Admin and User Management Portal

## Project Overview

This project is a React-based Admin and User Management Portal developed as part of Assignment 2 and Assignment 3.

It allows administrators to manage users and support requests, while users can manage their profiles and submit support requests.

## Features

**Admin Panel**
- Admin Login with validation.
- Dashboard displaying total users, active users, inactive users and support request statistics.
- Add, edit and delete users.
- Search and filter users.
- View and manage support requests.
- Update support request status.

**User Panel**
- User Login and Registration.
- User Dashboard with personal information and request statistics.
- View and edit profile details.
- Change password with validation.
- Submit new support requests.
- View personal support requests.
- Track request status (Pending, In Progress, Resolved).
- Edit pending support requests.

## Demo Login Credentials

**Admin Account**

- Email: admin@gmail.com
- Password: Admin@123

**User Account**

- Email: user@gmail.com
- Password: User@123

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/itspriyanka-39/admin-user-management_portal.git
   ```

2. Navigate to the project folder:

   ```bash
   cd admin-management-portal
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal.

## Technologies Used

- React.js
- JavaScript
- React Router DOM
- Context API
- HTML
- CSS
- Lucide React
- LocalStorage

## Data Storage

The application uses browser LocalStorage to persist user information and support requests across page refreshes.

Admin and User panels share the same application data, so changes made by either panel are reflected in the other.

**Note:** This is a frontend demonstration project. It does not use a backend server or database. LocalStorage is not secure authentication.

## Project Structure

```text
src/
├── components/
│   ├── sidebar.jsx
│   ├── navbar.jsx
│   ├── statCard.jsx
│   └── userSidebar.jsx
├── context/
│   └── AppContext.jsx
├── pages/
│   ├── dashboard.jsx
│   ├── users.jsx
│   ├── supportRequests.jsx
│   ├── login.jsx
│   ├── register.jsx
│   ├── userPanel.jsx
│   ├── myProfile.jsx
│   └── supportCenter.jsx
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

## Assignments

- Assignment 2: Admin Management Panel
- Assignment 3: User Management Panel

**Total Time Spent:** Approximately 15 hours