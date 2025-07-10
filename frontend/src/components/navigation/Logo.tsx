import { Stack, Typography } from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
function Logo() {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <CurrencyBitcoinIcon fontSize="large" />
      <Typography
        variant="body1"
        fontWeight={900}
        noWrap
        textTransform="capitalize"
        sx={{
          fontFamily: "monospace",
          letterSpacing: ".3rem",
        }}
      >
        logIt
      </Typography>
    </Stack>
  );
}

export default Logo;
