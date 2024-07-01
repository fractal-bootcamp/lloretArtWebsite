import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', age: '' });

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:3030/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send new user to the backend
    axios.post('http://localhost:3030/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', age: '' });
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.age} years old</li>
        ))}
      </ul>

      <h2>Add a New User</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={newUser.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
