const dbPool = require("../config/db");

class Book {
    // Mengambil semua data buku dengan kategori
    static async getindex() {
        const SQLQuery = `
            SELECT book.*, kategori.nama AS category_name 
            FROM book 
            JOIN kategori ON book.category_id = kategori.id
        `;
        return dbPool.execute(SQLQuery);
    }

    // Mengambil data buku berdasarkan ID dengan kategori
    static async getByid(id) {
        const SQLQuery = `
            SELECT book.*, kategori.nama AS category_name 
            FROM book 
            JOIN kategori ON book.category_id = kategori.id 
            WHERE book.id = ?
        `;
        return dbPool.execute(SQLQuery, [id]);
    }

    // Mengecek apakah kategori ada
    static async isCategoryExists(category_id) {
        const SQLQuery = "SELECT COUNT(*) AS count FROM kategori WHERE id = ?";
        const [rows] = await dbPool.execute(SQLQuery, [category_id]);
        return rows[0].count > 0;
    }

    // Menambahkan buku baru (dengan validasi kategori)
    static async createnew(body) {
        const categoryExists = await this.isCategoryExists(body.category_id);
        if (!categoryExists) {
            throw new Error("Kategori tidak ditemukan");
        }

        const SQLQuery = `
            INSERT INTO book (title, writer, publisher, year, user_id, category_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return dbPool.execute(SQLQuery, [
            body.title,
            body.writer,
            body.publisher,
            body.year,
            body.user_id,
            body.category_id
        ]);
    }

    // Mengupdate data buku (dengan validasi kategori)
    static async updateBook(body, id) {
        const categoryExists = await this.isCategoryExists(body.category_id);
        if (!categoryExists) {
            throw new Error("Kategori tidak ditemukan");
        }

        const SQLQuery = `
            UPDATE book 
            SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? 
            WHERE id = ?
        `;
        return dbPool.execute(SQLQuery, [
            body.title,
            body.writer,
            body.publisher,
            body.year,
            body.user_id,
            body.category_id,
            id
        ]);
    }

    // Menghapus data buku
    static async deleteBook(id) {
        const SQLQuery = "DELETE FROM book WHERE id = ?";
        return dbPool.execute(SQLQuery, [id]);
    }
}

module.exports = Book;
