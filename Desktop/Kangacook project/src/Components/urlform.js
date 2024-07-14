// src/components/UrlForm.js
import React, { useState } from 'react';

const UrlForm = ({ onSubmit }) => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(longUrl);
    setLongUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default UrlForm;
