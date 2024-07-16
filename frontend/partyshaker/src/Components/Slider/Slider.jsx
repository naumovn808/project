import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Slider.module.css';
import { Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css';

import 'swiper/css/scrollbar';
import 'swiper/css/a11y';


import 'swiper/swiper-bundle.css';





export const Slider = ({slides}) => {
    return (
    <>     
    <Swiper 
    
                modules={[ Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}

 
    scrollbar={{draggable:true}}
        onSlideChange={() => console.log('slide change')}
    // onSwiper={(swiper) = console.log(swiper) }
    >

        {slides.map((slide) => (<SwiperSlide key={slide.image} ><img className={styles['frame-img']} src={slide.image} alt = {slide.title}/>
        </SwiperSlide>) )}
        
      
    </Swiper>
    </>)



    
}