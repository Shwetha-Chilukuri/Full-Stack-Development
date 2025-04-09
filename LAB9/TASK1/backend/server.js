const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const MONGO_URL = 'mongodb://127.0.0.1:27017/fsd';
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('Error connecting to MongoDB:', error));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || '871b7342c1d6361b0813f3be72fcd3e7c1db4354239bf4caeeca42b89352ea138bbacb7461139f81227c636115631bb1b01913bd22575471bb2fcb23381bb11e8fc5c4458aad9e495f45e2ea111db0af68d08107f872f24c0ba57a6683e8e84d26a46a2e558c3dd6dcf6020bcdda1437f915547a5c69756a95926c055572f581ae018111489f509af4a9defdf16837ee91f554b6ae72caa0f70f0e6a70382c2468c02240e8bbffdf7c735cd1abc376af92a605a4dc4af08c0ef657814e2b007563ed536d1d888c95497a7839c8ca94308315c6ec0e1f8e4200c62f035787b868cf5625f1489f5b459bc4d48bac321a5ea5471c488ccf480802eac619ffc55c1c';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Task = mongoose.model('Task', taskSchema);

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};


// Register User
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});


// Create a Task
app.post('/api/tasks', authenticateJWT, async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    try {
        const task = new Task({
            title,
            description,
            status,
            dueDate,
            assignedTo: req.user.id
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating task', error: error.message });
    }
});

// Get All Tasks for Logged-in User
app.get('/api/tasks', authenticateJWT, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
});

// Get Specific Task by ID
app.get('/api/tasks/:id', authenticateJWT, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, assignedTo: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving task', error: error.message });
    }
});

app.put('/api/tasks/:id', authenticateJWT, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, assignedTo: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

app.delete('/api/tasks/:id', authenticateJWT, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, assignedTo: req.user.id });

        if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
