import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer";
import Auth_Header from "../../../components/Auth_Header/Auth_Header";
import CocktailsFilters from "../../../components/CocktailsFilters/CocktailsFilters";
import Button from "../../../components/Button/Button";

const Main = () => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const footerRef = useRef(null);
  
  useEffect(() => {
	if (isFilterOpen) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'auto'
	}

	return () => {
		document.body.style.overflow = 'auto'
	};
  }, [isFilterOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 490);
    };

    const handleScroll = () => {
      if (footerRef.current && isMobile) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsButtonsVisible(footerTop > windowHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={styles.main_page}>
      <Auth_Header />
      <div className={styles.container}>
        {!isMobile && (
          <div className={styles.filters}>
            <CocktailsFilters />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.content__cards}>
            {[...Array(10)].map((_, i) => (
              <div key={i} className={styles.card}></div>
            ))}
            <Outlet />
          </div>
          <div className={styles.content__button}>
            <Button title={"Показать еще коктейли"} className={styles.content__button__add} />
          </div>
          {isMobile && (
            <>
              <div className={`${styles.content__mobile} ${!isButtonsVisible ? styles.hidden : ""}`}>
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
                  <CocktailsFilters isMobile={true} onClose={toggleFilter} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div ref={footerRef}>
        <Auth_Footer />
      </div>
    </div>
  );
};

export default Main;