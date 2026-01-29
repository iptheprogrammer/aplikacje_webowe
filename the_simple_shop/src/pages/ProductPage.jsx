import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Rating,
  Chip,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fakeStoreApi } from "../api/fakeStoreApi";
import { useCartStore } from "../context/useCartStore";
import ProductReviews from "../components/products/ProductReviews";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fakeStoreApi.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Store
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: 4,
              border: "1px solid #eee",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2, textTransform: "capitalize" }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              value={product.rating?.rate || 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating?.count} ratings)
            </Typography>
          </Box>

          <Typography variant="h3" color="primary" sx={{ mb: 3 }}>
            ${product.price}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <TextField
              type="number"
              label="Qty"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ width: 80 }}
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => addItem(product, quantity)}
              sx={{ px: 4, py: 1 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8, mb: 4 }}>
        <ProductReviews productId={id} />
      </Box>
    </Container>
  );
};

export default ProductPage;
