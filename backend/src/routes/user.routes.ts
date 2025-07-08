import { Router } from "express";
import { getBlogByUser, patchPassword, patchUser } from "../controller";
const router = Router();
router.patch("/", patchUser);
router.patch("/password", patchPassword);
router.get("/blogs", getBlogByUser);

export default router;
