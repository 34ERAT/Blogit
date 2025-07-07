import { User } from "@prisma/client";
import DBconnection from "../util/DBconnection";
export async function update({ id, ...update }: User) {
  return await DBconnection.user.update({
    where: { id },
    data: update,
  });
}
export async function create(user: User) {
  return await DBconnection.user.create({
    data: user,
  });
}
export async function get(id: string) {
  return await DBconnection.user.findUnique({ where: { id } });
}
