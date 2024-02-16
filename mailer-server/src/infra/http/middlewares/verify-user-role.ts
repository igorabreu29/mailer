import { Role } from "@/domain/enterprise/user.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: Role) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user
    console.log('user', req.user)
    console.log('role', role)

    if (role !== roleToVerify) {
      return res.status(401).send({ message: 'Unauthorized.' })
    }
  }
}