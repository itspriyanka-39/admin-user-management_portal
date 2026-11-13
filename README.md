# Admin Management Panel

A simple Admin Management Panel built using React. This application allows administrators to manage users, monitor dashboard statistics, and handle support requests.

## Features

### 1. Admin Login
- Secure login page with dummy credentials.
- Email and password validation.
- Error messages for invalid login attempts.

### 2. Admin Dashboard
- Total users count.
- Active and inactive users count.
- Total support requests.
- Pending, In Progress, and Resolved request counts.

### 3. User Management
- View all users in a table.
- Add new users.
- Edit existing user details.
- Delete users with confirmation.
- Search users by name.
- Filter users by Active and Inactive status.

### 4. Support Request Management
- View all support requests.
- View individual request details.
- Update request status.
- Search requests by subject or user name.
- Filter requests by status.
- Reflect updated request statuses in the corresponding User Panel.

### 5. User Panel
- View user profile information.
- View support requests associated with the logged-in user.
- Check updated request statuses.

### 6. Validation and Error Handling
- Required field validation.
- Email format validation.
- Duplicate email prevention.
- Confirmation before deleting users.
- Success and error messages.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Lucide React
- Browser LocalStorage

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
   git git clone https://github.com/itspriyanka-39/Admin-Portal.git
   ```

2. Navigate to the project folder:

   ```bash
   cd Admin-management
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

## Data Storage

The application uses browser LocalStorage to persist user and support request data across page refreshes.

**Note:** This is a frontend demonstration project. It does not use a backend server or database.

## Project Structure

```text
src/
├── components/
│   ├── sidebar.jsx
│   ├── navbar.jsx
│   └── statCard.jsx
├── context/
│   └── AppContext.jsx
├── pages/
│   ├── dashboard.jsx
│   ├── users.jsx
│   ├── supportRequests.jsx
│   ├── login.jsx
│   └── userPanel.jsx
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```
Total Time Spent: Approximately 10 hours

