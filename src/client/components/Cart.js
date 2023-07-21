import React, { useState, useEffect } from 'react';
import Book from './Book';

const Cart = () => { 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8085/cart/${localStorage.getItem('userId')}`)
      .then(response => response.json())
      .then(data => {
        setCart(data)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((book, index) => (
        <Book userId={localStorage.getItem('userId')} book={book} key={index} hideBtn={true}/>
      ))}
    </div>
  );
};

export default Cart;