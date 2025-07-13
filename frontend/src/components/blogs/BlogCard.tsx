import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
type Props = {
  title: string;
  synopsis: string;
  auther: string;
  img: string;
  avater: string;
  owner?: boolean;
  id: string;
};

function BlogCard({ img, avater, id, title, synopsis, auther, owner }: Props) {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
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
      <CardContent sx={{ maxHeight: "50%" }}>
        <Stack spacing={1} justifyContent={"space-between"}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{synopsis}</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={avater} /> <Typography>{auther}</Typography>
          </Stack>
        </Stack>
        <DeleteDialog
          id={id}
          open={open}
          onClose={() => {
            setopen(false);
          }}
        />
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Button onClick={() => navigate(`/blogs/${id}/Read`)} variant="text">
            Read more
          </Button>
          {owner && (
            <Stack direction={"row-reverse"}>
              <IconButton color="warning" onClick={() => setopen(true)}>
                <DeleteForeverIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  navigate(`/blogs/${id}`);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
