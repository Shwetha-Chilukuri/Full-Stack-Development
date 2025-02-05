import EventEmitter from 'events';
const eventEm = new EventEmitter();
eventEm.on('userDetails', (name, age) => {
  console.log(`Hello, ${name}! You are ${age} years old.`);
});
eventEm.emit('userDetails', 'Hansika', 19);  
eventEm.emit('userDetails', 'Deepika', 17);    
