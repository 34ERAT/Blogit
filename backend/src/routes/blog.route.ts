import { Router } from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  newBlog,
  patchBlog,
} from "../controller";
const router = Router();
router.route("/").get(getBlogs).post(newBlog);
router.route("/:blogId").get(getBlog).patch(patchBlog).delete(deleteBlog);

export default router;
