import { useQuery } from "@tanstack/react-query";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import type { NewBlog } from "../../types";
function ReadBlog() {
  const { blogId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["readBlog"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<NewBlog>(`/blogs/${blogId}`);
      return data;
    },
  });
  const content = data?.content as string;
  if (isLoading) return <Typography>loading please wait ..</Typography>;
  return (
    <Box width={"100%"} py={6} px={2}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
          <Box
            component="img"
            src={data?.featuredImage}
            alt={data?.title || "Blog Image"}
            sx={{
              width: "100%",
              height: { xs: 200, sm: 300, md: 400 },
              objectFit: "cover",
            }}
          />
          <Typography
            textAlign={"center"}
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            {data?.title}
          </Typography>
          <Typography
            gutterBottom
            textAlign={"center"}
            color="textSecondary"
            variant="subtitle1"
          >
            {data?.synopsis}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              typography: "body1",
              "& h1": { fontSize: "1.6rem", mt: 3 },
              "& h2": { fontSize: "1.4rem", mt: 3 },
              "& p": { mb: 2 },
              "& ul": { pl: 3, mb: 2 },
            }}
          >
            <Markdown options={{ wrapper: "article" }}>{content}</Markdown>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ReadBlog;
