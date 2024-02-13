import { RegisterUseCase } from "../../domain/app/use-cases/register-use-case.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}