import styles from './ProductCart.module.css';
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import { Slider } from '../Slider/Slider';
import slides from './mock.json'
// import { Link } from "react-router-dom"; 


function ProductCart({}) {

    return (
        <>
        <div className={styles['frame']}>
<Slider  slides={slides}/>
{/* <Swiper
spaceBetween={50}
slidesPerView ={1}
onSlideChange={()=> console.log('slide change')}    
// onSwiper={(swiper) = console.log(swiper) }
>
                    <SwiperSlide><img className={styles['frame-img']} src='./cartImg1.png'></img>
                </SwiperSlide>
                    <SwiperSlide><img className={styles['frame-img']} src='./cartImg2.png'></img>
                </SwiperSlide>
                    <SwiperSlide><img className={styles['frame-img']} src='./cartImg3.png'></img>
                </SwiperSlide>
</Swiper> */}








                {/* <img className={styles['frame-img']}  src ='./cartImg1.png'></img> */}
                
                <button className={styles['frame-button']}> <img src="./icons/iconBtn.svg" alt="" /></button>


                <div className={styles['bottom']}>
                    <div className={styles['bottom-frame']}>
                        <h3 className={styles['bottom-title']} >Апероллини</h3>
                    
                        <p className={styles['bottom-text']}> Сладкий</p>
                        <div className={styles['bottom-icons']} >
                            <div className={styles['bottom-icon']} >
                            <img src="./icons/semiAlcogol.svg" alt="" />
                            <img src="./icons/iconShort.svg" alt="" />
                            <img src="./icons/mediumDift.svg" alt="" />
                            </div>
                            <div className={styles['bottom-reiting']}>
                            <span>4.2</span>
                                <img width='12px' height='12px' src="./icons/iconStar.svg" alt="" />
                        </div>
                        </div> 
                    </div>
                </div>
        
        
        </div>
       
        </>
    )
}

export default ProductCart; 