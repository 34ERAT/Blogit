import { Router } from "express";
import { checkLoginStatus, login, logout, register } from "../controller";
import verifyToken from "../middleware/verifyToken";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, checkLoginStatus);

export default router;
