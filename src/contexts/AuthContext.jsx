import React, { createContext, useState, useEffect } from 'react';
import { signIn, signUp, getUserOrders, editUser } from '../service/api';

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
      console.log(data)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      await setUser(data.user);
       console.log(user);
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
const handleEditUser =async (updatedUser)=>{
  
  try {
    const data = await editUser(updatedUser)
  return data;
  } catch (error) {
    console.log('error ', error);
    throw error;
  }
}

  // Log out user and clear localstorage
  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

 
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn: handleSignIn,
        signUp: handleSignUp,
        logout: handleLogout,
        getUserOrder,
        editUser:handleEditUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
    }

    export { AuthContext, AuthProvider };
