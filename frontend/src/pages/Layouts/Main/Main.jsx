import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer";
import Auth_Header from "../../../components/Auth_Header/Auth_Header";
import CocktailsFilters from "../../../components/CocktailsFilters/CocktailsFilters";
import Button from "../../../components/Button/Button";

const Main = () => {
	const [isButtonsVisible, setIsButtonsVisible] = useState(true);
	const footerRef = useRef(null);

	// mobile buttons
	useEffect(() => {
		const handleScroll = () => {
			if (footerRef.current) {
				const footerTop = footerRef.current.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;
				setIsButtonsVisible(footerTop > windowHeight);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={styles.main_page}>
			<Auth_Header />
			<div className={styles.container}>
				<div className={styles.filters}>
					<CocktailsFilters />
				</div>

				<div className={styles.content}>
					<div className={styles.content__cards}>
						{[...Array(10)].map((o, i) => (
							<div key={i} className={styles.card}></div>
						))}
						<Outlet />
					</div>

					<div className={styles.content__button}>
						<Button title={"Показать еще коктейли"} className={styles.content__button__add} />
					</div>

					{/* mobile */}
					<div className={`${styles.content__mobile} ${!isButtonsVisible ? styles.hidden : ""}`}>
						<div className={styles.content__mobile__buttons}>
							<button className={styles.button}>
								<img className={styles.button__img} src="./Filter.png" alt="filter" />
							</button>
							<button className={styles.button} onClick={() => window.scroll({ top: 0 })}>
								<img className={styles.button__arrow} src="./ArrowTop.png" alt="Arrow" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div ref={footerRef}>
				<Auth_Footer />
			</div>
		</div>
	);
};

export default Main;