const http = require('http')
const users = [
    {
        name : "Shwetha",
        age : 19,
        city : "Hyderabad"
    },
    {
        name : "Hansika",
        age : 19,
        city : "Pune"   
    }
]
const server = http.createServer((req,res)=>{
        if(req.url == "/api/data" && req.method == 'GET'){
             res.writeHead(200,{"Content-Type" : "application/json"})
             res.end(JSON.stringify(users))
        }
        else{
            res.statusCode = 404
            res.end("Page not found")
        }
})
server.listen(3000,()=>{
    console.log("Server is running at port 3000")
})