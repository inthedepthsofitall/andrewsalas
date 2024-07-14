import React from 'react';

const UrlList = ({ urls }) => (
  <ul>
    {urls.map((url, index) => (
      <li key={index}>
        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
          {url.shortUrl}
        </a> - {url.longUrl}
      </li>
    ))}
  </ul>
);

export default UrlList;
