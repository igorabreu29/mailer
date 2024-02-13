import { app } from "../../app.ts";
import { JWTEncrypter } from "../../domain/app/cryptography/jwt-encrypter.ts";

export class Encrypter implements JWTEncrypter {
  encrypt(payload: Record<string, unknown>) {
    const token = app.jwt.sign({
      name: payload.name,
      email: payload.email,
    }, {
      sub: payload.sub as string,
      expiresIn: '10m'
    })

    return token
  }
}