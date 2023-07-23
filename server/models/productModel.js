const db = require("../utils/db");

const products = {
    getAllProduct: () => {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT id, title, product_code, stock, create_date FROM products WHERE flag_delete != 1 ORDER BY id DESC";

            db.query(query, (err, results) => {
                resolve(results);
            });
        });
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, title, product_code, stock FROM products WHERE id = ?"

            db.query(query, [id], (err, results) => {
                resolve(results)
            })
        })
    },

    findProductCode: (code, id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT product_code FROM products WHERE product_code = ? AND id != ?";

            db.query(query, [code, id], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(results[0]);
            });
        });
    },

    createProduct: (product) => {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO products (title, product_code, stock, create_date, create_by) VALUES (?, ?, ?, ?, ?)";

            db.query(
                query,
                [
                    product.title,
                    product.product_code,
                    product.stock,
                    product.currentDate,
                    product.create_by,
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(results.insertId);
                }
            );
        });
    },

    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE products SET flag_delete = 1 WHERE id = ?';

            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(results);
            });
        });
    },

    updateProduct: (product) => {
        return new Promise((resolve, reject) => {
            const { title, product_code, stock, currentDate, updateId } = product
            const query = "UPDATE products SET title = ?, product_code = ?, stock = ?, update_date = ? WHERE id = ?"

            db.query(query,[title, product_code, stock, currentDate, updateId], (err,results) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(results)
            })
        })
    }
};

module.exports = products;
