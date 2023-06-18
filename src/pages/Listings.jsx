import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../service/api';
import BookCard from '../components/BookCard'
import '../assets/books.css'

const Listings = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data.books);
      console.log(data)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search books"
      />
      <div className="card-container">
        {searchTerm === ''
          ? books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          : filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default Listings;
