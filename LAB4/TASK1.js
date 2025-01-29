
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    if (!res.ok) {
      throw new Error('Network error');
    }
    return res.json(); 
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Fetch failed', error);
  });
