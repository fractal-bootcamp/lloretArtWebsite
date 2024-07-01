const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;

// Dummy data
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
];

// Middleware to log request details
app.use(cors());
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Route to handle GET requests to the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to handle GET requests to /about
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Route to handle GET requests to /users
app.get('/users', (req, res) => {
    res.json(users);

});



// Route to handle GET requests to /users/:id
app.get('/users/:name', (req, res) => {
    const userName = req.params.name; // Get the user ID from the URL and parse it to an integer
    const user = users.find(u => u.name === userName); // Find the user by ID
    if (user) {
        res.json({ name: user.name, age: user.age, name: user.name, name: user.name + ("listillo") }); // Return only the id and name
    } else {
        res.status(404).send('User not found');
    }
});

// Route to handle POST requests to /users
app.post('/users', express.json(), (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
