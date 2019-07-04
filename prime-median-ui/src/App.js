import React, { useState } from 'react';
import { getMedianPrime } from './api';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [median, setMedian] = useState([]);

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      getMedianPrime(value).then(res => {
        setMedian(res.result);
      });
    }
  };

  return (
    <div className="App">
      <h1>Median of Prime numbers</h1>
      <div>
        <label>Enter number:</label>
        <input value={inputValue} onChange={handleChange} />
      </div>
      <div>
        <label>Median: </label>
        {median.length > 0 ? median.join(', ') : '(none)'}
      </div>
    </div>
  );
}

export default App;
