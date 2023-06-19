import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmOrder } from '../service/api';
import '../assets/Cart.css'

const Cart = () => {
  const navigate = useNavigate();
 
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(cartItems);
  const [checkout, setCheckout] = useState(false);

  const handleIncreaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) => {
      if (book._id === bookId) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (bookId) => {
    const updatedCart = cart.map((book) => {
      if (book._id === bookId && book.quantity > 1) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (bookId) => {
    const updatedCart = cart.filter((book) => book._id !== bookId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateBookTotal = (book) => {
    return book.price * book.quantity;
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, book) => total + calculateBookTotal(book), 0);
  };
  const handleCheckout = () => {
    if (user && user.address) {
      setCheckout(true);
    } else {
      window.alert("please add address in your profile")
      navigate("/Home");
    }
  };

  
  const handleConfirmOrder = async () => {
    window.alert('order placing')
    const bookIds = cart.map((book) => book._id);
    const quantities = cart.map((book) => book.quantity);
  
    try {
      const orderData = {
        userId: user._id,
        bookIds,
        quantities,
      };
  
      const response = await confirmOrder(orderData);
      // Handle the response from the confirmOrder function
      console.log(response);
    } catch (error) {
      console.error('Error confirming order:', error);
      throw error;
    }
  };

  return (
    <div className="cart">
  <h2 className="cart-title">Cart</h2>
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <table className="cart-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.price}</td>
            <td>
              <button className="qtybtn" onClick={() => handleDecreaseQuantity(book._id)}>-</button>
              {book.quantity}
              <button className="qtybtn" onClick={() => handleIncreaseQuantity(book._id)}>+</button>
            </td>
            <td>{book.price * book.quantity}</td>
            <td>
              <button onClick={() => handleRemoveFromCart(book._id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  {cart.length > 0 && (
    <p className="cart-total">
      Total Cart Value: <strong>{calculateCartTotal()}</strong>
    </p>
  )}
  {checkout ? (
    <div className="confirm-order">
      <h3 className="confirm-order-title">Confirm Order</h3>
      <p className="confirm-order-total">Total Price: {calculateCartTotal()}</p>
      <p className="confirm-order-address">Address: {user.address}</p>
      <label className="confirm-order-label">
        <input type="checkbox" /> Confirm Address
      </label>
      <br/>
      <button className="confirm-order-button btn" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  ) : (
    <button className="checkout-button" onClick={handleCheckout}>
      Checkout
    </button>
  )}
</div>

  );
};

export default Cart;
