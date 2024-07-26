import React, { useEffect } from "react";
import styles from "./CocktailsFilters.module.css";
import { useState } from "react";
import axios from "../../utils/axios";
import FilterButton from "../FilterButton/FilterButton";

const CocktailsFilters = () => {
	const [activeFilters, setActiveFilters] = useState({
		strength: null,
		format: null,
		complexity: null
	});

	const [strength, setStrength] = useState([]);
	const [sizeDrinks, setSizeDrinks] = useState([]);
  	const [complexity, setComplexity] = useState([]);
	const [entered, setEntered] = useState(true);

	const [checkBoxState, setCheckBoxState] = useState({
		isChecked: false,
		default: styles.square,
		checked: styles.square__checked,
	});

	useEffect(() => {
		const getDataFilters = async () => {
			try {
				const [strengthResponse, sizeDrinksResponse, complexityResponse] = await Promise.all([
					axios.get("strength"),
					axios.get("sizeDrinks"),
					axios.get("complexity"),
				]);
				setStrength(strengthResponse.data);
				setSizeDrinks(sizeDrinksResponse.data);
				setComplexity(complexityResponse.data);
			} catch (error) {
				console.error(error);
			}
		};
		getDataFilters();
	}, []);
	const handleFilterClick = (category, value) => {
		setActiveFilters(prev => ({
			...prev,
			[category]: prev[category] === value ? null : value
		}));
	};
	const filterCategories = [
		{ 
		  title: "Крепость", 
		  items: [
			{ title: "Безалкогольный", icon: "/Child.png" },
			{ title: "Слабоалкогольный", icon: "/Vector.png" },
			{ title: "Среднеалкогольный", icon: "/Medium.png" },
			{ title: "Крепкий", icon: "/Flame.png" }
		  ],
		  category: 'strength'
		},
		{ 
		  title: "Формат", 
		  items: [
			{ title: "Шот", icon: "/Shot.png" },
			{ title: "Шорт", icon: "/Short.png" },
			{ title: "Лонг", icon: "/Long.png" }
		  ],
		  category: 'format'
		},
		{ 
		  title: "Сложность", 
		  items: [
			{ title: "Легкий", icon: "/Easy.png" },
			{ title: "Средний", icon: "/MediumDif.png" },
			{ title: "Сложный", icon: "/Hard.png" }
		  ],
		  category: 'complexity'
		}
	  ];

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
			{filterCategories.map(({ title, items, category}) => (
				<div key={title} className={styles.filter}>
					<p className={styles.filter__text}>{title}</p>
					<div className={styles.filter_buttons}>
						{items.map((item) => (
							<FilterButton 
							key={item.title}
							label={item.title}
							icon={<img src={item.icon} alt={item.title} width={15} height={18} />}
							isActive={activeFilters[category] === item.title}
							onClick={() => handleFilterClick(category, item.title)}
							dataAttribute={`${category}-${item.title}`}
							/>
						))}
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
