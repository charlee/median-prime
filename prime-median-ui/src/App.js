import React, { useState } from 'react';
import { getMedianPrime } from './api';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [median, setMedian] = useState([]);
  const [error, setError] = useState('');

  const handleChange = e => {
    let value = e.target.value;
    setError('');
    setMedian([]);

    // On my laptop n=100000000 is almost the upper limit that
    // single node server can handle - it takes about 19s.
    if (parseInt(value, 10) > 99999999) {
      value = 99999999;
    }

    setInputValue(value);
    if (value) {
      getMedianPrime(value).then(res => {
        setMedian(res.result);
      })
      .catch(err => {
        setError(err);
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
