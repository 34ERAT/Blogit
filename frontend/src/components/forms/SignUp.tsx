import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { isEmpty, isRequired } from "../../utils/textField";
type SignUPBody = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup-key"],
    mutationFn: async (newUser: SignUPBody) => {
      const { data } = await axiosInstance.post("/auth/register", newUser);
      return data;
    },
    onSuccess: () => {
      toast("hello i have done it");
      navigate("/signin");
    },
    onError: (e) => {
      console.error(e);
      toast("something went wrong");
    },
  });
  const [signup, setsignup] = useState<SignUPBody>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper sx={{ width: "25rem", p: 3 }} elevation={7}>
        <Stack spacing={2}>
          <TextField
            size="small"
            value={signup.firstname}
            error={isEmpty(signup.firstname as string)}
            helperText={isRequired(signup.firstname)}
            label="frist name"
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, firstname: value });
            }}
          />
          <TextField
            value={signup.lastname}
            size="small"
            error={isEmpty(signup.lastname)}
            helperText={isRequired(signup.lastname)}
            label="last name"
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, lastname: value });
            }}
            required
          />
          <TextField
            size="small"
            value={signup.username}
            error={isEmpty(signup.username)}
            helperText={isRequired(signup.username)}
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, username: value });
            }}
            label="UserName"
            required
          />
          <TextField
            value={signup.email}
            size="small"
            error={isEmpty(signup.email)}
            helperText={isRequired(signup.email)}
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, email: value });
            }}
            label="Email"
            required
          />
          <TextField
            value={signup.password}
            error={isEmpty(signup.password)}
            size="small"
            helperText={isRequired(signup.password)}
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, password: value });
            }}
            label="password"
            type="password"
            required
          />
          <TextField
            value={signup.confirmPassword}
            error={signup.confirmPassword != signup.password}
            helperText={isRequired(signup.confirmPassword)}
            onChange={({ target: { value } }) => {
              setsignup({ ...signup, confirmPassword: value });
            }}
            type="password"
            label="Confirm password"
            size="small"
            required
          />
          <Button
            variant="contained"
            loading={isPending}
            onClick={() => {
              mutate(signup);
            }}
          >
            sign up
          </Button>
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
