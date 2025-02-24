const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all loans
router.get('/loans', async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM loans');
    res.status(200).json(results);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a new loan
router.post('/', async (req, res) => {
  const { book_id, user_id, loan_date, return_date } = req.body;
  if (!book_id || !user_id || !loan_date) {
    return res.status(400).json({ error: 'book_id, user_id, and loan_date are required' });
  }

  try {
    const [results] = await db.execute(
      'INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES (?, ?, ?, ?)',
      [book_id, user_id, loan_date, return_date]
    );
    res.status(201).json({ id: results.insertId, book_id, user_id, loan_date, return_date });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update a loan
router.put('/:id', async (req, res) => {
  const { book_id, user_id, loan_date, return_date } = req.body;
  const { id } = req.params;
  if (!book_id || !user_id || !loan_date) {
    return res.status(400).json({ error: 'book_id, user_id, and loan_date are required' });
  }

  try {
    await db.execute(
      'UPDATE loans SET book_id = ?, user_id = ?, loan_date = ?, return_date = ? WHERE id = ?',
      [book_id, user_id, loan_date, return_date, id]
    );
    res.status(200).json({ message: 'Loan Updated', id, book_id, user_id, loan_date, return_date });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a loan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM loans WHERE id = ?', [id]);
    res.status(200).json({ message: 'Loan Deleted', id });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
