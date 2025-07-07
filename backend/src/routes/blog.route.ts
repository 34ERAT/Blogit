import { Router } from "express";
//TODO: connect blog router with it's respective controller
const router = Router();
router.route("/blogs").get().post();
router.route("/blogs/:blogId").get().patch().delete();

export default router;
