import React from 'react';
import './FilledButton.css';

const FilledButton = ({
  children,
  color = 'blue',
  onClick,
  size = 'md',
}) => {
  return (
    <button
      className={`button-container ${color} ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilledButton;