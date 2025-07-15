import { useMutation } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useUserStore from "../store";
import toast from "react-hot-toast";
import { useEffect } from "react";

function PrivateRoutes() {
  const { loginStatus, setLoginStatus } = useUserStore();
  const { mutate } = useMutation({
    mutationKey: ["checkLogin"],
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/auth/me", {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data: { status: boolean }) => {
      setLoginStatus(data.status);
    },
    onError: () => {
      toast("something went wrong");
    },
  });
  useEffect(() => {
    mutate();
  });
  return loginStatus ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
