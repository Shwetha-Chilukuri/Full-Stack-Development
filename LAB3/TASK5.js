function authenticateUser(callback){
    setTimeout(()=>{
        console.log("User is successfully authenticated")
        callback()
    },500)
}
function paymentVerification(callback){
    setTimeout(()=>{
        console.log("Payment is successfully verified")
        callback()
    },1000)
}
function paymentSuccess(callback){
    setTimeout(()=>{
        console.log("Payment is a success")
        callback()
    },100)
}
authenticateUser(()=>{
    paymentVerification(()=>{
        paymentSuccess(()=>{
            console.log("Your account is updated")
        })
    })
})
