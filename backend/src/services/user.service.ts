import { Prisma } from "@prisma/client";
import DBconnection from "../util/DBconnection";
export async function updateUser({ id, ...update }: Prisma.UserUpdateInput) {
  return await DBconnection.user.update({
    where: { id: id as string },
    data: update,
    omit: { password: true, id: true },
  });
}
export async function createUser(user: Prisma.UserCreateInput) {
  return await DBconnection.user.create({
    data: user,
  });
}
export async function getUser(eMail_UserName: string) {
  return await DBconnection.user.findFirst({
    where: { OR: [{ email: eMail_UserName }, { username: eMail_UserName }] },
  });
}
export async function getUserById(id: string) {
  return await DBconnection.user.findFirst({
    where: { id: id },
    omit: { password: true, id: true },
  });
}
