import React, { useState } from 'react';
import './App.css';
import { getMedianPrime } from './api';

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
        Enter number:
        <input value={inputValue} onChange={handleChange} />
      </div>
      <div>
        Median: {median.join(', ')}
      </div>
    </div>
  );
}

export default App;
