import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ width: "25rem", p: 3 }} elevation={7}>
        <Stack spacing={2}>
          <TextField label="UserName or Email" required />
          <TextField label="password" required />
          <TextField label="Confirm password" required />
          <Button variant="contained">sign in</Button>
          <Divider variant="inset"> OR </Divider>
          <Button variant="outlined" onClick={() => navigate("/signup")}>
            sign up
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default SignIn;
