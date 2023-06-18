const BASE_URL = 'http://localhost:5000/';

export const signUp = async (email, name, password) => {
    try {
        console.log("sign in api")
      const response = await fetch(`${BASE_URL}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  export const signIn = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  export const getAllBooks = async () => {
    try {
        const response= await fetch(`${BASE_URL}books/fetchBooks`);
        const data=await response.json();
        return data;
    } catch (error) {
        
    }
  };

  export const getUserOrders =async(user, token)=>{
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}order/userOrder/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':authToken,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error confirming order');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const confirmOrder = async (orderData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':authToken,
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Error confirming order');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const editUser =async (updatedUser)=>{
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':authToken,
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error('Error confirming order');
      }
  
      const data = await response.json();
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedCurrentUser = { ...currentUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
      window.location.reload();
      return data;
    } catch (error) {
      throw error;
    }
  }