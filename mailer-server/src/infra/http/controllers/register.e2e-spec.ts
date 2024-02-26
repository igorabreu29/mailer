import { app } from '@/app.ts'
import { describe, it, beforeAll, afterAll } from 'vitest'

import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it ('POST: /register', async () => {
    await request(app.server)
      .post('/register')
      .send({ 
        name: 'Igor Abreu',
        email: 'igor29nahan@gmail.com',
        password: 'node_node'
      })
      .expect(201)
  })
})