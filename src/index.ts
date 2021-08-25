import express, { Request, Response } from 'express'
import cookieSession from 'cookie-session'
import handlebars from 'express-handlebars'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootController'

// set express server
const app = express()

// set view engine
app.engine('hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['typescript'] }))
app.use(AppRouter.getInstance())

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})