import { Stack, Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Links from "./Links";
type Props = {
  open: boolean;
  logedIn: boolean;
  onClose: () => void;
  onLogOut: () => void;
};

function NavDrawer({ open, logedIn, onClose, onLogOut }: Props) {
  const navigate = useNavigate();
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Stack spacing={2} padding={3} justifyContent={"center"}>
        {logedIn && <Links />}
        {logedIn && <Button onClick={onLogOut}>Log out</Button>}
        <Button onClick={() => navigate("/signup")}>sign up</Button>
      </Stack>
    </Drawer>
  );
}

export default NavDrawer;
