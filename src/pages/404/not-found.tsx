/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p404">
      <h2 className="p404__title">404</h2>
      <h3 className="p404_description">Page not found</h3>
      <Link className="p404__link" to="/">Home</Link>
    </div>
  );
}
