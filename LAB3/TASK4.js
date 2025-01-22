function fetchDataWithCallback(callback) {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        const data = { id: 1, name: "Sample Data" };
        callback(null, data); 
      } else {
        const errorMessage = "Failed to fetch data.";
        callback(errorMessage, null); 
      }
    }, 1000); 
  }
  fetchDataWithCallback((error, data) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Success:", data);
    }
  });
  for (let i = 0; i < 3; i++) {
    fetchDataWithCallback((error, data) => {
      if (error) {
        console.error("Attempt failed:", error);
      } else {
        console.log("Attempt succeeded:", data);
      }
    });
  }
  