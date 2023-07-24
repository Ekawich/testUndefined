const jwt = require("../utils/jwt");
const products = require("../models/productModel");
const moment = require('../utils/moment')


// get currentDate
const getProduct = async (req, res) => {
    try {
        const data = await products.getAllProduct()

        if (data) {
            res.status(200).json({ status: 200, data })
        }
    } catch (err) {
        res.status(400).json({ message: "Internal server error" });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const productId = await products.getProductById(id)
        if (productId) {
            res.status(200).json({ status: 200, data: productId })
        }
    } catch (err) {
        res.status(400).json({ message: "Internal server error" });
    }
}

const createProduct = async (req, res) => {
    const { title, product_code, stock, create_by } = req.body;
    const currentDate = await moment.getDateTimeNow()


    try {
        const existingCode = await products.findProductCodeCreate(product_code);
        if (existingCode) {
            res.status(500).json({
                status: 500,
                message: "This code has been used!",
            });
            return
        }

        const newProduct = {
            title,
            product_code,
            stock,
            currentDate,
            create_by,
        };
        const productId = await products.createProduct(newProduct)
        res.status(200).json({ status: 200, message: 'Product has been created', productId })
    } catch (err) {
        console.error("Error create product", err);
        res.status(400).json({ message: "Internal server error" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productId = await products.deleteProduct(id);
        if (!productId) {
            res.status(400).json({
                status: 400,
                message: "Deleted not success",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Product has been deleted",
        });
    } catch (err) {
        console.error("Error", err);
        res.status(400).json({ message: "Internal server error" });
    }
};

const updateProduct = async (req, res) => {
    const { title, product_code, stock, updateId } = req.body;
    const currentDate = await moment.getDateTimeNow()

    try {
        const existingCode = await products.findProductCodeUpdate(product_code, updateId);
        if (existingCode) {
            res.status(500).json({
                status: 500,
                message: "This code has been used!",
            });
            return
        }

        const updateProduct = {
            title,
            product_code,
            stock,
            currentDate,
            updateId
        }
        const productId = await products.updateProduct(updateProduct)
        res.status(200).json({ status: 200, message: 'Product has been updated', productId })
    } catch (err) {
        res.status(400).json({ message: "Internal server error" });
    }

}

module.exports = {
    deleteProduct,
    createProduct,
    getProduct,
    getProductById,
    updateProduct
};
