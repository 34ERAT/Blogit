import { Prisma, User } from "@prisma/client";
import DBconnection from "../util/DBconnection";
export async function updateUser({ id, ...update }: Prisma.UserUpdateInput) {
  return await DBconnection.user.update({
    where: { id: id as string },
    data: update,
    omit: { password: true },
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
