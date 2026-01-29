import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthStore } from "../../context/useAuthStore";

const Layout = () => {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
