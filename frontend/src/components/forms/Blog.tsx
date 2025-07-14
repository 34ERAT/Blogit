import { Save } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import type { NewBlog } from "../../types";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
const intialState: NewBlog = {
  title: " ",
  synopsis: "",
  featuredImage: "",
  content: "",
};

function Blog() {
  const [open, setOpen] = useState(false);
  const [blog, setBlog] = useState(intialState);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { mutate: mutateNewBlog } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async (newBlog: NewBlog) => {
      const { data } = await axiosInstance.post("/blogs", newBlog);
      return data;
    },
    onSuccess: () => {
      toast("created ");
      setBlog({ ...blog, ...intialState });
    },
  });
  const { mutate: mutateUploadImage } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (image: FormData) => {
      const { data } = await axiosInstance.post("/images", image);
      return data;
    },
    onSuccess(data: { url: string }) {
      toast("uploaded");
      setBlog({ ...blog, featuredImage: data.url });
    },
  });
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ position: "relative", width: "90%", p: 3 }} elevation={7}>
        <Stack spacing={2}>
          <Stack spacing={2} direction={"row"}>
            <TextField
              error={blog.title.length == 0 ? true : false}
              helperText={blog.title.length == 0 ? "field is required" : false}
              value={blog.title}
              onChange={({ target: { value } }) => {
                setBlog({ ...blog, title: value });
              }}
              label="title "
            />
            <TextField
              error={blog.synopsis == "" ? true : false}
              helperText={blog.synopsis == "" ? "field is required" : false}
              value={blog.synopsis}
              onChange={({ target: { value } }) => {
                setBlog({ ...blog, synopsis: value });
              }}
              label="synopsis "
              type="text"
              fullWidth
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
          </Stack>
          <TextField
            error={blog.content == "" ? true : false}
            helperText={blog.content == "" ? "field is required" : false}
            value={blog.content}
            onChange={({ target: { value } }) => {
              setBlog({ ...blog, content: value });
            }}
            multiline
            rows={15}
            label="Content in markdow"
            fullWidth
          />
        </Stack>

        <SpeedDial
          sx={{ position: "absolute", right: "2rem", bottom: "2rem" }}
          ariaLabel="add item speedial"
          icon={<SpeedDialIcon />}
          onClick={() => {
            setOpen(!open);
          }}
          open={open}
        >
          <SpeedDialAction
            onClick={() => {
              mutateNewBlog(blog);
            }}
            icon={<Save />}
            tooltipTitle={"save"}
          />
          <SpeedDialAction
            icon={<ImageIcon />}
            tooltipTitle={"upload image"}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </SpeedDial>
      </Paper>
    </Box>
  );
}

export default Blog;
