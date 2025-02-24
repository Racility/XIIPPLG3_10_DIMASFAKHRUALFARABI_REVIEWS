const express = require("express");
const router = express.Router();

const reviewcontroller = require('../controllers/review')

// GET: Ambil semua ulasan
router.get("/reviews", reviewcontroller.getReviews);

// GET: Ambil ulasan berdasarkan ID
router.get("/review/:id", reviewcontroller.getReviewById);

// POST: Tambahkan ulasan baru
router.post("/review", reviewcontroller.createReview);

// PUT: Update ulasan berdasarkan ID
router.put("/review/:id", reviewcontroller.updateReview);

// DELETE: Hapus ulasan berdasarkan ID
router.delete("/review/:id", reviewcontroller.deleteReview);

module.exports = router;
