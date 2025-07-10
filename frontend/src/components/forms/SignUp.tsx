import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  return (
    <Box
      mt={9}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ width: "25rem", p: 3 }} elevation={7}>
        <Stack spacing={2}>
          <TextField label="frist name" required />
          <TextField label="last name" required />
          <TextField label="UserName" required />
          <TextField label="Email" required />
          <TextField label="password" required />
          <TextField label="Confirm password" required />
          <Button variant="contained">sign up</Button>
          <Divider variant="inset"> OR </Divider>
          <Button variant="outlined" onClick={() => navigate("/signin")}>
            sign in
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default SignUp;
