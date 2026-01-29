import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Page not found
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
