import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
import Logo from "./Logo";
import Links from "./Links";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
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
            <Links />
          </Stack>
          <Button
            onClick={() => navigate("/signup")}
            variant="outlined"
            color="inherit"
          >
            sign up
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
