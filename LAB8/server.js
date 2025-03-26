const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 3000
const app = express()
app.use(bodyParser.json())
const url = 'mongodb://localhost:27017'
mongoose.connect(url)
.then(()=>console.log('Connected to mongodb'))
.catch((e)=>console.log("Error in connection",e))
const User = mongoose.model('User',new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Date}
}))
app.get('/',(req,res)=>res.send('Welcome to User management api'))
app.get('/api/users',async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    } 
    catch(error){
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
})
app.get('/api/users/:id',async (req,res)=>{
    const userid = req.params.id;
    try{
        const user = await User.findById(userid);
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
})
app.post('/api/users/register',async (req,res)=>{
       const {name,email,password} = req.body
       if(!name || !email||!password)
          res.status(400).send("All parameters are required");
       try{
          const createdAt = new Date()
          const user = new User({name,email,password,createdAt})
          await user.save()
          res.status(201).json({ message: 'User created successfully', user: user });
        } catch (error) {
         res.status(400).json({ message: 'Error creating user', error: error.message });
        }
})
app.put('/api/users/:id',async (req,res)=>{
    const {name,email,password} = req.body
    const userid = req.params.id;
    try{
        const user = await User.findById(userid);
        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password
        await user.save()
        res.status(201).json({ message: 'User updated successfully', user: user });
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    } 
    // const updateduser = req.body
    // const userid = req.params.id;
    // try {
    //     const updatedUser = await User.findByIdAndUpdate(userid, updateduser, { new: true });
    //     if (!updatedUser) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }
    //     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    // } catch (error) {
    //     res.status(500).json({ message: 'Error updating user', error: error.message });
    // }
})
app.delete('/api/users/:id',async (req,res)=>{
    const userid = req.params.id;
    try{
        const deleteuser = await User.findByIdAndDelete(userid)
        if (!deleteduser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
          res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
