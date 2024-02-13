import { describe, expect, it } from 'vitest'
import { Either, left, right } from './either.ts'

function doSomething(value: boolean): Either<string, Record<string, string>> {
  if (!value) {
    return left('Error')
  }

  return right({ name: 'John' })
}

describe('Either pattern', () => {
  it('should be able go to left direction', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toEqual('Error')
  })

  it('should be able go to right direction', () => {
    const result = doSomething(true)

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      name: 'John'
    })
  })
})