import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import BookForm from '../components/BookForm';
import { getBook, updateBook } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setInitialData(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
        navigate('/');
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async (bookData) => {
    try {
      await updateBook(id, bookData);
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (!initialData) return <Container>Loading...</Container>;

  return (
    <Container>
      <BookForm initialData={initialData} onSubmit={handleSubmit} isEdit={true} />
    </Container>
  );
};

export default EditBook;