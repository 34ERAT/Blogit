import { Box, Container, Grid } from "@mui/material";
import BlogCard from "./BlogCard";
import { faker } from "@faker-js/faker";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function Blogs() {
  return (
    <Box display={"flex"} width={"100%"}>
      <Container maxWidth="xl">
        <Grid container columns={3} justifyContent={"center"} spacing={2}>
          {data.map((index) => (
            <Grid size={{ xs: 3, sm: 1.5, md: 1 }} key={index}>
              <BlogCard
                title={faker.lorem.words()}
                synopsis={faker.lorem.sentences({ min: 1, max: 2 })}
                auther={faker.person.fullName()}
                img={faker.image.urlPicsumPhotos()}
                avater={faker.image.avatar()}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Blogs;
