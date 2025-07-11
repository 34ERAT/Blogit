import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { Blog } from "@prisma/client";
import {
  createBlog,
  getall,
  getBlogById,
  removeBlog,
  updateBlog,
} from "../services";
import { blogid, editblog, new_Blog, userid } from "../zod";

export const newBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = await userid.parseAsync(req.userId);
    const blog = await new_Blog.parseAsync(req.body);
    const createdBlog = await createBlog({ ...blog, userId } as Blog);
    createdBlog ? res.status(201).json(createdBlog) : next(new Error());
  },
);
export const patchBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedBlog = await editblog.parseAsync(req.body);
    const { blogId: id } = await blogid.parseAsync(req.params);
    const blog = await updateBlog({ ...modifiedBlog, id } as Blog);
    blog ? res.status(200).json(blog) : next();
  },
);
export const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId: id } = await blogid.parseAsync(req.params);
    const userId = await userid.parseAsync(req.userId);
    const blog = await removeBlog(id, userId);
    blog
      ? res.status(200).json({ message: "delete succefuly" })
      : next(new Error());
  },
);
export const getBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = await blogid.parseAsync(req.params);
    const blog = await getBlogById(blogId);
    blog ? res.status(200).json(blog) : next(new Error());
  },
);

export const getBlogByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = await userid.parseAsync(req.userId);
    const blog = await getall(userId);
    blog ? res.status(200).json(blog) : next(new Error());
  },
);
export const getBlogs = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const blogs = await getall();
    blogs ? res.status(200).json(blogs) : next(new Error());
  },
);
