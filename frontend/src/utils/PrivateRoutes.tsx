import { useMutation } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useUserStore from "../store";
import toast from "react-hot-toast";
import { useEffect } from "react";

function PrivateRoutes() {
  const { loginStatus, setLoginStatus } = useUserStore();
  const location = useLocation();
  const param = useParams();
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
    const { pathname } = location;
    if (pathname == `/blogs/${param.blogId}`) {
      return;
    }
    mutate();
  }, [location, mutate, param]);
  return loginStatus ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
