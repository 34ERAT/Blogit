import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../../store";
import {
  hasempty,
  isEmpty,
  isRequired as isRequired,
} from "../../utils/textField";
type Login = {
  userName?: string;
  password: string;
};

function SignIn() {
  const { setLoginStatus } = useUserStore();
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (credentials: Login) => {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      return data;
    },
    onSuccess: () => {
      setLoginStatus(true);
      navigate("/user/blogs");
      toast("success");
    },
  });
  const [login, setLogin] = useState<Login>({
    userName: "",
    password: "",
  });

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
          {isError && (
            <Alert severity="error">incorrect user name or password.</Alert>
          )}
          <TextField
            error={isEmpty(login.userName as string)}
            value={login.userName}
            type="email"
            label="UserName or Email"
            helperText={isRequired(login.userName as string)}
            onChange={({ target: { value } }) => {
              setLogin({ ...login, userName: value });
            }}
            required
          />
          <TextField
            error={isEmpty(login.password)}
            type="password"
            value={login.password}
            label="password"
            onChange={({ target: { value } }) => {
              setLogin({ ...login, password: value });
            }}
            helperText={isRequired(login.password)}
            required
          />
          <Button
            loading={isPending}
            disabled={hasempty(Object.values(login as object))}
            variant="contained"
            onClick={() => {
              mutate(login);
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
