import React from "react";
import {
  Card,
  Box,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartStore } from "../../context/useCartStore";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card sx={{ display: "flex", mb: 2, p: 2, alignItems: "center" }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "contain" }}
        image={item.image}
        alt={item.title}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          ml: 2,
          mr: 2,
        }}
      >
        <Typography variant="h6" noWrap sx={{ maxWidth: "400px" }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unit Price: ${item.price}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <RemoveIcon />
        </IconButton>

        <Typography sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}>
          {item.quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h6"
        sx={{ minWidth: "80px", textAlign: "right", mr: 2 }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>

      <IconButton color="error" onClick={() => removeItem(item.id)}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;
