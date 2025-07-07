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
    createdBlog ? res.status(201).json(createBlog) : next();
  },
);
export const patchBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedBlog: Blog = req.body;
    const blog = await updateBlog(modifiedBlog);
    blog ? res.status(200).json(blog) : next();
  },
);
export const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { userId } = req.body;
    const blog = await removeBlog(id, userId);
    blog ? res.status(204).json({ message: "delete succefuly" }) : next();
  },
);
export const getBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await getBlogById(id);
    blog ? res.status(200).json(blog) : next();
  },
);

export const getBlogByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await getall(id);
    blog ? res.status(200).json(blog) : next();
  },
);
export const getBlogs = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const blogs = await getall();
    blogs ? res.status(200).json(blogs) : next();
  },
);
