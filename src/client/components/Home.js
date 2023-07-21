import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';

import '../styles/styles.css'

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8085/book/');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBooks();
  }, [books]);

  return (
    <div className="container">
      <h2 className="title">Bookstore</h2>
      <Link className="link alt-btn" to="/cart">Go to Cart</Link>
      <div className="book-list">
        {books.map((book) => (
          <Book userId={localStorage.getItem('userId')} key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
