const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/todo-app').then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

const JWT_SECRET = '871b7342c1d6361b0813f3be72fcd3e7c1db4354239bf4caeeca42b89352ea138bbacb7461139f81227c636115631bb1b01913bd22575471bb2fcb23381bb11e8fc5c4458aad9e495f45e2ea111db0af68d08107f872f24c0ba57a6683e8e84d26a46a2e558c3dd6dcf6020bcdda1437f915547a5c69756a95926c055572f581ae018111489f509af4a9defdf16837ee91f554b6ae72caa0f70f0e6a70382c2468c02240e8bbffdf7c735cd1abc376af92a605a4dc4af08c0ef657814e2b007563ed536d1d888c95497a7839c8ca94308315c6ec0e1f8e4200c62f035787b868cf5625f1489f5b459bc4d48bac321a5ea5471c488ccf480802eac619ffc55c1c';

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
}

// Routes
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists' });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.get('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ priority: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


app.post('/api/tasks', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    userId: req.userId,
  });
  res.status(201).json(task);
});

app.put('/api/tasks/:id', authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!result) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
