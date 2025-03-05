import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Shwetha', age: 19, city: 'Hyderabad' },
    { id: 2, name: 'Hansika', age: 19, city: 'Pune' }
];

app.post('/users', (req, res) => {
    const { name, age, city } = req.body;

    if (!name || !age || !city) {
        return res.status(400).json({ error: 'Name, age, and city are required' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age,
        city
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { name, age, city } = req.body;
    if (name) user.name = name;
    if (age) user.age = age;
    if (city) user.city = city;

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: 'User deleted', user: deletedUser[0] });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
