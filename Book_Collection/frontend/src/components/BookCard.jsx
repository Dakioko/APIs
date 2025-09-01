import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  unread: 'default',
  want: 'primary',
  reading: 'secondary',
  finished: 'success',
  abandoned: 'error',
  rereading: 'warning',
};

const genreColors = {
  FIC: 'default',
  NF: 'primary',
  Aca: 'secondary',
  JA: 'info',
};

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{book.title}</Typography>
          <Box>
            <IconButton onClick={() => navigate(`/edit/${book.id}`)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(book.id)}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          by {book.author}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip label={book.status} color={statusColors[book.status]} size="small" />
          {book.genre && <Chip label={book.genre} color={genreColors[book.genre]} size="small" />}
        </Box>
        {book.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {book.notes.length > 100 ? `${book.notes.substring(0, 100)}...` : book.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;