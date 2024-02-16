import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { register } from './infra/http/controllers/register.ts'
import { authenticate } from './infra/http/controllers/authenticate.ts'
import { forgotPassword } from './infra/http/controllers/forgot-password.ts'
import { restorePassword } from './infra/http/controllers/restore-password.ts'
import { profile } from './infra/http/controllers/profile.ts'
import { notesRoute } from './infra/http/controllers/notes/routes.ts'

import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const app = fastify()
app.register(cors, {
  origin: true
})
app.register(jwt, {
  secret: 'impossible-discover-that-key'
})

//Routes
app.register(register)
app.register(authenticate)
app.register(forgotPassword)
app.register(restorePassword)
app.register(profile)
app.register(notesRoute)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ 
        message: 'Validation Error',
        errors: fromZodError(err)
       })
  }

  return res.status(500).send({ message: 'Internal Server Error.' })
})