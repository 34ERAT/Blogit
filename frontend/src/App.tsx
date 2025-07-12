import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";
import Blogs from "./components/blogs/Blogs";
import { Toaster } from "react-hot-toast";
import UserBlog from "./components/blogs/UserBlog";
import Blog from "./components/forms/Blog";
import EditBlog from "./components/forms/EditBlog";

function App() {
  return (
    <Box height={"100vh"}>
      <NavBar />
      <Box pt={"4.7rem"} height={"100%"} display={"flex"}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs">
            <Route index path="" element={<Blog />} />
            <Route path=":blogId" element={<EditBlog />} />
          </Route>
          <Route path="/user/">
            <Route path="blogs" element={<UserBlog />} />
          </Route>
        </Routes>
      </Box>
      <Toaster position="top-right" />
    </Box>
  );
}

export default App;
