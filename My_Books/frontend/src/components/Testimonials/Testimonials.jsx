import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Typography, Avatar, Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.scss';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Avid Reader",
    content: "This app has completely transformed how I organize my book collection. I can finally keep track of all my reads!",
    avatar: "/avatars/1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Book Club Organizer",
    content: "The sharing features make it so easy to recommend books to my club members. Our reading experience has improved dramatically.",
    avatar: "/avatars/2.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Librarian",
    content: "As a professional, I appreciate the detailed cataloging options. It's like having a personal library management system.",
    avatar: "/avatars/3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <Typography variant="h2" className="section-title">
        What Readers Say
      </Typography>
      <Typography variant="subtitle1" className="section-subtitle">
        Join thousands of happy book lovers
      </Typography>

      <div className="testimonials-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <Box className="testimonial-content">
                  <Typography variant="body1" className="testimonial-text">
                    "{testimonial.content}"
                  </Typography>
                </Box>
                <Box className="testimonial-author">
                  <Avatar src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                  <Box>
                    <Typography variant="subtitle1" className="author-name">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" className="author-role">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;