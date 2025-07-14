import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
type SignUp = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
};
type InputState = { value: string; isEmpty: boolean };

function SignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup-key"],
    mutationFn: async (newUser: SignUp) => {
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
  const defaultState: InputState = { value: "", isEmpty: false };
  const [fstName, setFstName] = useState(defaultState);
  const [lstName, setLstName] = useState(defaultState);
  const [email, setEmail] = useState(defaultState);
  const [password, setPassword] = useState(defaultState);
  const [confirmpassword, setConfrimPassword] = useState(defaultState);
  const [username, setUsername] = useState(defaultState);
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
            value={fstName.value}
            error={fstName.isEmpty}
            helperText={fstName.isEmpty ? "field is required" : false}
            label="frist name"
            onChange={({ target }) => {
              setFstName((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              });
            }}
          />
          <TextField
            value={lstName.value}
            error={lstName.isEmpty}
            helperText={lstName.isEmpty ? "field is required" : false}
            label="last name"
            onChange={({ target }) =>
              setLstName((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              })
            }
            required
          />
          <TextField
            value={username.value}
            error={username.isEmpty}
            helperText={username.isEmpty ? "field is required" : false}
            onChange={({ target }) =>
              setUsername((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              })
            }
            label="UserName"
            required
          />
          <TextField
            value={email.value}
            label="Email"
            error={email.isEmpty}
            helperText={email.isEmpty ? "field is required" : false}
            onChange={({ target }) =>
              setEmail((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              })
            }
            required
          />
          <TextField
            type="password"
            error={password.isEmpty}
            value={password.value}
            helperText={password.isEmpty ? "field is required" : false}
            onChange={({ target }) =>
              setPassword((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              })
            }
            required
          />
          <TextField
            error={confirmpassword != password ? true : false}
            helperText={
              confirmpassword != password
                ? "password do not match"
                : confirmpassword.isEmpty && "field is require "
            }
            type="password"
            value={confirmpassword.value}
            onChange={({ target }) =>
              setConfrimPassword((prev) => {
                if (prev.value == "")
                  return { ...prev, value: target.value, isEmpty: true };
                return { ...prev, value: target.value, isEmpty: false };
              })
            }
            label="Confirm password"
            required
          />
          <Button
            variant="contained"
            loading={isPending}
            onClick={() => {
              const data = [
                fstName,
                lstName,
                email,
                username,
                password,
                confirmpassword,
              ];
              for (const d of data) {
                if (d.value == "") return;
              }
              mutate({
                firstname: fstName.value,
                lastname: lstName.value,
                email: email.value,
                username: username.value,
                password: password.value,
              });
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
