import { Request, Response, NextFunction } from 'express'
import { get, controller, use, post, bodyValidator } from './decorators'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Not permitted')
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      return res.send(`
        <div>
          <div>You are logged in!</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `)
    }

    return res.redirect('/auth/login')
  }
  
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
  res.send('Welcome to protected route, logged in user!')
}
}