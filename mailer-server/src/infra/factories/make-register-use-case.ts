import { RegisterUseCase } from "../../domain/app/use-cases/register-use-case.ts";
import { BcryptHasher } from "../cryptography/bcrypt-hasher.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hasher = new BcryptHasher()
  return new RegisterUseCase(usersRepository, hasher)
}