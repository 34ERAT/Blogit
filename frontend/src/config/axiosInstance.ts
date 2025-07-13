import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://blogit-ei78.onrender.com/api",
  withCredentials: true,
});
export default axiosInstance;
