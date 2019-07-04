import React, { useState } from 'react';
import { getMedianPrime } from './api';
import './App.css';
import { Z_STREAM_ERROR } from 'zlib';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [median, setMedian] = useState([]);
  const [error, setError] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setError('');
    setMedian([]);
    setInputValue(value);
    if (value) {
      getMedianPrime(value).then(res => {
        setMedian(res.result);
      })
      .catch(err => {
        setError(err.error);
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
        <span>{median.length > 0 ? median.join(', ') : '(none)'}</span>
      </div>
      {error &&
      <div className="error">{error}</div>
      }
    </div>
  );
}

export default App;
