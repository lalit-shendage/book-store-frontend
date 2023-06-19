import React from "react";
// import Flippy, { FrontSide, BackSide } from 'react-flippy';

const BookCard = ({ book }) => {
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedBook = { ...book, quantity: 1 };
    const updatedCartItems = [...cartItems, updatedBook];
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  return (
    // <Flippy
    //   flipOnHover={true}
    //   flipOnClick={false}
    //   flipDirection="horizontal"
    //   style={{ width: '200px', height: '400px', margin: '10px' }}
    // >
    //   <FrontSide>
    //     <div>
    //       <img src={book.imageLink} alt={book.title} style={{ width: '100%' }} />
    //       <h3 className='book-title'>{book.title}</h3>
    //     </div>
    //   </FrontSide>
    //   <BackSide>
    //     <div className="backpage">
    //       <p>Author: {book.author}</p>
    //       <p>Country: {book.country}</p>
    //       <p>Language: {book.language}</p>
    //       <p>Pages: {book.pages}</p>
    //       <p>Year: {book.year}</p>
    //       <p>Price: {book.price}</p>
    //       <button className="add-to-cart btnb" onClick={handleAddToCart}>
    //         Add to Cart
    //       </button>
    //     </div>
    //   </BackSide>
    // </Flippy>
    <div className="book">
      <div className="backpage">
           <p>Author: {book.author}</p>
           <p>Country: {book.country}</p>
           <p>Language: {book.language}</p>
           <p>Pages: {book.pages}</p>
           <p>Year: {book.year}</p>
           <p>Price: {book.price}</p>
           <button className="add-to-cart btnb" onClick={handleAddToCart}>
             Add to Cart
           </button>
         </div>
      <div className="cover">
      <img src={book.imageLink} alt={book.title} style={{ width: "100%", marginTop: "0" }} />
        <h3 className="book-title">{book.title}</h3>
      </div>
    </div>
  );
};

export default BookCard;
