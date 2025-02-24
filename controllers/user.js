const User = require('../models/user');

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers(); // Gantilah dengan metode yang ada di model User
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create User
const createUser = async (req, res) => {
    try {
        const { username, password, name, email, phone } = req.body;
        const userId = await User.createUser({ username, password, name, email, phone });
        res.status(201).json({ message: "User created", id: userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, createUser };
