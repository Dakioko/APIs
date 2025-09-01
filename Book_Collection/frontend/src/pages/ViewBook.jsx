import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBook } from '../services/api';

const ViewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
        navigate('/');
      }
    };
    fetchBook();
  }, [id, navigate]);

  if (!book) return <Container>Loading...</Container>;

  return (
    <Container>
      <Box mb={3}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        {book.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        by {book.author}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Typography>Status: {book.status}</Typography>
        {book.genre && <Typography>Genre: {book.genre}</Typography>}
      </Box>
      {book.notes && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Notes:</Typography>
          <Typography>{book.notes}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ViewBook;