// CartIcon.tsx
import React from 'react';

interface CartIconProps {
  count: number;
  onClick: () => void; // Trigger to open the modal
}

const CartIcon: React.FC<CartIconProps> = ({ count, onClick }) => {
  return (
    <div className="fixed top-4 right-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-center bg-indigo-500 text-white p-2 rounded-lg shadow-lg">
        <span>🛒</span>
        <span className="ml-2">{count}</span>
      </div>
    </div>
  );
};

export default CartIcon;
