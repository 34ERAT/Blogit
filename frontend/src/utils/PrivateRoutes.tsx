import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useUserStore from "../store";

function PrivateRoutes() {
  const { loginStatus } = useUserStore();
  const { isSuccess, isLoading } = useQuery({
    queryKey: ["checkLogin"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });
      return data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true, // important
  });

  if (isLoading) return <div>Loading...</div>; // or a spinner

  return loginStatus && isSuccess ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
