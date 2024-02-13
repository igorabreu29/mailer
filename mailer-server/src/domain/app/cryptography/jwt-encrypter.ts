export interface JWTEncrypter {
  encrypt: (payload: Record<string, unknown>) => string
}