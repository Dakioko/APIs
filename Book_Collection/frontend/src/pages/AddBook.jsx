import React from 'react';
import { Container } from '@mui/material';
import BookForm from '../components/BookForm';
import { addBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (bookData) => {
    try {
      await addBook(bookData);
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container>
      <BookForm onSubmit={handleSubmit} isEdit={false} />
    </Container>
  );
};

export default AddBook;