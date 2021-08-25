import { Request, Response, NextFunction } from 'express'
import { get, controller, use, post, bodyValidator } from './decorators'

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made')
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.render('login')
  }
  
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body

    if (email === 'root@example.com' && password === '1234') {
      req.session = { loggedIn: true }
      return res.redirect('/')
    }
    return res.send('you must provide an email or password')
  }
  
  @get('/logout')
  getLogout(req: Request, res: Response) {
  req.session = undefined
  return res.redirect('/')
}
}