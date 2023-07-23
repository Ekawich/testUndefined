const express = require('express')
const productController = require('../controllers/productController')
const vertifyToken = require('../utils/jwt')

const router = express.Router()

// แสดงสินค้า
router.get('/allproduct', vertifyToken.veriftToken, productController.getProduct)
router.get('/:id', vertifyToken.veriftToken, productController.getProductById)
// ลบสินค้า
router.delete('/delete/:id', vertifyToken.veriftToken, productController.deleteProduct)
// สร้างสินค้า
router.post('/create', vertifyToken.veriftToken ,productController.createProduct)
// อัพเดทสินค้า
router.post('/update', vertifyToken.veriftToken ,productController.updateProduct)

module.exports = router