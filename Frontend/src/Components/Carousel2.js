import React, { useState,useEffect } from 'react';
import slidesData from './SlidesData';
import "../Assets/Carousel2.css";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slidesData.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(timer); // Clean up on component unmount
  }, []);
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <img src={`../Image/${slide.imageUrl}`} alt={`Slide ${slide.id}`} className="slide-image" />
          <p className="slide-text">{slide.text}</p>
        </div>
      ))}
      <div className="slide-indicators">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
