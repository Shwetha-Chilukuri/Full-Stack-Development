import EventEmitter from 'events';
const eventEm = new EventEmitter();
eventEm.once('Event', () => {
  console.log('This listener will only respond once!');
});
eventEm.emit('Event'); 
eventEm.emit('Event'); 
eventEm.emit('Event'); 
