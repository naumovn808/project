import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CocktailCard.module.css';

const CocktailCard = ({ id, name, description, rating, images, tags }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(nextImage, 3000);
  }, [nextImage]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer, currentImageIndex]);

  const handleSliderClick = (index) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true);
      setCurrentImageIndex(index);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleCardClick = () => {
    navigate(`/cocktail/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img
          src={images[currentImageIndex]}
          alt={name}
          className={`${styles.image} ${isTransitioning ? styles.fadeTransition : ''}`}
          onTransitionEnd={handleTransitionEnd}
        />
        <button className={styles.actionButton}>
          <img src="./Saved.png" alt="" />
        </button>
      </div>
      <div className={styles.contentWrapper}>
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