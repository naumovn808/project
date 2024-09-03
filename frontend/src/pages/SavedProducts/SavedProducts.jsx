import React, { useState, useEffect } from "react";
import styles from "./SavedProducts.module.css";
import Auth_Header from "../../components/Auth_Header/Auth_Header";
import Auth_Footer from "../../components/Auth_Footer/Auth_Footer";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const SavedProducts = () => {
    const [savedCocktails, setSavedCocktails] = useState([]);

    useEffect(() => {
        // Загрузка сохранённых коктейлей из локального хранилища или API
        const savedItems = JSON.parse(localStorage.getItem("savedCocktails")) || [];
        setSavedCocktails(savedItems);
    }, []);

    return (
        <div className={styles.savedProducts}>
            <Auth_Header />
            <div className={styles.content}>
                <h2>Избранные товары</h2>
                <div className={styles.savedProducts_list}>
                    {savedCocktails.length > 0 ? (
                        savedCocktails.map((cocktail, index) => (
                            <CocktailCard
                                key={index}
                                name={cocktail.name}
                                description={cocktail.description}
                                rating={cocktail.rating}
                                images={cocktail.images}
                                tags={cocktail.tags}
                            />
                        ))
                    ) : (
                        <p className={styles.empty}>Нет сохранённых товаров.</p>
                    )}
                </div>
            </div>
            <Auth_Footer />
        </div>
    );
};

export default SavedProducts;

