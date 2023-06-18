import React, { createContext, useState, useEffect } from 'react';
import { signIn, signUp, getUserOrders } from '../service/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  
  useEffect(() => {
    // Check if the authentication token exists in localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  // Sign in user and set authentication token
  const handleSignIn = async (email, password) => {
    try {
      const data = await signIn(email, password);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user in localStorage
      await setUser(data.user);
      await console.log(user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };
  

  // Sign up user and set authentication token
  const handleSignUp = async (email, name, password) => {
    try {
      const data = await signUp(email, name, password);
      setToken(data.token);
      // Store the token in localStorage
      // localStorage.setItem('authToken', data.token);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

const getUserOrder=async(user)=>{
  try {
    const data= await getUserOrders(user)
    return data
  } catch (error) {
    console.log('error ', error);
    throw error;
  }
}

  // Log out user and clear authentication token
  const handleLogout = () => {
    setUser(null);
    setToken('');
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  // Provide the authentication context to the app
  // Provide the authentication context to the app
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn: handleSignIn,
        signUp: handleSignUp,
        logout: handleLogout,
        getUserOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
    }

    export { AuthContext, AuthProvider };
