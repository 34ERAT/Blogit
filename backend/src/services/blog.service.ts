import { Blog } from "@prisma/client";
import DBconnection from "../util/DBconnection";
export async function updateBlog({ userId, id, ...update }: Blog) {
  return await DBconnection.blog.update({
    where: { id, AND: { userId } },
    data: update,
  });
}
export async function createBlog(blog: Blog) {
  return await DBconnection.blog.create({
    data: blog,
  });
}
export async function getBlog(id: string) {
  return await DBconnection.blog.findUnique({
    where: { id, AND: { isDeleted: false } },
  });
}

export async function getall(userId?: string) {
  return await DBconnection.blog.findMany({
    where: { isDeleted: false, AND: userId ? { userId } : {} },
  });
}
