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

export const newBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newBlog: Blog = req.body;
    const createdBlog = await createBlog(newBlog);
    createdBlog ? res.status(201).json(createdBlog) : next();
  },
);
export const patchBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedBlog: Blog = req.body;
    modifiedBlog.id = req.params.blogId;
    const blog = await updateBlog(modifiedBlog);
    blog ? res.status(200).json(blog) : next();
  },
);
export const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const { userId } = req.body;
    const blog = await removeBlog(blogId, userId);
    blog ? res.status(200).json({ message: "delete succefuly" }) : next();
  },
);
export const getBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const blog = await getBlogById(blogId);
    blog ? res.status(200).json(blog) : next();
  },
);

export const getBlogByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const blog = await getall(blogId);
    blog ? res.status(200).json(blog) : next();
  },
);
export const getBlogs = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const blogs = await getall();
    blogs ? res.status(200).json(blogs) : next();
  },
);
