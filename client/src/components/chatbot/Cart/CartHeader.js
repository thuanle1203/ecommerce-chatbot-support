import './cart.css';
import React from 'react';

const CartHeader = ({itemCount}) => {
  return (
    <header className="container">
      <h1>Shopping Cart</h1>

      <span className="count">{itemCount} items in the bag</span>
    </header>
  );
}

export default CartHeader;