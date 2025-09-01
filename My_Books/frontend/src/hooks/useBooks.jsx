import { useState, useEffect } from 'react';
import api from '../services/api';

const useBooks = (filters = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/books/?${params}`);
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters.status, filters.genre, filters.search]);

  const addBook = async (bookData) => {
    try {
      const response = await api.post('/books/', bookData);
      setBooks(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const response = await api.patch(`/books/${id}/`, bookData);
      setBooks(prev => prev.map(book => book.id === id ? response.data : book));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}/`);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return { books, loading, error, addBook, updateBook, deleteBook, refresh: fetchBooks };
};

export default useBooks;