// src/components/SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [client, setClient] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(client);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar proyecto por cliente..."
        value={client}
        onChange={(e) => setClient(e.target.value)}
        style={{ height: '38px' }}  // Ajustar la altura para coincidir con los botones
      />
      <button type="submit" className="btn btn-primary" style={{ height: '38px' }}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
