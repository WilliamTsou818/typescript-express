import { Router, Request, Response, NextFunction } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Not permitted')
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
       <label>Password</label>
       <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body
  
  if (email && password && email === 'root@example.com' && password === '1234') {
    req.session = { loggedIn: true }
    return res.redirect('/')
  }
  return res.send('you must provide an email or password')
})

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    return res.send(`
      <div>
        <div>You are logged in!</div>
        <a href="/logout">Logout</a>
      </div>
    `)
  }

  return res.send(`
    <div>
      <div>You are not logged in!</div>
      <a href="/login">Login</a>
    </div>
  `)
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  return res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user!')
})

export { router }
