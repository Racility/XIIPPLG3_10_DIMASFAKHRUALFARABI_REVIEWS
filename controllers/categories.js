const Category = require("../models/categories");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCategory = async (req, res) => {
    const { nama } = req.body;
    if (!nama) {
        return res.status(400).json({ error: "Nama is required" });
    }

    try {
        const id = await Category.create(nama);
        res.status(201).json({ message: "Category added", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCategory = async (req, res) => {
    const { nama } = req.body;
    const { id } = req.params;

    if (!nama) {
        return res.status(400).json({ error: "Nama is required" });
    }

    try {
        const affectedRows = await Category.update(id, nama);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category updated", id, nama });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await Category.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
