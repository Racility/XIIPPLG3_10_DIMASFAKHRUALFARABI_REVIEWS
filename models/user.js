const dbPool = require("../config/db");

class User {
    // Mengambil semua data user
    static async getAllUsers() {
        const [rows] = await dbPool.execute("SELECT * FROM users");
        return rows;
    }

    // Mengambil user berdasarkan ID
    static async getUserById(id) {
        const [rows] = await dbPool.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0]; // Mengembalikan satu data user
    }

    // Mengambil user berdasarkan username (digunakan untuk login)
    static async findByUsername(username) {
        const [rows] = await dbPool.execute("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0]; // Mengembalikan satu user jika ditemukan
    }

    // Membuat user baru
    static async createUser({ username, password, name, email, phone }) {
        const [result] = await dbPool.execute(
            "INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)",
            [username, password, name, email, phone]
        );
        return result.insertId; // Mengembalikan ID user yang baru dibuat
    }

    // Mengupdate user berdasarkan ID
    static async updateUser(id, { username, password, name, email, phone }) {
        const [result] = await dbPool.execute(
            "UPDATE users SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ?",
            [username, password, name, email, phone, id]
        );
        return result.affectedRows; // Mengembalikan jumlah baris yang diubah
    }

    // Menghapus user berdasarkan ID
    static async deleteUser(id) {
        const [result] = await dbPool.execute("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows; // Mengembalikan jumlah baris yang dihapus
    }
}

module.exports = User;
