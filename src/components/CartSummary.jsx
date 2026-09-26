import React from 'react';

const CartSummary = ({ cart }) => {
  if (cart.length === 0) return null;

  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2);
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="cart-summary">
      <div className="cart-header">
        <span>🛒 Your Cart ({totalItems} items)</span>
        <span className="cart-total">${total}</span>
      </div>
      <div className="cart-items">
        {cart.map((item, idx) => (
          <div key={idx} className="cart-item">
            <span>{item.quantity}x {item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSummary;
