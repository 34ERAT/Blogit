import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

function PrivateRoutes() {
  const {
    data,
    // isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["checkLogin"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("auth/me", {
        withCredentials: true,
      });
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true, // important
  });

  if (isLoading) return <div>Loading...</div>; // or a spinner

  if (isError || !data?.status) return <Navigate to="/signin" />;

  return <Outlet />;
}

export default PrivateRoutes;
