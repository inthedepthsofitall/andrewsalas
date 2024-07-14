import React, { useState } from 'react';
import UrlForm from './components/urlform';
import UrlList from './components/urllist';


const App = () => {
  const [urls, setUrls] = useState([]);

  const addUrl = (longUrl) => {
    fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ long_url: longUrl })
    })
      .then(response => response.json())
      .then(data => setUrls([...urls, data]))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <UrlForm onSubmit={addUrl} />
      <UrlList urls={urls} />
    </div>
  );
};

export default App;
