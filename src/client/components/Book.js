import React from 'react';

function Book({ book, userId, key, hideBtn = false }) {
  const addToCart = () => {
    fetch(`http://localhost:8085/cart/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: book._id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  return (
    <div className="book-card" key={key}>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.price}</p>
      {!hideBtn && <button className="form-submit" onClick={addToCart}>Add to Cart</button>}
    </div>
  );
}

export default Book;
