import React, { useEffect, useState, useRef, act } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer";
import Auth_Header from "../../../components/Auth_Header/Auth_Header";
import CocktailsFilters from "../../../components/CocktailsFilters/CocktailsFilters";
import Button from "../../../components/Button/Button";
import CocktailCard from "../../../components/CocktailCard/CocktailCard";
import axios from "axios";

const Main = () => {
	const [isButtonsVisible, setIsButtonsVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [cocktails, setCocktails] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [activeFilters, setActiveFilters] = useState({});
	const inactivityTimeoutRef = useRef(null);

	useEffect(() => {
		if (isFilterOpen) {
			document.body.style.overflow = "hidden";
			setIsButtonsVisible(false);
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isFilterOpen]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 490);
		};

		// const handleScroll = () => {
		// 	if (footerRef.current && isMobile) {
		// 		const footerTop = footerRef.current.getBoundingClientRect().top;
		// 		const windowHeight = window.innerHeight;
		// 		setIsButtonsVisible(footerTop > windowHeight && !isFilterOpen);
		// 	}
		// };

		const resetInactivityTimeout = () => {
			if (isFilterOpen) return;
			setIsButtonsVisible(true);
			clearTimeout(inactivityTimeoutRef.current);
			inactivityTimeoutRef.current = setTimeout(() => {
				setIsButtonsVisible(false);
			}, 1200);
		};

		window.addEventListener("resize", handleResize);
		// window.addEventListener("scroll", handleScroll);
		document.addEventListener("mousemove", resetInactivityTimeout);
		document.addEventListener("touchstart", resetInactivityTimeout);
		document.addEventListener("touchmove", resetInactivityTimeout);

		handleResize();
		// handleScroll();
		resetInactivityTimeout();

		return () => {
			window.removeEventListener("resize", handleResize);
			// window.removeEventListener("scroll", handleScroll);
			document.removeEventListener("mousemove", resetInactivityTimeout);
			document.removeEventListener("touchstart", resetInactivityTimeout);
			document.removeEventListener("touchmove", resetInactivityTimeout);
			clearTimeout(inactivityTimeoutRef.current);
		};
	}, [isMobile, isFilterOpen]);

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};
	const fetchCocktails = async (filters = {}, page = 1) => {
		try {
			const response = await axios.post("http://localhost:1000/product", {
				...filters,
				page: page,
			});
			return response.data;
		} catch (error) {
			console.error("Error fetching cocktails:", error);
			return [];
		}
	};

	const handleApplyFilters = async (filters) => {
		setActiveFilters(filters);
		const newCocktails = await fetchCocktails(filters);
		setCocktails(newCocktails);
		setCurrentPage(1);
		setHasMore(newCocktails.length === 10);
	};

	const handleShowMore = async () => {
		const nextPage = currentPage + 1;
		const moreCocktails = await fetchCocktails(activeFilters, nextPage);
		if (moreCocktails > 0) {
			setCocktails(prevCocktails => [...prevCocktails, ...moreCocktails]);
			setCurrentPage(nextPage);
			setHasMore(moreCocktails.length === 10);
		} else {
			setHasMore(false);
		}
	};

	return (
		<div className={styles.main_page}>
		  <Auth_Header />
		  <div className={styles.container}>
			{!isMobile && (
			  <div className={styles.filters}>
				<CocktailsFilters onApplyFilters={handleApplyFilters} />
			  </div>
			)}
			<div className={styles.content}>
			  <div className={styles.content__cards}>
				{cocktails.map((cocktail, index) => (
				  <CocktailCard
					key={index}
					name={cocktail.name}
					description={cocktail.description}
					rating={cocktail.rating}
					images={cocktail.images}
					tags={cocktail.tags}
				  />
				))}
			  </div>
			  {hasMore && (
				<div className={styles.content__button}>
				  <Button 
					title={"Показать еще коктейли"} 
					className={styles.content__button__add} 
					onClick={handleShowMore}
				  />
				</div>
			  )}
			</div>
			{isMobile && (
			  <>
				<div
				  className={`${styles.content__mobile} ${
					!isButtonsVisible ? styles.hidden : styles.visible
				  }`}
				>
				  <div className={styles.content__mobile__buttons}>
					<button className={styles.button} onClick={toggleFilter}>
					  <img className={styles.button__img} src="./Filter.png" alt="filter" />
					</button>
					<button className={styles.button} onClick={() => window.scroll({ top: 0 })}>
					  <img className={styles.button__arrow} src="./ArrowTop.png" alt="Arrow" />
					</button>
				  </div>
				</div>
				{isFilterOpen && (
				  <div className={styles.mobileFilter}>
					<CocktailsFilters isMobile={true} onClose={toggleFilter} onApplyFilters={handleApplyFilters} />
				  </div>
				)}
			  </>
			)}
		  </div>
		  <Auth_Footer />
		</div>
	  );
	};

export default Main;
