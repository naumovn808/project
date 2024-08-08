import React from 'react';
import styles from './TrumbnailSlider.module.css';


const ThumbnailSlider = ({ cards, onCardClick }) => {
 
    
    return (
        <div className={styles['thumbnail-slider']}>
            {cards.map(card => (
                <div key={card.id} className={styles['thumbnail']}  onClick={() => onCardClick(card)}>
                    <img src={card.image} alt={card.title} />
                </div>
            ))}
        </div>
    );
};

export default ThumbnailSlider;