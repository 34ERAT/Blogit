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
import { useState } from "react";

function Blog() {
  const [open, setOpen] = useState(false);
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
            <TextField label="title " />
            <TextField label="synopsis " fullWidth />
          </Stack>
          <TextField multiline rows={15} label="Content in markdow" fullWidth />
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
          <SpeedDialAction icon={<Save />} tooltipTitle={"save"} />
          <SpeedDialAction icon={<ImageIcon />} tooltipTitle={"upload image"} />
        </SpeedDial>
      </Paper>
    </Box>
  );
}

export default Blog;
