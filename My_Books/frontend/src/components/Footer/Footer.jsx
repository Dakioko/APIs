import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import './Footer.scss';

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "API", href: "/api-docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: "https://facebook.com" },
    { icon: <TwitterIcon />, href: "https://twitter.com" },
    { icon: <InstagramIcon />, href: "https://instagram.com" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" className="footer-logo">
              BookVerse
            </Typography>
            <Typography variant="body1" className="footer-description">
              Your personal book universe. Discover, organize, and share your literary journey.
            </Typography>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </Grid>
          
          {footerLinks.map((column) => (
            <Grid item xs={12} sm={4} md={2} key={column.title}>
              <Typography variant="h6" className="footer-column-title">
                {column.title}
              </Typography>
              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-column-title">
              Contact Us
            </Typography>
            <Typography variant="body1" className="contact-info">
              hello@bookverse.app
            </Typography>
            <Typography variant="body1" className="contact-info">
              123 Book Street, Library City
            </Typography>
            <Button
              variant="outlined"
              className="contact-button"
              href="mailto:hello@bookverse.app"
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
        
        <div className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} BookVerse. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;