function mergeUserData(...objects) {
    return Object.assign({}, ...objects);
  }
  const userDetails = { name: 'CVR', age: 25 };
  const userAddress = { address: 'Mangalpally', city: 'Hyderabad' };
  const userPreferences = { theme: 'Engineering Edu', language: 'EN' };
  
  const mergedUserData = mergeUserData(userDetails, userAddress, userPreferences);
  console.log(mergedUserData);
  