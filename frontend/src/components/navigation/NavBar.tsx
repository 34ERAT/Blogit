import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "./Logo";
import Links from "./Links";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import useUserStore from "../../store";
import { useState } from "react";
import NavDrawer from "./NavDrawer";

function NavBar() {
  const { loginStatus, setLoginStatus } = useUserStore();
  const [openDrawer, setopenDrawer] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await axiosInstance.post("auth/logout");
    },
    onSuccess: () => {
      navigate("/signin");
      setLoginStatus(false);
    },
  });
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Logo />
          <Stack
            spacing={2}
            alignItems={"center"}
            display={{ xs: "none", md: "flex" }}
            direction={"row"}
          >
            {loginStatus && <Links />}
          </Stack>
          {!loginStatus && (
            <Button
              onClick={() => navigate("/signup")}
              variant="outlined"
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              sign up
            </Button>
          )}
          {loginStatus && (
            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              color="inherit"
              onClick={() => mutate()}
            >
              Log out
            </Button>
          )}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setopenDrawer(true)}
          >
            {openDrawer ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <NavDrawer
            open={openDrawer}
            logedIn={loginStatus}
            onLogOut={() => mutate()}
            onClose={() => setopenDrawer(false)}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
