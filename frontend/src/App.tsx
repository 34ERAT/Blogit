import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";
import Blogs from "./components/blogs/Blogs";
import Blog from "./components/forms/Blog";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Box height={"100vh"}>
      <NavBar />
      <Box pt={"4.7rem"} height={"100%"} display={"flex"}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Box>
      <Toaster position="top-right" />
    </Box>
  );
}

export default App;
