import React, { useEffect } from "react";
import styles from "./CocktailsFilters.module.css";
import { useState } from "react";
import axios from "../../utils/axios";

const CocktailsFilters = () => {
	const [entered, setEntered] = useState(true);
	const [strength, setStrength] = useState([
		{
			img: "Apple.png",
			title: "Безалкогольный",
		},
		{
			img: "Apple.png",
			title: "Слабоалкогольный",
		},
		{
			img: "Apple.png",
			title: "Среднеалкогольный",
		},
		{
			img: "Apple.png",
			title: "Крепкий",
		},
	]);

	const [sizeDrinks, setSizeDrinks] = useState([
		{
			img: "VK.png",
			title: "Шот",
		},
		{
			img: "VK.png",
			title: "Шорт",
		},
		{
			img: "VK.png",
			title: "Лонг",
		},
	]);

	const [complexity, setComplexity] = useState([
		{
			img: "Google.png",
			title: "Легко",
		},
		{
			img: "Google.png",
			title: "Средняя сложность",
		},
		{
			img: "Google.png",
			title: "Сложно",
		},
	]);

	const [checkBoxState, setCheckBoxState] = useState({
		isChecked: false,
		default: styles.square,
		checked: styles.square__checked,
	});

	useEffect(() => {
		const getDataFilters = async () => {
			try {
				const [strengthResponse, sizeDrinksResponse, complexityResponse] = await Promise.all([
					// axios.get("strength"),
					// axios.get("sizeDrinks"),
					// axios.get("complexity"),
				]);
				// setStrength(strengthResponse.data);
				// setSizeDrinks(sizeDrinksResponse.data);
				// setComplexity(complexityResponse.data);
			} catch (error) {
				console.error(error);
			}
		};
		getDataFilters();
	}, []);

	const handleCheckbox = () => {
		setCheckBoxState((prev) => ({
			...prev,
			isChecked: !prev.isChecked,
		}));
	};
	const [flavors, setFlavors] = useState([
		"Горький", "Сладкий", "Фруктовый", "Мятный"
	]);
	const [selectedFlavors, setSelectedFlavors] = useState([]);
	const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);

	useEffect(() => {
		const getDataFilters = async () => {
			try {
				const [strengthResponse, sizeDrinksResponse, complexityResponse, flavorsResponse] = await Promise.all([
		// axios.get("strength"),
        // axios.get("sizeDrinks"),
        // axios.get("complexity"),
        // axios.get("flavors"),
				]);
		// setStrength(strengthResponse.data);
        // setSizeDrinks(sizeDrinksResponse.data);
        // setComplexity(complexityResponse.data);
        // setFlavors(flavorsResponse.data);
			} catch (error) {
				console.error(error)
			}
		};
		getDataFilters();
	}, []);

	const toggleFlavorDropdown = () => {
		setIsFlavorDropdownOpen(!isFlavorDropdownOpen);
	};

	const handleFlavorSelect = (flavor) => {
		setSelectedFlavors(prev =>
			prev.includes(flavor)
			? prev.filter(f => f !== flavor)
			: [...prev, flavor]
		);
	};
	const removeFlavor = (flavor) => {
		setSelectedFlavors(prev => prev.filter(f => f !== flavor));
	}

	return (
		<div className={styles.container}>
			{/* Checkbox */}
			{entered ? (
				<div className={styles.checkBox}>
					<div
						className={checkBoxState.isChecked ? checkBoxState.checked : checkBoxState.default}
						onClick={handleCheckbox}
					>
						{checkBoxState.isChecked ? "✔" : ""}
					</div>
					<p className={styles.checkBox__text}>Только сохраненные</p>
				</div>
			) : (
				<div className={styles.checkBox}>
					<div className={styles.square__entered}></div>
					<p className={styles.checkBox__textNot}>Только сохраненные</p>
				</div>
			)}

			{/* Search Filtres*/}
			<div className={styles.filtres}>
				{[
					{ title: "Крепость", items: strength },
					{ title: "Формат", items: sizeDrinks },
					{ title: "Сложность", items: complexity },
				].map(({ title, items }) => (
					<div key={title} className={styles.filter}>
						<p className={styles.filter__text}>{title}</p>
						<div className={styles.filter__buttons}>
							{items.map((item) => {
								return (
									<div key={item.title}>
										<button className={styles.button__filter}>
											<img src={item.img} alt="item" width={15} height={18} />
											{item.title}
										</button>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>

			<div className={styles.flavorSelector}>
        <button onClick={toggleFlavorDropdown} className={styles.flavorButton}>
          {selectedFlavors.length > 0 ? `${selectedFlavors.length} вкуса` : '4 вкуса'}
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        {isFlavorDropdownOpen && (
          <div className={styles.flavorDropdown}>
            {flavors.map(flavor => (
              <div 
                key={flavor} 
                className={`${styles.flavorOption} ${selectedFlavors.includes(flavor) ? styles.selected : ''}`}
                onClick={() => handleFlavorSelect(flavor)}
              >
                {flavor}
                {selectedFlavors.includes(flavor) && <span className={styles.checkmark}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
			<div className={styles.selectedFlavorsContainer}>
				{selectedFlavors.map(flavor => (
					<div key={flavor} className={styles.selectedFlavor}>
						{flavor}
						<button onClick={() => removeFlavor(flavor)} className={styles.removeFlavor}>
            			  ×
            			</button>
					</div>
				))}
			</div>

			{/* Search Filter Input */}
		</div>
	);
};

export default CocktailsFilters;
