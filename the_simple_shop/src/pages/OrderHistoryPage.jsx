import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";
import { mockServer } from "../api/mockServer";

const OrderHistoryPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        const data = await mockServer.getOrdersByUser(user.email);
        setOrders(data);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">Please login to view your orders</Typography>
        <Button variant="contained" component={Link} to="/login" sx={{ mt: 2 }}>
          Login
        </Button>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            You have no orders yet.
          </Typography>
          <Button component={Link} to="/" sx={{ mt: 2 }}>
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Paper key={order.id} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h6">Order #{order.id}</Typography>
                <Chip label={order.date} variant="outlined" color="primary" />
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                {order.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.quantity} x {item.title}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total Paid</Typography>
                <Typography variant="h6" color="secondary">
                  ${order.total.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrderHistoryPage;
