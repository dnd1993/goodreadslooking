import React from 'react';
import { Link } from 'react-router-dom';

const StarterPage = () => {
  return (
    <>
      <h1>Welcome to Good Reads</h1>
      <Link to="/auth">
        <button>Start</button>
      </Link>
    </>
  );
};

export default StarterPage;
