import { User } from "@prisma/client";
import DBconnection from "../util/DBconnection";
export async function updateUser({ id, ...update }: User) {
  return await DBconnection.user.update({
    where: { id },
    data: update,
  });
}
export async function createUser(user: User) {
  return await DBconnection.user.create({
    data: user,
  });
}
export async function getUser(id: string) {
  return await DBconnection.user.findUnique({ where: { id } });
}
