import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("i am ready");
});
app.listen(port, () => console.log(`app runing on port ${port}`));
