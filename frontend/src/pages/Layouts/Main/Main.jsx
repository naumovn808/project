import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer";
import Auth_Header from "../../../components/Auth_Header/Auth_Header";
import CocktailsFilters from "../../../components/CocktailsFilters/CocktailsFilters";
import Button from "../../../components/Button/Button";

const Main = () => {
	return (
		<div className={styles.main_page}>
			<Auth_Header />
			<div className={styles.container}>
				<div className={styles.filters}>
					<CocktailsFilters />
				</div>
				<div className={styles.content}>
					<div className={styles.content__cards}>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<div className={styles.card}></div>
						<Outlet />
					</div>
					<div className={styles.content__button}>
						<Button title={"Показать еще коктейли"} className={styles.content__button__add} />
					</div>
				</div>
			</div>
			<Auth_Footer />
		</div>
	);
};

export default Main;
