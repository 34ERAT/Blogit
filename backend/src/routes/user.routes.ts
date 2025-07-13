import { Router } from "express";
import {
  getBlogByUser,
  patchPassword,
  patchUser,
  userProfile,
} from "../controller";
const router = Router();
router.patch("/", patchUser);
router.patch("/password", patchPassword);
router.get("/blogs", getBlogByUser);
router.get("/profile", userProfile);

export default router;
