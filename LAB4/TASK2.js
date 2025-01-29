async function fetchAPI(){
    try{
     let raw = await fetch("https://jsonplaceholder.typicode.com/users");
     let data = await raw.json();
     console.log(data);
    }
    catch(err){
        console.error(err.message)
    }
}
fetchAPI();                                                                        