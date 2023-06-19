import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../service/api';
import BookCard from '../components/BookCard';
import '../assets/books.css';
import Checklist from '../components/Checklist';

const Listings = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    country: [],
    language: [],
    pages: [],
    price: [],
  });
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedOptions]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [books, searchTerm]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const applyFilters = () => {
    const filtered = books.filter((book) => {
      const { country, language, pages, price } = selectedOptions;
      const isInCountry =
        country.length === 0 || country.includes(book.country);
      const isInLanguage =
        language.length === 0 || language.includes(book.language);
      const isInPages =
        pages.length === 0 ||
        pages.some((option) => isPageInRange(book.pages, option));
      const isInPrice =
        price.length === 0 ||
        price.some((option) => isPriceInRange(book.price, option));
      return isInCountry && isInLanguage && isInPages && isInPrice;
    });

    setFilteredBooks(filtered);
  };

  const isPageInRange = (bookPages, option) => {
    if (option === '500<') {
      return bookPages >= 500;
    }

    const [min, max] = option.split('-').map((val) => parseInt(val, 10));
    return bookPages >= min && bookPages <= max;
  };

  const isPriceInRange = (bookPrice, option) => {
    if (option === '300<') {
      return bookPrice >= 300;
    }

    const [min, max] = option.split('-').map((val) => parseInt(val, 10));
    return bookPrice >= min && bookPrice <= max;
  };
  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
  };
  
  const hideChecklist = () => {
    setShowChecklist(false);
  };
  return (
    <>
   
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search books"
        className='input-search'
      />
      <div className="books">
        {windowWidth > 720 || showChecklist ? (
          <div className="filter">
            <Checklist
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        ) : (
          <button className="filters-button" onClick={toggleChecklist}>
            Filters
          </button>
        )}
        {showChecklist && (
          <>
          <button className="filters-button" onClick={toggleChecklist}>
          Hide filters
        </button>
          <div className="checklist-overlay" onClick={hideChecklist} />
          </>
        )}
        <div className="listing-container">
          <div className="card-container">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
};



export default Listings;
