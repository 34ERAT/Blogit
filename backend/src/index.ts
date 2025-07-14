import express from "express";

import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.route";
import userRoutes from "./routes/user.routes";
import { errorHandle } from "./middleware/errorHandle";
import cookiParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middleware/verifyToken";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookiParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use(errorHandle);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`app runing on port ${port}`);
});
