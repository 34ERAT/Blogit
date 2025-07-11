import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
type Login = {
  userName?: string;
  eMail?: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (credentials: Login) => {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      return data;
    },
  });
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [required, setRequired] = useState(false);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ width: "25rem", p: 3 }} elevation={7}>
        <Stack spacing={2}>
          <TextField
            error={required}
            value={username}
            type="email"
            label="UserName or Email"
            helperText={required ? "field is required" : ""}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            error={required}
            type="password"
            value={password}
            label="password"
            onChange={(e) => setPassword(e.target.value)}
            helperText={required ? "field is required" : ""}
            required
          />
          <Button
            loading={isPending}
            variant="contained"
            onClick={() => {
              if (username == "" || password == "") {
                setRequired(true);
                return;
              }
              mutate({ eMail: username, password });
              if (isError) {
                toast("Something went wrong ");
                return;
              }
              toast("sign in succefull");
              setUserName("");
              setPassword("");
              setRequired(false);
              navigate("/user/blogs");
            }}
          >
            sign in
          </Button>
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
