import { Box, Paper, Stack, TextField, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

type Profile = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
};
const initialState: Profile = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
};
function UserProfile() {
  const [profile, setProfile] = useState(initialState);
  useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/profile");
      setProfile({ ...data });
      return data as Profile;
    },
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["patchProfile"],
    mutationFn: async (profile: Profile) => {
      const { data } = await axiosInstance.patch("users", profile);
      return data as Profile;
    },
    onSuccess: (data) => {
      setProfile({ ...data });
      toast("updated");
    },

    onError: () => {
      toast("failed");
    },
  });
  function isFull(input: string) {
    return input.length == 0 ? false : true;
  }
  function hasempty(profile: Profile) {
    for (const value of Object.values(profile)) {
      if (value.length == 0) return true;
    }
    return false;
  }
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
            label="fristName"
            value={profile.firstname}
            error={!isFull(profile.firstname)}
            onChange={({ target: { value } }) => {
              setProfile({ ...profile, firstname: value });
            }}
            slotProps={{ inputLabel: { shrink: isFull(profile.firstname) } }}
            required
          />
          <TextField
            label="lastName"
            value={profile.lastname}
            error={!isFull(profile.lastname)}
            onChange={({ target: { value } }) => {
              setProfile({ ...profile, lastname: value });
            }}
            slotProps={{ inputLabel: { shrink: isFull(profile.lastname) } }}
            required
          />
          <TextField
            label="eMail"
            value={profile.email}
            error={!isFull(profile.email)}
            onChange={({ target: { value } }) => {
              setProfile({ ...profile, email: value });
            }}
            slotProps={{ inputLabel: { shrink: isFull(profile.email) } }}
            required
          />
          <TextField
            label="UserName"
            value={profile.username}
            error={!isFull(profile.username)}
            onChange={({ target: { value } }) => {
              setProfile({ ...profile, username: value });
            }}
            slotProps={{ inputLabel: { shrink: isFull(profile.username) } }}
            required
          />
          <Button
            disabled={hasempty(profile)}
            loading={isPending}
            variant="contained"
            onClick={() => mutate(profile)}
          >
            Update
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default UserProfile;
