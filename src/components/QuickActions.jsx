import React from 'react';

const QuickActions = ({ onAction }) => {
  return (
    <div className="quick-actions">
      <button onClick={() => onAction('Show menu')}>View Menu</button>
      <button onClick={() => onAction('Checkout')}>Checkout</button>
      <button onClick={() => onAction('Clear cart')} className="danger">Clear Cart</button>
    </div>
  );
};

export default QuickActions;
