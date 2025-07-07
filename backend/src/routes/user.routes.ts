import { Router } from "express";
//TODO: connect  user routers to controller
const router = Router();
router.patch("/");
router.patch("/password");
router.get("/blogs");

export default router;
