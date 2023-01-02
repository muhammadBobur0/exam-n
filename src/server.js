import express from 'express'
import { PORT } from './config.js'
import Posts from './routes/posts.router.js'
import admin from './routes/admin.router.js'
import router from './swagger.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import category from './routes/category.router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(category)
app.use(admin)
app.use(Posts)
app.use(router)
app.listen(PORT, ()=>console.log('http://localhost:' + PORT))