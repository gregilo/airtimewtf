import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function InteriorLayout({ children }) {
  return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          {children}
        </div>
      </React.Fragment>
    );
}
