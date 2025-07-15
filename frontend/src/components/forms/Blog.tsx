import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import type { CreateBlog, NewBlog } from "../../types";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import BlogInput from "./BlogInput";
import CreateBlogSpeedDial from "../buttons/CreateBlogSpeedDial";

function Blog() {
  const [open, setOpen] = useState(false);
  const [blog, setBlog] = useState<CreateBlog>({
    title: "",
    synopsis: "",
    content: "",
  });
  const [featuredImage, setfeaturedImage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { mutate: mutateNewBlog, isPending: createIsPending } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async (newBlog: NewBlog) => {
      const { data } = await axiosInstance.post("/blogs", newBlog);
      return data;
    },
    onSuccess: () => {
      toast("created ");
      setBlog({ ...blog });
    },
  });
  const { mutate: mutateUploadImage, isPending: uploadIsPending } = useMutation(
    {
      mutationKey: ["uploadImage"],
      mutationFn: async (image: FormData) => {
        const { data } = await axiosInstance.post("/images", image);
        return data;
      },
      onSuccess(data: { url: string }) {
        setfeaturedImage(data.url);
        toast("uploaded");
      },
    },
  );
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ position: "relative", width: "90%", p: 3 }} elevation={7}>
        <BlogInput
          values={blog}
          onChange={(data) => {
            setBlog({ ...data });
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
              toast("no file selected");
              return;
            }

            const formData = new FormData();
            formData.append("image", file);
            mutateUploadImage(formData);
          }}
        />
        <CreateBlogSpeedDial
          ispending={uploadIsPending || createIsPending}
          onClick={() => {
            setOpen(!open);
          }}
          onClickSave={() => {
            mutateNewBlog({ ...blog, featuredImage });
          }}
          onClickImageUpload={() => {
            fileInputRef.current?.click();
          }}
          open={uploadIsPending || createIsPending ? false : open}
        />
      </Paper>
    </Box>
  );
}

export default Blog;
