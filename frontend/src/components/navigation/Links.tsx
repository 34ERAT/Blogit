import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Links() {
  const fontWeight = 600;
  return (
    <>
      <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
        <Typography variant="subtitle1" fontWeight={fontWeight}>
          Blogs
        </Typography>
      </Link>
      <Link
        to={"/user/blogs"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Typography variant="subtitle1" fontWeight={fontWeight}>
          My Blogs
        </Typography>
      </Link>
      <Link to={"/blogs"} style={{ color: "inherit", textDecoration: "none" }}>
        <Typography variant="subtitle1" fontWeight={fontWeight}>
          New Blog
        </Typography>
      </Link>
      <Link
        to={"/user/profile"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Typography variant="subtitle1" fontWeight={fontWeight}>
          Profile
        </Typography>
      </Link>
    </>
  );
}

export default Links;
