import { Box, Fab, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { NewBlog } from "../../types";
import { faker } from "@faker-js/faker/locale/ro_MD";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
const intialState: NewBlog = {
  title: " ",
  synopsis: "",
  featuredImage: faker.image.avatar(),
  content: "",
};

function EditBlog() {
  const [modifiedBlog, setBlog] = useState(intialState);
  const { blogId } = useParams();
  useQuery({
    queryKey: ["get-blog"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blogs/${blogId}`);
      setBlog({ ...data });
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async (newBlog: NewBlog) => {
      const { data } = await axiosInstance.patch(`/blogs/${blogId}`, newBlog);
      return data;
    },
    onSuccess: () => {
      toast("edited sucessfully");
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
              error={modifiedBlog.title.length == 0 ? true : false}
              helperText={
                modifiedBlog.title.length == 0 ? "field is required" : false
              }
              value={modifiedBlog.title}
              onChange={({ target: { value } }) => {
                setBlog({ ...modifiedBlog, title: value });
              }}
              label="title "
            />
            <TextField
              error={modifiedBlog.synopsis == "" ? true : false}
              helperText={
                modifiedBlog.synopsis == "" ? "field is required" : false
              }
              value={modifiedBlog.synopsis}
              onChange={({ target: { value } }) => {
                setBlog({ ...modifiedBlog, synopsis: value });
              }}
              label="synopsis "
              fullWidth
            />
          </Stack>
          <TextField
            error={modifiedBlog.content == "" ? true : false}
            helperText={
              modifiedBlog.content == "" ? "field is required" : false
            }
            value={modifiedBlog.content}
            onChange={({ target: { value } }) => {
              setBlog({ ...modifiedBlog, content: value });
            }}
            multiline
            rows={15}
            label="Content in markdow"
            fullWidth
          />
        </Stack>
        <Fab
          sx={{ position: "absolute", right: "2rem", bottom: "2rem" }}
          color="secondary"
          aria-label="edit"
          onClick={() => mutate(modifiedBlog)}
        >
          <EditIcon />
        </Fab>
      </Paper>
    </Box>
  );
}

export default EditBlog;
