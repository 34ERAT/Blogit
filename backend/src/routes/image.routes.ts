import { Router } from "express";
import { uploadImage } from "../controller/image.controller";

const router = Router();
router.post("/", uploadImage);
export default router;
