import { Box, Container, Grid, Typography } from "@mui/material";
import BlogCard from "./BlogCard";
import { faker } from "@faker-js/faker";
import axiosInstance from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import type { NewBlog } from "../../types";
function Blogs() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/blogs");
      return data;
    },
  });

  return (
    <Box display={"flex"} width={"100%"}>
      <Container maxWidth="xl">
        <Grid container columns={3} justifyContent={"center"} spacing={2}>
          {isLoading && (
            <Typography variant="h4"> loading blogs , Please wait </Typography>
          )}
          {error ? (
            <Typography variant="h4" color="warning">
              Oops! something were wrong{" "}
            </Typography>
          ) : (
            blogs?.map(
              ({ id, User, title, synopsis, featuredImage }: NewBlog) => (
                <Grid size={{ xs: 3, sm: 1.5, md: 1 }} key={id}>
                  <BlogCard
                    id={id as string}
                    title={title}
                    synopsis={synopsis}
                    auther={`${User?.firstname} ${User?.lastname} `}
                    img={featuredImage}
                    avater={faker.image.avatar()}
                  />
                </Grid>
              ),
            )
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Blogs;
