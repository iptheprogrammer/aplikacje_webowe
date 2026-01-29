import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  CircularProgress,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useProductStore } from "../context/useProductStore";
import ProductCard from "../components/products/ProductCard";

const HomePage = () => {
  const {
    fetchAllProducts,
    isLoading,
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Our Products
        </Typography>

        {/* Search and Filter Controls */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 300 }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  sx={{ textTransform: "capitalize" }}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
