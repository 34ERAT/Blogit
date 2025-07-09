import { Router } from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  newBlog,
  patchBlog,
} from "../controller";
import verifyToken from "../middleware/verifyToken";
const router = Router();
router.route("/").get(getBlogs).post(verifyToken, newBlog);
router.route("/:blogId").get(getBlog).patch(patchBlog).delete(deleteBlog);

export default router;
