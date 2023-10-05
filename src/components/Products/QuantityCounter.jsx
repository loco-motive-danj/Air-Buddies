import React, { useState } from 'react';

function QuantityCounter() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <button className="qtyButton" onClick={handleDecrement}>-</button>
      <span className='qtyNumButton'>{quantity}</span>
      <button className="qtyButton" onClick={handleIncrement}>+</button>
    </div>
  );
}

export default QuantityCounter;
