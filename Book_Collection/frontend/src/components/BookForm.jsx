import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

const statusOptions = [
  { value: 'unread', label: 'Unread' },
  { value: 'want', label: 'Want to Read' },
  { value: 'reading', label: 'Currently Reading' },
  { value: 'finished', label: 'Finished' },
  { value: 'abandoned', label: 'Abandoned' },
  { value: 'rereading', label: 'Re-reading' },
];

const genreOptions = [
  { value: 'FIC', label: 'Fiction' },
  { value: 'NF', label: 'Non-Fiction' },
  { value: 'Aca', label: 'Academic' },
  { value: 'JA', label: 'Journal Articles' },
];

const BookForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'unread',
    genre: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
          required
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Genre</InputLabel>
        <Select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          label="Genre"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genreOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        {isEdit ? 'Update Book' : 'Add Book'}
      </Button>
    </Box>
  );
};

export default BookForm;