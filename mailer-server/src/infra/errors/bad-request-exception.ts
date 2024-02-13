export class BadRequestException extends Error {
  public statusCode: number = 0
  public type: string = ''
  public message: string = ''

  constructor(message: string) {
    super()
    this.statusCode = 400
    this.type = 'BadRequestException'
    this.message = message
  }
}