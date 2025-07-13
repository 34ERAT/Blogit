import { useQuery } from "@tanstack/react-query";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { Box, Container, Typography } from "@mui/material";
import type { NewBlog } from "../../types";
function ReadBlog() {
  const { blogId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["readBlog"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blogs/${blogId}`);
      return data as NewBlog;
    },
  });
  // const { content, title, synopsis } = data as NewBlog;
  // const content: string[] = (data?.content as string).split("\n");
  const content = data?.content as string;
  return isLoading ? (
    <Typography> loading please wait</Typography>
  ) : (
    <Box width={"100%"}>
      <Container sx={{ width: "80%" }} maxWidth="xl">
        <Typography
          textAlign={"center"}
          variant="h4"
          fontWeight={800}
          gutterBottom
        >
          {data?.title}
        </Typography>
        <Typography gutterBottom textAlign={"center"} variant="h6">
          {data?.synopsis}
        </Typography>
        <Markdown options={{ wrapper: "article" }}>{content}</Markdown>
      </Container>
    </Box>
  );
}

export default ReadBlog;
