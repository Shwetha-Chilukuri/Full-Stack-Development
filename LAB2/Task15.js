function createProfile({ name, age, interests }) {
    const [primaryInterest, secondaryInterest] = interests;
    
    return {
      name,
      age,
      primaryInterest,
      secondaryInterest
    };
  }
  const userprof = {
    name: 'John',
    age: 25,
    interests: ['Reading', 'Traveling', 'Dancing']
  };
  
  const prof = createProfile(userprof);
  console.log(prof);
  