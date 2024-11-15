import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Results:</h2>
      <ul>
        {results.length > 0 ? (
          results.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email} - {user.password}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

 
export default App;

