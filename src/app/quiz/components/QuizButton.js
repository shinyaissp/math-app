import React from 'react';

export default function QuizButton({ color = 'none', border = 'none', children, onClick }) {
  const styles = {
    backgroundColor: color,
    color: '#272727ff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    width: '10rem',
    height: '3rem',
    borderRadius: '0.375rem',
    border: border,
    cursor: 'pointer'
  };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
}
