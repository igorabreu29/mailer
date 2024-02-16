import { app } from '@/app.ts'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

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