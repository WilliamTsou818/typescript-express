import { Request, Response, NextFunction } from 'express'
import { get, controller, use, post, bodyValidator } from './decorators'

@controller('/auth')
class LoginController {
  @get('/login')
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
  
  @get('/register')
  getRegister(req: Request, res: Response) {
    res.render('register')
  }
  
  @get('/logout')
  getLogout(req: Request, res: Response) {
  req.session = undefined
  return res.redirect('/')
}
}