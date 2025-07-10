import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";

function App() {
  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>i am the home page</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Box>
  );
}

export default App;
