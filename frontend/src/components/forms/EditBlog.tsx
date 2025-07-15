import { Box, Fab, Paper } from "@mui/material";
import { useState } from "react";
import type { CreateBlog, NewBlog } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import BlogInput from "./BlogInput";
import { hasempty } from "../../utils/textField";

function EditBlog() {
  const [modifiedBlog, setBlog] = useState<CreateBlog>({
    title: "",
    synopsis: "",
    content: "",
  });
  const [image, setfeaturedImage] = useState("");
  const { blogId } = useParams();
  useQuery({
    queryKey: ["get-blog"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<NewBlog>(`/blogs/${blogId}`);
      const { title, synopsis, content, featuredImage } = data;
      setBlog({ title, synopsis, content: content as string });
      setfeaturedImage(featuredImage);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
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
        <BlogInput
          values={modifiedBlog}
          onChange={(data) => {
            setBlog({ ...data });
          }}
        />
        <Fab
          disabled={isPending || hasempty(Object.values(modifiedBlog))}
          sx={{ position: "absolute", right: "2rem", bottom: "2rem" }}
          color="secondary"
          aria-label="edit"
          onClick={() => mutate({ ...modifiedBlog, featuredImage: image })}
        >
          <EditIcon />
        </Fab>
      </Paper>
    </Box>
  );
}

export default EditBlog;
