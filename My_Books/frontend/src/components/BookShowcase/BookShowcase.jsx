import React, { useState, useContext } from 'react';
import { 
  Typography, 
  Button, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  IconButton
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import BookCard from './BookCard';
import { AuthContext } from '../../context/AuthContext';
import useBooks from '../../hooks/useBooks';
import BookForm from './BookForm';
import './BookShowcase.scss';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'unread', label: 'Unread' },
  { value: 'want', label: 'Want to Read' },
  { value: 'reading', label: 'Currently Reading' },
  { value: 'finished', label: 'Finished' },
  { value: 'abandoned', label: 'Abandoned' },
  { value: 'rereading', label: 'Re-reading' }
];

const genreOptions = [
  { value: '', label: 'All Genres' },
  { value: 'FIC', label: 'Fiction' },
  { value: 'NF', label: 'Non-Fiction' },
  { value: 'ACA', label: 'Academic' },
  { value: 'JA', label: 'Journal Articles' },
  { value: 'BIO', label: 'Biography' },
  { value: 'SCI', label: 'Science' },
  { value: 'HIS', label: 'History' }
];

const BookShowcase = () => {
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState({
    status: '',
    genre: '',
    search: ''
  });
  const [openForm, setOpenForm] = useState(false);
  const { books, loading, error, addBook, updateBook, deleteBook } = useBooks(filter);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (bookData) => {
    try {
      await addBook(bookData);
      setOpenForm(false);
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <section id="discover" className="book-showcase">
      <Typography variant="h2" className="section-title" gutterBottom>
        My Book Collection
      </Typography>

      <Box className="filter-controls">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <FilterAltIcon color="primary" />
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              label="Status"
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={filter.genre}
              onChange={handleFilterChange}
              label="Genre"
            >
              {genreOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            placeholder="Search books..."
            size="small"
            variant="outlined"
          />
          
          {user && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenForm(true)}
              sx={{ ml: 'auto' }}
            >
              Add Book
            </Button>
          )}
        </Stack>
      </Box>

      {error && (
        <Box className="error-message">
          <Typography color="error">{error}</Typography>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Box>
      )}

      {loading ? (
        <Box className="loading-skeleton">
          {[...Array(6)].map((_, i) => (
            <BookCard key={i} loading />
          ))}
        </Box>
      ) : books.length === 0 ? (
        <Box className="no-results">
          <Typography variant="h6">No books found matching your filters</Typography>
          <Button 
            variant="outlined"
            onClick={() => setFilter({ status: '', genre: '', search: '' })}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Box className="books-grid">
          {books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onUpdate={updateBook}
              onDelete={deleteBook}
            />
          ))}
        </Box>
      )}

      <BookForm 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        onSubmit={handleAddBook}
      />
    </section>
  );
};

export default BookShowcase;