import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Links() {
  return (
    <>
      <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
        <Typography variant="subtitle1"> Blogs</Typography>
      </Link>
      <Link
        to={"/user/blogs"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Typography> My Blogs </Typography>
      </Link>
      {/* <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}> */}
      {/*   <Typography> Blogs</Typography> */}
      {/* </Link> */}
      {/* <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}> */}
      {/*   <Typography> Blogs</Typography> */}
      {/* </Link> */}
    </>
  );
}

export default Links;
