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
        placeholder="Enter Full URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <button type="submit">Slim Down</button>
    </form>
  );
};

export default UrlForm;
