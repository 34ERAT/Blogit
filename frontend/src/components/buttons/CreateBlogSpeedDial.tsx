import { Save } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import PendingIcon from "@mui/icons-material/Pending";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
type Props = {
  ispending: boolean;
  onClickSave: () => void;
  onClickImageUpload: () => void;
  open: boolean;
  onClick: () => void;
};
function CreateBlogSpeedDial({
  ispending,
  onClickSave,
  onClickImageUpload,
  open,
  onClick,
}: Props) {
  return (
    <SpeedDial
      sx={{
        position: "absolute",
        right: "2rem",
        bottom: "2rem",
      }}
      ariaLabel="add item speedial"
      icon={ispending ? <PendingIcon fontSize="large" /> : <SpeedDialIcon />}
      onClick={onClick}
      open={open}
    >
      <SpeedDialAction
        onClick={onClickSave}
        icon={<Save color="primary" />}
        tooltipTitle={"save"}
      />

      <SpeedDialAction
        icon={<ImageIcon color="primary" />}
        tooltipTitle={"upload image"}
        onClick={onClickImageUpload}
      />
    </SpeedDial>
  );
}

export default CreateBlogSpeedDial;
