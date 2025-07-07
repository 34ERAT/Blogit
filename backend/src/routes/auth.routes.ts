import { Router } from "express";
//TODO: connect auth routers to  their respective controllers
const router = Router();
router.post("/register");
router.post("/login");
router.post("/logout");

export default router;
