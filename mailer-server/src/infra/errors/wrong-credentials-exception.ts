export class WrongCredentialsException extends Error {
  public statusCode: number = 0
  public type: string = ''
  public message: string = ''

  constructor(message: string) {
    super()
    this.statusCode = 400
    this.type = 'WrongCredentialsException'
    this.message = message
  }
}