import React, { useEffect, useState } from "react";
import styles from "./Cocktail.module.css";
import Header from "../../components/Auth_Header/Auth_Header";
import Footer from "../../components/Auth_Footer/Auth_Footer";

const obj = {
	name: "Лонг-Айленд",
	description:
		"Классический коктейль, обладающий своеобразным характером и многогранным вкусом. Сочетание различных спиртных напитков создает гармонию пряностей, сладости, кислотности и освежающих ноток. Он отлично подходит для тех, кто предпочитает насыщенные и энергичные напитки.",
	taste: "пряный",
	strength: "Крепкий",
	format: "Лонг",
	difficult: "Средняя сложность",
	images: {
		1: "Cocktail.png",
		2: "Cocktail2.png",
		3: "Cocktail3.png",
		4: "Cocktail4.png",
		5: "Cocktail5.png",
		6: "Cocktail6.png",
		7: "Cocktail7.png",
	},
};

const Cocktail = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isShareOpen, setIsShareOpen] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const images = Object.values(obj.images);
	const currentUrl = window.location.href;
	const socialNetworks = [
		{
			name: "ВКонтакте",
			icon: "VK.png",
			url: `https://vk.com/share.php?url=${currentUrl}`,
		},
		{
			name: "Одноклассники",
			icon: "OK.png",
			url: `https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st.su=${currentUrl}`,
		},
		{
			name: "Instagram",
			icon: "Instagram.png",
			url: `https://www.instagram.com/share?url=${currentUrl}`,
		},
		{
			name: "Facebook",
			icon: "Facebook.png",
			url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
		},
		{
			name: "Twitter",
			icon: "X.png",
			url: `https://X.com/intent/tweet?url=${currentUrl}`,
		},
		{
			name: "Мой Мир",
			icon: "MyMir.png",
			url: `https://my.mail.ru/share/0/?url=${currentUrl}`,
		},
		{
			name: "Telegram",
			icon: "Telegram.png",
			url: `https://t.me/share/url?url=${currentUrl}`,
		},
		{
			name: "WhatsApp",
			icon: "WhatsApp.png",
			url: `https://api.whatsapp.com/send?text=${currentUrl}`,
		},
		{
			name: "Viber",
			icon: "Viber.png",
			url: `viber://forward?text=${currentUrl}`,
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % images.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [images.length]);

	const handleImage = (i) => {
		setCurrentImageIndex(i);
	};

	const toggleShare = () => {
		setIsShareOpen(!isShareOpen);
	};

	const handleSaved = () => {
		setIsSaved(!isSaved);
	};

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.content}>
				<div className={styles.left__side}>
					<div className={styles.images__container}>
						<div className={styles.images}>
							{images.length > 1 &&
								images.map((value, i) => (
									<div
										key={i}
										className={`${styles.image__container} ${
											i === currentImageIndex ? styles.active : ""
										}`}
										onClick={() => handleImage(i)}
									>
										<img className={styles.gallery__img} src={value} alt="error" />
									</div>
								))}
						</div>
						<div className={styles.main__image__container}>
							<img
								className={styles.main__image}
								src={
									images[currentImageIndex] === undefined
										? "PartyshakerCocktail.png"
										: images[currentImageIndex]
								}
								alt="error"
							/>
						</div>
					</div>

					<div className={styles.add__save}>
						<button className={`${styles.save__button} ${isSaved ? styles.saved : ""}`} onClick={handleSaved}>
							<img src={isSaved ? "Nosaved.png" : "Saved.png"} alt="error" />
							{isSaved ? "Убрать из сохраненного" : "Добавить в сохраненное"}
						</button>
					</div>

					<div className={styles.share}>
						<button
							onClick={toggleShare}
							className={`${styles.share__button} ${isShareOpen ? styles.open : ""}`}
						>
							<img src="share.png" alt="share" className={styles.share__img} />
							Поделиться
							<span className={`${styles.arrow} ${isShareOpen ? styles.rotate : ""}`}>
								<img className={styles.arrow__img} src="ArrowTop.png" alt="arrow" />
							</span>
						</button>
						<div className={`${styles.share__menu} ${isShareOpen ? styles.open : ""}`}>
							{socialNetworks.map((network, index) => (
								<button
									key={index}
									className={styles.share__menu__button}
									onClick={() => window.open(network.url, "_blank")}
								>
									<img src={network.icon} alt={network.name} /> <span>{network.name}</span>
								</button>
							))}
						</div>
					</div>
				</div>

				<div className={styles.right__side}>
					<h1 className={styles.title}>{obj.name}</h1>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Cocktail;
