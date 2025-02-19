const EventManagement = require('./EventManagement');
const eventManager = new EventManagement();

eventManager.on('start', () => {
    console.log('Event has started!');
});

eventManager.on('in-progress', () => {
    console.log('Event is currently in progress!');
});

eventManager.on('completed', () => {
    console.log('Event has been completed!');
});

eventManager.startEvent();
setTimeout(() => {
    eventManager.inProgressEvent();
    setTimeout(() => {
        eventManager.completeEvent();
    }, 2000); 
}, 2000); 
