import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import styles from './AdvertisingBanner.module.css'
const AdvertisingBanner = ({ sort, name, description, imgSrc }) => {
	return (
		<>
			<Swiper
				className={styles.banner}
				spaceBetween={50}
				slidesPerView={1}
				loop='true'>
				<SwiperSlide className={styles.slide}>
					<div className={styles.backgroundLeft}>
						<img
							src='AdvertisePicture/Background_Cart-Left.png'
							alt='background'
						/>
					</div>
					<div className={styles.backgroundRight}>
						<img
							src='AdvertisePicture/Background_Cart-Right.png'
							alt='background'
						/>
					</div>
					<div className={styles.content}>
						<h2 className={styles.title}>
							<span>{sort}</span> <span className={styles.name}>{name}</span>
						</h2>
						<p className={styles.description}>{description}</p>
						<a href=''>
							<button className={styles.button}>
								Показать коктейли с {name}
							</button>
						</a>
					</div>
					<div className={styles.image}>
						<img src={imgSrc} alt={name} />
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	)
}

export default AdvertisingBanner
