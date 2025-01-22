function fetchDataWithCallback(callback) {
    setTimeout(() => {
      const flag = Math.random() > 0.5;
      if (flag) {
        const result = { id: 1, name: "Hansika Chilukuri" };
        callback(null, result); 
      } else {
        callback("Failed to fetch data.", null); 
      }
    }, 2000); 
}
fetchDataWithCallback((err, data) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Success:", data);
    }
});

  