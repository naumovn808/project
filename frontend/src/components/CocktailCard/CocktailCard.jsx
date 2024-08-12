import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './CocktailCard.module.css';

const CocktailCard = ({ id, name, description, rating, images, tags }) => {
  const [swiper, setSwiper] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const handleCardClick = async () => {
    try {
      const response = await fetch(`http://localhost:1000/product/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const productData = await response.json();
      navigate(`/cocktail/${id}`, { state: { productData } });
    } catch (error) {
      console.error('Error fetching product data', error);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentImageIndex(swiper.realIndex);
    resetAutoplayTimer();
  };

  const nextSlide = () => {
    if (swiper) {
      if (currentImageIndex === images.length - 1) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }
  };

  const handleSliderClick = (index) => {
    if (swiper && index !== currentImageIndex) {
      swiper.slideTo(index);
    }
  };

  const resetAutoplayTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(nextSlide, 3000);
  };

  useEffect(() => {
    if (swiper) {
      resetAutoplayTimer();
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [swiper, images.length]);

  return (
    <div className={styles.card}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        className={styles.imageContainer}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={name} className={styles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.contentWrapper} onClick={handleCardClick}>
        <div className={styles.sliderContainer}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.sliderIndicator} ${currentImageIndex === index ? styles.active : ''}`}
              style={{ width: `${100 / Math.min(images.length, 7)}%`, maxWidth: '50px' }}
              onClick={(e) => {
                e.stopPropagation();
                handleSliderClick(index);
              }}
            />
          ))}
        </div>
        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.footer}>
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <img key={index} src={tag.icon} alt={tag.name} className={styles.tagIcon} />
              ))}
            </div>
            <div className={styles.rating}>
              <span>{rating}</span>
              <span className={styles.star}>★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;