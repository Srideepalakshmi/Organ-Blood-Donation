import React, { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('blood');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search/public/${category}/${type}`
      );
      setResults(res.data);
    } catch (err) {
      alert('Error fetching donors');
    }
  };

  return (
    <section className="search">
      <h2>Urgent Donor Search</h2>
      <div>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="blood">Blood</option>
          <option value="organ">Organ</option>
        </select>
        <input
          type="text"
          placeholder="Enter blood type (O-) or organ (Kidney)"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {results.map((d, i) => (
          <div key={i} className="donor-card">
            <p><b>{d.name}</b> ({d.age} yrs)</p>
            <p>Type: {d.type}</p>
            <p>Location: {d.location}</p>
            <p>Contact: {d.contact}</p>
            <p>Hospital: {d.hospital}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchBar;
