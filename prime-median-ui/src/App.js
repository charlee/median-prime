import React, { useState } from 'react';
import { getMedianPrime } from './api';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [median, setMedian] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    let value = e.target.value;
    setError('');
    setMedian([]);

    setInputValue(value);
    if (value) {
      setLoading(true);
      getMedianPrime(value).then(res => {
        setLoading(false);
        setMedian(res.result);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
    }
  };

  return (
    <div className="App">
      <h1>Median of Prime numbers</h1>
      <div>
        <label>Enter number:</label>
        <input value={inputValue} onChange={handleChange} disabled={loading} />
      </div>
      <div>
        <label>Median: </label>
        <span>{loading ? 'Loading...' : median.length > 0 ? median.join(', ') : '(none)'}</span>
      </div>
      {error &&
      <div className="error">{error}</div>
      }
    </div>
  );
}

export default App;
