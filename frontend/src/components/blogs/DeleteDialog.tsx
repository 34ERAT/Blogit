import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};
function DeleteDialog({ open, onClose, id }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/blogs/${id}`);
      return data;
    },
    onSuccess: ({ message }: { message: string }) => {
      toast(message);
      queryClient.invalidateQueries({
        queryKey: ["userBlogs"],
        refetchType: "active",
      });
      onClose();
    },
    onError: (error) => {
      toast("something went wrong");
      console.error(error);
    },
  });
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog">
      <DialogTitle>
        <Typography component={"p"} variant="h5" fontWeight={800}>
          Are you sure , want to delete ?
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>{" "}
        <Button
          onClick={() => {
            mutate(id);
          }}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
