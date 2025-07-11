import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
type Props = {
  title: string;
  synopsis: string;
  auther: string;
  img: string;
  avater: string;
};
function BlogCard({ img, avater, title, synopsis, auther }: Props) {
  return (
    <Card
      sx={{
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        justifyContent: "space-between",
        height: "24rem",
      }}
    >
      <CardMedia sx={{ height: "15rem" }} image={img} />
      <CardContent>
        <Stack spacing={1} justifyContent={"space-between"}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{synopsis}</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={avater} /> <Typography>{auther}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="text">Read more</Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
