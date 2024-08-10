import React, { useEffect, useState } from "react";
import styles from "./Cocktail.module.css";
import Header from "../../components/Auth_Header/Auth_Header";
import Footer from "../../components/Auth_Footer/Auth_Footer";
import SocialButton from "../../components/SocialButton/SocialButton";

const obj = {
	name: "Лонг-Айленд",
	description:
		"Классический коктейль, обладающий своеобразным характером и многогранным вкусом. Сочетание различных спиртных напитков создает гармонию пряностей, сладости, кислотности и освежающих ноток. Он отлично подходит для тех, кто предпочитает насыщенные и энергичные напитки.",
	taste: "пряный, цитрусовый, сладкий, кислый",
	rating: "4,5",
	peoplsAssessments: 2967,
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

const imgParams = {
	strength: {
		безалкогольный: "Child.png",
		слабоалкогольный: "Vector.png",
		среднеалкогольный: "Medium.png",
		крепкий: "Flame.png",
	},
	format: {
		шот: "Shot.png",
		шорт: "Short.png",
		лонг: "Long.png",
	},
	difficult: {
		легко: "Easy.png",
		сложно: "Hard.png",
		"средняя сложность": "MediumDif.png",
	},
};

const Cocktail = () => {
	const [cocktailParams, setCocktailParams] = useState([]);
	const [cocktailData, setCocktailData] = useState(obj);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [fixedRating, setFixedRating] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isShareOpen, setIsShareOpen] = useState(false);
	const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [images, setImages] = useState(cocktailData && cocktailData.images ? Object.values(cocktailData.images) : []);
	const [currentUrl, setCurrentUrl] = useState(window.location.href);
	const [socialNetworks, setSocialNetworks] = useState([
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
			name: "X",
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
	]);
	const [defaultValues, setDefaultValues] = useState({
		"Белый Ром": 30,
		Водка: 30,
		"Серебряная текила": 30,
		"Cухой джин": 30,
		"Трипл сек": 30,
		"Сахарный сироп": 30,
		"Лимонный сок": 30,
		Кола: 100,
		Лимон: 40,
		"Лёд в кубиках": 300,
	});
	const [inputValue, setInputValue] = useState("");
	const [valuesIngredients, setValuesIngredients] = useState(defaultValues);
	const [activeButton, setActiveButton] = useState(1);
	const [isInputActive, setIsInputActive] = useState(false);
	const [defaultThings, setDefaultThings] = useState({
		Хайбол: 1,
		Джиггер: 1,
		"Коктейльная ложка": 1,
		"Пресс для цитрусовых": 1,
		Трубочки: 2,
	});
	const [recipeList, setRecipeList] = useState([
		"В шейкере со льдом соедините светлый ром, водку, текилу, джин, ликер, лимонный сок и сахарный сироп.",
		"Хорошо взболтайте все ингредиенты, чтобы они смешались.",
		"Наполните льдом высокий стакан или коллинз с прозрачными стенками.",
		"Процедите коктейль из шейкера в стакан через стрейнер, чтобы отделить лед, или просто растолките содержимое шейкера в стакан со льдом.",
		"Долейте колу в стакан до верха, оставив место для перемешивания.",
		"Перемешайте содержимое стакана для равномерного распределения и смешивания ингредиентов.",
		"Украсьте коктейль ломтиком лимона.",
	]);

	useEffect(() => {
		if (images) {
			const interval = setInterval(() => {
				setCurrentImageIndex((prev) => (prev + 1) % images.length);
			}, 4000);

			return () => clearInterval(interval);
		}
	}, [images]);

	useEffect(() => {
		if (cocktailData) {
			const lowerCaseStrength = cocktailData.strength.toLowerCase();
			const lowerCaseFormat = cocktailData.format.toLowerCase();
			const lowerCaseDifficult = cocktailData.difficult.toLowerCase();

			const strengthImage = Object.keys(imgParams.strength).find((key) => key.includes(lowerCaseStrength));
			const formatImage = Object.keys(imgParams.format).find((key) => key.includes(lowerCaseFormat));
			const difficultImage = Object.keys(imgParams.difficult).find((key) => key.includes(lowerCaseDifficult));

			setCocktailParams([
				{
					title: lowerCaseStrength,
					img: imgParams.strength[strengthImage],
				},
				{
					title: lowerCaseFormat,
					img: imgParams.format[formatImage],
				},
				{
					title: lowerCaseDifficult,
					img: imgParams.difficult[difficultImage],
				},
			]);
		}
	}, []);

	const handleImage = (i) => {
		setCurrentImageIndex(i);
	};

	const toggleShare = () => {
		setIsShareOpen(!isShareOpen);
	};

	const handleSaved = () => {
		setIsSaved(!isSaved);
	};

	const handleMouseEnter = (rating) => {
		setHoveredRating(rating);
	};

	const handleMouseLeave = () => {
		setHoveredRating(0);
	};

	const handleRating = (rating) => {
		setFixedRating(rating);
	};

	const toggleDesc = () => {
		setIsDescriptionOpen(!isDescriptionOpen);
	};

	const getStarSrc = (index) => {
		if (fixedRating !== null) {
			return index <= fixedRating ? "silverStar.png" : "emptStar.png";
		} else if (index <= hoveredRating) {
			return "silverStar.png";
		} else {
			return "emptStar.png";
		}
	};

	const handleIngredientClick = (value) => {
		setActiveButton(value);
		setIsInputActive(false);

		const newValues = {};
		for (const key in defaultValues) {
			newValues[key] = defaultValues[key] * value;
		}
		setValuesIngredients(newValues);
	};

	const handleIngredientChange = (e) => {
		const value = e.target.value.replace(/\D/g, "");
		if (value === "" || (parseInt(value, 10) > 0 && parseInt(value, 10) <= 100)) {
			setInputValue(value);
			const currentValue = parseInt(value, 10);
			if (!isNaN(currentValue) && currentValue >= 1 && currentValue <= 100) {
				const newValues = {};
				for (const key in defaultValues) {
					newValues[key] = defaultValues[key] * currentValue;
				}
				setValuesIngredients(newValues);
			} else {
				setValuesIngredients(defaultValues);
			}
		}
	};

	const handleIngredientFocus = () => {
		setActiveButton(null);
		setIsInputActive(true);
	};

	const formatValue = (key, value) => {
		const format = value >= 1000 ? (value / 1000).toFixed(1) : value.toString();
		const unit =
			key === "Лимон" || key === "Лёд в кубиках" ? (value >= 1000 ? " кг" : " г") : value >= 1000 ? " л" : " мл";
		return format.endsWith(".0") ? `${Math.floor(format)}${unit}` : `${format}${unit}`;
	};

	if (cocktailData) {
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
							<button
								className={`${styles.save__button} ${isSaved ? styles.saved : ""}`}
								onClick={handleSaved}
							>
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
						<div className={styles.information__cocktail}>
							<h1 className={styles.title}>{cocktailData.name}</h1>
							<div className={styles.stars}>
								<div className={styles.rating}>
									<p className={styles.rating__float}>{cocktailData.rating}</p>
									{parseInt(cocktailData.rating) >= 4 ? (
										<img className={styles.rating__star} src="goldStar.png" alt="goldStar" />
									) : (
										<img className={styles.rating__star} src="silverStar.png" alt="silverStar" />
									)}
									<p className={styles.peoples__assessments}>
										{cocktailData.peoplsAssessments} оценок
									</p>
								</div>
								<div className={styles.rating__set}>
									<span className={styles.peoples__assessments__set}>Ваша оценка:</span>
									<div className={styles.rating__set__stars}>
										{[1, 2, 3, 4, 5].map((index) => (
											<img
												key={index}
												className={styles.rating__star}
												src={getStarSrc(index)}
												alt="error"
												onMouseEnter={() => handleMouseEnter(index)}
												onMouseLeave={handleMouseLeave}
												onClick={() => handleRating(index)}
											/>
										))}
									</div>
								</div>
							</div>

							<div className={styles.description}>
								<p className={`${styles.description__text} ${isDescriptionOpen ? styles.open : ""}`}>
									{cocktailData.description}
								</p>
								<button onClick={toggleDesc} className={styles.share__button}>
									{!isDescriptionOpen ? (
										<span>Показать полное описание</span>
									) : (
										<span>Свернуть описание</span>
									)}
									<span className={`${styles.arrow} ${isDescriptionOpen ? styles.rotate : ""}`}>
										<img className={styles.arrow__img} src="ArrowTop.png" alt="arrow" />
									</span>
								</button>
							</div>

							<div className={styles.tastes}>
								<span>
									<b>Вкусы: </b> {cocktailData.taste}
								</span>
							</div>

							<div className={styles.cocktail__params}>
								{cocktailParams.map((item, i) => (
									<div key={i}>
										<SocialButton
											text={item.title}
											iconSrc={item.img}
											padding={5}
											borderRadius={12}
											backgroundColor={"#48455f"}
										/>
									</div>
								))}
							</div>
						</div>

						<div className={styles.workplace}>
							<div className={styles.ingredients}>
								<h3 className={styles.ingredients__title}>Ингредиенты</h3>
								<div className={styles.ingredients__click}>
									<p className={styles.ingredients__click__text}>Количество порций</p>
									<div className={styles.ingredients__click__buttons}>
										<button
											className={activeButton === 1 ? styles.active : ""}
											onClick={() => handleIngredientClick(1)}
										>
											1
										</button>
										<button
											className={activeButton === 2 ? styles.active : ""}
											onClick={() => handleIngredientClick(2)}
										>
											2
										</button>
										<button
											className={activeButton === 3 ? styles.active : ""}
											onClick={() => handleIngredientClick(3)}
										>
											3
										</button>
										<button
											className={activeButton === 4 ? styles.active : ""}
											onClick={() => handleIngredientClick(4)}
										>
											4
										</button>
										<button
											className={activeButton === 5 ? styles.active : ""}
											onClick={() => handleIngredientClick(5)}
										>
											5
										</button>
										<input
											type="text"
											placeholder="10"
											value={inputValue}
											onChange={handleIngredientChange}
											onFocus={handleIngredientFocus}
											className={isInputActive ? styles.active : ""}
										/>
									</div>
								</div>
								<div className={styles.ingredients__values}>
									{Object.keys(valuesIngredients).map((ingredient, index) => (
										<div key={index} className={styles.ingredients__values__text}>
											<p>{ingredient}</p>
											<span></span>
											<b>{formatValue(ingredient, valuesIngredients[ingredient])}</b>
										</div>
									))}
								</div>
							</div>
							<div className={styles.for__cooking}>
								<h3 className={styles.ingredients__title}>Для приготовления</h3>
								<div className={styles.ingredients__values}>
									{Object.entries(defaultThings).map(([key, value], index) => (
										<div key={index} className={styles.ingredients__values__text}>
											<p>{key}</p>
											<span></span>
											<b>{value} шт.</b>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className={styles.recipe}>
							<h4 className={styles.ingredients__title}>Рецепт</h4>
							<div className={styles.recipe__list}>
								{recipeList.map((valeu, index) => (
									<div key={index} className={styles.recipe__list__item}>
										<span>{index + 1} /</span>
										<p className={styles.list__item}>{valeu}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	} else {
		return <>Ошибка</>;
	}
};

export default Cocktail;
