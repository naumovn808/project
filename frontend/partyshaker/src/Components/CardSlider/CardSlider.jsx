import React, { useState } from 'react';
import slyles from './CardSlider.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function CardSlider ({onCardClick}) {
    const cards = [
        { id: 1, image: './cartImg1.png', title: 'Card 1' },
        { id: 2, image: './cartImg2.png', title: 'Card 2' },
        { id: 3, image: './cartImg3.png', title: 'Card 3' },

    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Slider {...settings}>
                {cards.map(card => (
                    <div key={card.id} onClick={() => onCardClick(card)}>
                        <img src={card.image} alt={card.title} />
                        
                    </div>
                ))}
            </Slider>

         </> )



    
}

export default CardSlider;