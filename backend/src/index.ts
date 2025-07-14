import cookiParser from "cookie-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import { errorHandle } from "./middleware/errorHandle";
import verifyToken from "./middleware/verifyToken";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.route";
import imageRouter from "./routes/image.routes";
import userRoutes from "./routes/user.routes";
const app = express();
const port = process.env.PORT || 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookiParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/images", verifyToken, upload.single("image"), imageRouter);
app.use(errorHandle);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`app runing on port ${port}`);
});
