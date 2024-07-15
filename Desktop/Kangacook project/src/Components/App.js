import React, { useState } from 'react';
import UrlForm from './urlForm';  // Adjusted casing
import UrlList from './urlList';

const App = () => {
  const [urls, setUrls] = useState([]);

  const addUrl = (longUrl) => {
    fetch('http://localhost:8000/api/urlshortener/urlshortener', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ long_url: longUrl }),
  })
  
      .then((response) => response.json())
      .then((data) => {
        setUrls([...urls, data]);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Slim down big Urls</h1>
      <UrlForm onSubmit={addUrl} />
      <UrlList urls={urls} />
    </div>
  );
};

export default App;