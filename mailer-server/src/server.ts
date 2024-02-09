import { randomUUID } from 'node:crypto'
import fastify from 'fastify'
import { z } from 'zod'
import { transporter } from './lib/transporter'
import axios from 'axios'

const app = fastify()

interface User {
  id: string
  name: string
  email: string
  password: string
}

const users: User[] = []

app.post('/register', (req, res) => {
  const registerBody = z.object({
    name: z.string().min(1, 'The name cannot be empty!'),
    email: z.string().email(),
    password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
  })

  const { email, name, password } = registerBody.parse(req.body)

  const user = {
    id: randomUUID(),
    email,
    name,
    password
  }

  users.push(user)

  return res.status(201).send({ user })
})

app.post('/auth', (req, res) => {
  const authenticateBody = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
  })

  const { email, password } = authenticateBody.parse(req.body)

  const userHaveSameEmail = users.find(user => user.email === email)

  if (!userHaveSameEmail) {
    return res.status(400).send({ message: 'User not found.' })
  }

  const isValidPassword = users.find(user => user.password === password)

  if (!isValidPassword) {
    return res.status(400).send({ message: 'User not found.' })
  }

  return res.status(201).send({ user: userHaveSameEmail })
})

app.post('/forget_password', async (req, res) => {
  const forgetPasswordBody = z.object({
    email: z.string().email()
  })

  const { email } = forgetPasswordBody.parse(req.body)
    
  const userExist = users.find(user => user.email === email)

  if (!userExist) {
    return res.status(400).send({ message: 'User not found.' })
  }

  await transporter.sendMail({
    from: 'System Login <system@logintest.com>',
    to: `<${email}>`,
    subject: 'Forget Password',
    html: `
      Hey, change your password clicking on button.
      
      <button>
        <a target="_blank" href=http://localhost:3333/restore-password?email=${email}>Restore your password.</a>
      </button>
    `
  })
})

app.get('/restore-password', async (req, res) => {
  const restorePasswordQuery = z.object({
    email: z.string().email()
  })

  const { email } = restorePasswordQuery.parse(req.query)

  await axios.patch(`http://localhost:3333/restore-password?email=${email}`, {
    password: 'john_node2'
  })

  return res.redirect(`http://localhost:3333/user?email=${email}`)
})

app.patch('/restore-password', (req, res) => {
  const restorePasswordQuery = z.object({
    email: z.string().email()
  })

  const restorePasswordBody = z.object({
    password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
  })

  const { email } = restorePasswordQuery.parse(req.query)
  const { password } = restorePasswordBody.parse(req.body)

  const userExist = users.findIndex(user => user.email === email)

  if (userExist < 0) {
    return res.status(400).send({ message: 'User not exist.' })
  }

  users[userExist].password = password

  return res.status(204).send()
}) 

app.get('/user', (req, res) => {
  const getUserQuery = z.object({
    email: z.string().email()
  })

  const { email } = getUserQuery.parse(req.query)

  const user = users.find(user => user.email === email)

  return res.send(user)
})

app.listen({ port: 3333 })
  .then(() => console.log('Server running on port 3333!'))