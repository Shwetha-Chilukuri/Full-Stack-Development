import http from 'http'
const server = http.createServer((req,res)=>{
       if(req.url == "/home" && req.method == 'GET'){
              res.writeHead(200,{"Content-Type" :"text/html"})
              res.end("<h1>Welcome to Home page</h1>")
       }
       else if(req.url == "/about" && req.method == "GET"){
            res.writeHead(200,{"Content-Type":"text/plain"})
            res.end("This is About Us")
       }
       else if(req.url == "/contact" && req.method == "GET"){
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({"message" :"This is contact page"}))
      }
      else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("Page not found")
      }
})
server.listen(3000,()=>{
    console.log("Server is running")
})