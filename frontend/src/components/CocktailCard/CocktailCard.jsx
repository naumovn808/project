import React, { useState, useEffect, useCallback } from 'react';
import styles from './CocktailCard.module.css';

const CocktailCard = ({ name, description, rating, images, tags }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  
  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);
    return () => clearInterval(intervalId);
  }, [nextImage]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={images[currentImageIndex]} alt={name} className={styles.image} />
        <button className={styles.actionButton}>
         <img src="/Saved.png" alt="" sizes='20' />
        </button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.sliderContainer}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.sliderIndicator} ${currentImageIndex === index ? styles.active : ''}`}
              style={{ width: `${100 / Math.min(images.length, 7)}%`, maxWidth: '50px' }}
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