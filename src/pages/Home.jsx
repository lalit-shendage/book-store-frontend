import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../assets/Home.css'

const Home = () => {
  const { token, getUserOrder, editUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchOrders(user, token);
    }
  }, []);

  const fetchOrders = async (user, token) => {
    const data = await getUserOrder(user, token);
    setOrders(data.orders);
    
  };

  const handleUpdateUser = () => {
    setEditing(true);
    setUpdatedUser({ name: user.name, email: user.email, address: user.address });
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(updatedUser)
    setEditing(false);
  };
  const calculateTotalBooks = (order) => {
    let totalBooks = 0;
    order.books.forEach((book) => {
      totalBooks += book.quantity;
    });
    return totalBooks;
  };

  return (
    <>
    <div>
      {user && (
        <div className='container'>
          <div className="Userdetails ">
          <h2>User Details</h2>
          {editing ? (
            <>
           <form className="user-form card-home" onSubmit={handleSubmit}>
           <label className="form-label">
             Name:<br/>
             <input className="form-input" type="text" name="name" value={updatedUser.name} onChange={handleInputChange} />
           </label>
           <label className="form-label">
             Email:<br/>
             <input className="form-input" type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
           </label>
           <label className="form-label">
             Address:<br/>
             <input className="form-input" type="text" name="address" value={updatedUser.address} onChange={handleInputChange} />
           </label>
           <button className="form-button btn" type="submit">Save</button>
         </form>
         </>
          ) : (
            <div className="user-details card-home">
            <p className="user-info">Name: {user.name}</p>
            <p className="user-info">Email: {user.email}</p>
            <p className="user-info">Address: {user.address}</p>
            <button className="update-button btn" onClick={handleUpdateUser}>Update User</button>
          </div>
          
          )}
        </div>
        <div className="order">
          <h2>User Orders</h2>
          {orders.length > 0 ? (
             <ul className="order-list">
             {orders.map((order) => (
               <li className="order-item card-home-order " key={order._id}>
                 <p className="order-id">Order ID: {order._id}</p>
                 <p className="total-books">Total Books: {calculateTotalBooks(order)}</p>
                 <p className="order-total">Order Total: {order.totalAmount}</p>
                 
               </li>
             ))}
           </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
