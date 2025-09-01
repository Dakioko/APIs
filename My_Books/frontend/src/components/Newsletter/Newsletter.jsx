import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, TextField, Button, Alert } from '@mui/material';
import './Newsletter.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would typically connect to your API
    console.log('Submitting email:', email);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setError('');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="newsletter-content"
        >
          <Typography variant="h3" className="newsletter-title">
            Stay Updated
          </Typography>
          <Typography variant="body1" className="newsletter-subtitle">
            Subscribe to our newsletter for the latest book recommendations and app updates
          </Typography>

          {submitted ? (
            <Alert severity="success" className="success-message">
              Thank you for subscribing! You'll hear from us soon.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                variant="outlined"
                className="email-input"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="subscribe-button"
              >
                Subscribe
              </Button>
            </form>
          )}
          
          {error && (
            <Alert severity="error" className="error-message">
              {error}
            </Alert>
          )}
          
          <Typography variant="body2" className="privacy-note">
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;