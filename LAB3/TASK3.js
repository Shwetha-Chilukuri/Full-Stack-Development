function delayedMessage(message, delay, callback) {
    setTimeout(() => {
        console.log(message);
        callback();
    }, delay);
}
delayedMessage("Hello, World!", 2000, () => {
    console.log("Message printed!");
});
