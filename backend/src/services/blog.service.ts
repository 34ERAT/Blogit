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
    omit: { isDeleted: true },
  });
}
export async function getBlogById(id: string) {
  return await DBconnection.blog.findUnique({
    where: { id, AND: { isDeleted: false } },
    omit: { isDeleted: true },
  });
}

export async function removeBlog(id: string, userId: string) {
  return await DBconnection.blog.update({
    where: { id, AND: { isDeleted: false, userId } },
    data: { isDeleted: true },
  });
}
export async function getall(userId?: string) {
  return await DBconnection.blog.findMany({
    where: { isDeleted: false, AND: userId ? { userId } : {} },
    include: {
      User: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
    },
    omit: { isDeleted: true, content: true, userId: true },
  });
}
