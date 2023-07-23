const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

const port = 8000
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user
app.use('/api/users', userRouter)

// product
app.use('/api/product', productRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})