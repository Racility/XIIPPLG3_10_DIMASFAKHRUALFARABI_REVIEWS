const db = require("../config/db");

class Category {
    static async getAll() {
        const [results] = await db.query("SELECT * FROM kategori");
        return results;
    }

    static async create(nama) {
        const [result] = await db.query("INSERT INTO kategori (nama) VALUES (?)", [nama]);
        return result.insertId;
    }

    static async update(id, nama) {
        const [result] = await db.query("UPDATE kategori SET nama = ? WHERE id = ?", [nama, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM kategori WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = Category;
