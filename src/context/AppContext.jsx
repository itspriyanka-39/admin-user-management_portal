
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// LocalStorage se data read karne ke liye
function getStoredData(key, defaultData) {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error('Error reading LocalStorage:', error);
  }

  return defaultData;
}

export function AppProvider({ children }) {
  const [search, setSearch] = useState('');

  const [users, setUsers] = useState(() =>
    getStoredData('adminUsers', [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '9876543210', status: 'Active' },
      { id: 2, name: 'Priya Singh', email: 'priya@gmail.com', phone: '9876543211', status: 'Active' },
      { id: 3, name: 'Aman Verma', email: 'aman@gmail.com', phone: '9876543212', status: 'Inactive' },
      { id: 4, name: 'Sneha Roy', email: 'sneha@gmail.com', phone: '9876543213', status: 'Active' },
      { id: 5, name: 'Arjun Das', email: 'arjun@gmail.com', phone: '9876543214', status: 'Inactive' }
    ])
  );

  const [requests, setRequests] = useState(() =>
    getStoredData('supportRequests', [
      {
        id: 1, userId: 1, userName: 'Rahul Sharma',
        subject: 'Unable to login', category: 'Technical',
        date: '2026-11-10', status: 'Pending',
        description: 'Unable to access my account.'
      },
      {
        id: 2, userId: 2, userName: 'Priya Singh',
        subject: 'Account update', category: 'Account',
        date: '2026-11-09', status: 'In Progress',
        description: 'Need help updating account details.'
      },
      {
        id: 3, userId: 3, userName: 'Aman Verma',
        subject: 'Payment issue', category: 'Billing',
        date: '2026-11-08', status: 'Resolved',
        description: 'Payment-related issue.'
      },
      {
        id: 4, userId: 4, userName: 'Sneha Roy',
        subject: 'Password reset', category: 'Technical',
        date: '2026-11-07', status: 'Pending',
        description: 'Need help resetting my password.'
      }
    ])
  );

  // Users mein changes LocalStorage mein save karna
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  // Support requests mein changes LocalStorage mein save karna
  useEffect(() => {
    localStorage.setItem('supportRequests', JSON.stringify(requests));
  }, [requests]);

  return (
    <AppContext.Provider
      value={{
        search, setSearch,
        users, setUsers,
        requests, setRequests
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
