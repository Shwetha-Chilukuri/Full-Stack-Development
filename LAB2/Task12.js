function createProfile({ name, email }) {
    return { name, email };
  }
  const userprof = { name: 'Hansika', age: 19, email: 'hansika973@example.com', address: 'Chandur' };
  const profile = createProfile(userprof);
  console.log(profile); 
  