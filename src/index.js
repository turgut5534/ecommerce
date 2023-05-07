//Librarires
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000

//Directories
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates')
const uploadDirectory = path.join(__dirname, '../uploads')

// Routers
const authRouter = require('./routers/authRouter')
const mainRouter = require('./routers/mainRouter')
const sellerRouter = require('./routers/sellerRouter')

//Set parsers
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', viewsDirectory)

//Set up express
app.use(express.json())
app.use(express.static(publicDirectory))
app.use(express.static(uploadDirectory))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cookieParser())

//Set routers
app.use('/seller', sellerRouter)
app.use(authRouter)
app.use(mainRouter)


//Listen to the port
app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})