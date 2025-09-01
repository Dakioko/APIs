import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-overlay" />
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" className="hero-title">
          Your Personal <span className="highlight">Book Universe</span>
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          Discover, organize, and share your book collection with the world
        </Typography>
        
        <div className="hero-actions">
          <Button variant="contained" size="large" className="primary-button">
            Explore Books
          </Button>
          <Button variant="outlined" size="large" className="secondary-button">
            Watch Demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;