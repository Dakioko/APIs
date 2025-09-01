import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Grid } from '@mui/material';
import {
  LibraryBooks as LibraryIcon,
  Search as SearchIcon,
  Share as ShareIcon,
  CollectionsBookmark as CollectionIcon,
  Sync as SyncIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import './Features.scss';

const features = [
  {
    icon: <LibraryIcon fontSize="large" />,
    title: "Extensive Collection",
    description: "Access thousands of books across all genres"
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: "Smart Search",
    description: "Find exactly what you're looking for with advanced filters"
  },
  {
    icon: <ShareIcon fontSize="large" />,
    title: "Share with Friends",
    description: "Show off your collection and get recommendations"
  },
  {
    icon: <CollectionIcon fontSize="large" />,
    title: "Organize Easily",
    description: "Create custom shelves and categories"
  },
  {
    icon: <SyncIcon fontSize="large" />,
    title: "Sync Across Devices",
    description: "Access your collection anywhere, anytime"
  },
  {
    icon: <PersonIcon fontSize="large" />,
    title: "Personalized Profile",
    description: "Build your reading identity"
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <Typography variant="h2" className="section-title">
          Powerful Features
        </Typography>
        <Typography variant="subtitle1" className="section-subtitle">
          Everything you need to manage your book collection
        </Typography>

        <Grid container spacing={4} className="features-grid">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <Typography variant="h5" className="feature-title">
                  {feature.title}
                </Typography>
                <Typography variant="body1" className="feature-description">
                  {feature.description}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Features;