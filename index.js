const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

const categoriesRoutes = require('./routes/categories.js')
app.use('/api/categories', categoriesRoutes)

const contactRoutes = require('./routes/contact')
app.use('/api/contact', contactRoutes)

const commentRoutes = require('./routes/comment')
app.use('/api/comment', commentRoutes)

const favoriteRoutes = require('./routes/favorite')
app.use('/api/favorite', favoriteRoutes)

const likeRoutes = require('./routes/like.js')
app.use('/api/like', likeRoutes)

const postRoutes = require('./routes/post')
app.use('/api/post', postRoutes)

const userRoutes = require('./routes/user')
app.use('/api/user', userRoutes)

app.listen(port,() => {
    console.log(`http://localhost:${port}`)
})