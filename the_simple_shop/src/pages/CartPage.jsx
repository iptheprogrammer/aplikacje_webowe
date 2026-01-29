import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../context/useCartStore";
import { useAuthStore } from "../context/useAuthStore";
import { mockServer } from "../api/mockServer";
import CartItem from "../components/products/CartItem";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const total = getTotalPrice();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        userId: user.email,
        userEmail: user.email,
        items: items,
        total: total,
        date: new Date().toLocaleDateString(),
      };

      await mockServer.createOrder(orderData);
      clearCart();
      navigate("/history");
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Box>

        <Box sx={{ minWidth: "300px" }}>
          <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Items ({items.length})</Typography>
              <Typography>${total.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              {isAuthenticated ? "Checkout" : "Login to Checkout"}
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
