function delayedMessage(msg, dly, callback) {
    setTimeout(() => {
        console.log(msg);
        callback();
    }, dly);
}
delayedMessage("Hello, Greetings  to all", 4000, () => {
    console.log("function completed");
});
