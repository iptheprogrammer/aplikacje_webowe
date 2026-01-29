import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { useAuthStore } from "../../context/useAuthStore";
import { mockServer } from "../../api/mockServer";

const ProductReviews = ({ productId }) => {
  const { user, isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      const data = await mockServer.getReviewsByProduct(productId);
      setReviews(data);
    };
    loadReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const newReview = {
        userName: user?.name || "Anonymous",
        userEmail: user?.email,
        text: comment,
        rating: rating,
        date: new Date().toLocaleDateString(),
      };

      await mockServer.addReview(productId, newReview);
      setReviews([...reviews, newReview]);
      setComment("");
      setRating(5);
      setError("");
    } catch (err) {
      setError("Failed to submit review");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 4 }}>
        {reviews.length === 0 ? (
          <Typography color="text.secondary">
            No reviews yet. Be the first!
          </Typography>
        ) : (
          reviews.map((review, index) => (
            <Paper
              key={index}
              sx={{ p: 2, mb: 2, bgcolor: "background.paper" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {review.userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {review.date}
                </Typography>
              </Box>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.text}
              </Typography>
            </Paper>
          ))
        )}
      </Box>

      {isAuthenticated ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <Button type="submit" variant="contained">
            Submit Review
          </Button>
        </Box>
      ) : (
        <Alert severity="info">Please login to write a review.</Alert>
      )}
    </Box>
  );
};

export default ProductReviews;
