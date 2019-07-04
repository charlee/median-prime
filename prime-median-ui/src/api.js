export const get = (path, params = {}) => {
  const qs = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  let url = path;
  if (qs) {
    url += '?' + qs;
  }

  return fetch(url).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.json().then(err => {
        throw err;
      });
    }
  });
};


export const getMedianPrime = n => get('/api/medianprime', { n });