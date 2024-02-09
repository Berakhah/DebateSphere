// import React, { createContext, useState, useEffect } from 'react';
// import { loginService, logoutService, checkAuthStatus } from './api/auth'; // Assume these functions are defined in your API service

// // Create the context
// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     user: null
//   });

//   // Function to handle login
//   const login = async (credentials) => {
//     const userData = await loginService(credentials);
//     if (userData) {
//       setAuthState({ isAuthenticated: true, user: userData });
//     }
//   };

//   // Function to handle logout
//   const logout = () => {
//     logoutService(); // You may need to handle async operations and errors
//     setAuthState({ isAuthenticated: false, user: null });
//   };

//   // Check authentication status on component mount
//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const isAuthenticated = await checkAuthStatus();
//       if (isAuthenticated) {
//         setAuthState({ ...authState, isAuthenticated });
//       }
//     };

//     checkAuthentication();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ ...authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
