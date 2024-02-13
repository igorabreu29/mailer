import { ForgotPasswordUseCase } from "../../domain/app/use-cases/forgot-password-use-case.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new ForgotPasswordUseCase(usersRepository)
}