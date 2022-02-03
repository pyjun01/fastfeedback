const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'get',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  });

  return res.json();
};

export default fetcher;
