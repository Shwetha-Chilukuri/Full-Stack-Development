const EventEmitter = require('events');
class EventManagement extends EventEmitter {
    constructor() {
        super();
        this.startTime = null;
        this.endTime = null;
    }
    startEvent() {
        this.startTime = new Date();
        console.log(`Event started at: ${this.startTime.toLocaleString()}`);
        this.emit('start');
    }
    inProgressEvent() {
        console.log("Event is in progress.");
        this.emit('in-progress');
    }
    completeEvent() {
        this.endTime = new Date();
        console.log(`Event completed at: ${this.endTime.toLocaleString()}`);
        this.emit('completed');
    }
}

module.exports = EventManagement;
