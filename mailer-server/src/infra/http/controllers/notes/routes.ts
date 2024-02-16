import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { createNote } from "./create-note.ts";
import { verifyUserRole } from "../../middlewares/verify-user-role.ts";
import { fetchNotes } from "./fetch-notes.ts";
import { deleteNote } from "./delete-note.ts";

export async function notesRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/notes', fetchNotes)
  app.post('/notes', { onRequest: [verifyUserRole("admin")] }, createNote)
  app.delete('/notes', { onRequest: [verifyUserRole('admin')] } ,deleteNote)
}