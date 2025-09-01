import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Discover', href: '#discover' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'API Docs', href: '/api-docs' }
  ];

  return (
    <>
      <AppBar position="fixed" className="header" elevation={0}>
        <Toolbar>
          <Typography variant="h4" component="div" className="logo">
            BookVerse
          </Typography>
          <div className="nav-desktop">
            {navItems.map((item) => (
              <Button key={item.name} href={item.href} className="nav-link">
                {item.name}
              </Button>
            ))}
            <Button variant="contained" className="cta-button">
              Get Started
            </Button>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="mobile-drawer"
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.name} component="a" href={item.href}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem>
            <Button variant="contained" fullWidth className="cta-button">
              Get Started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;