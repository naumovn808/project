import React, { useEffect, useRef } from "react";
import styles from "./CocktailsFilters.module.css";
import { useState } from "react";
import axios from "../../utils/axios";
import FilterButton from "../FilterButton/FilterButton";
import InputWithTags from "../InputWithTags/InputWithTags";

const CocktailsFilters = () => {
	const [activeFilters, setActiveFilters] = useState({
		strength: [],
		format: [],
		complexity: []
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
		  [category]: prev[category].includes(value)
			? prev[category].filter(item => item !== value)
			: [...prev[category], value]
		}));
	  };
	const filterCategories = [
		{ 
		  title: "Крепость", 
		  items: [
			{ title: "Безалкогольный", icon: <img src="/Child.png" alt="Безалкогольный" width={15} height={18} /> },
			{ title: "Слабоалкогольный", icon: <img src="/Vector.png" alt="Слабоалкогольный" width={15} height={18} /> },
			{ title: "Среднеалкогольный", icon: <img src="/Medium.png" alt="Среднеалкогольный" width={15} height={18} /> },
			{ title: "Крепкий", icon: <img src="/Flame.png" alt="Крепкий" width={15} height={18} /> }
		  ],
		  category: 'strength'
		},
		{ 
		  title: "Формат", 
		  items: [
			{ title: "Шот", icon: <img src="/Shot.png" alt="Шот" width={15} height={18} /> },
			{ title: "Шорт", icon: <img src="/Short.png" alt="Шорт" width={15} height={18} /> },
			{ title: "Лонг", icon: <img src="/Long.png" alt="Лонг" width={15} height={18} /> }
		  ],
		  category: 'format'
		},
		{ 
		  title: "Сложность", 
		  items: [
			{ title: "Легкий", icon: <img src="/Easy.png" alt="Легкий" width={15} height={18} /> },
			{ title: "Средний", icon: <img src="/MediumDif.png" alt="Средний" width={15} height={18} /> },
			{ title: "Сложный", icon: <img src="/Hard.png" alt="Сложный" width={15} height={18} /> }
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

	const inputWithTagsRef = useRef();

const resetAllFilters = () => {
	setActiveFilters({
	strength: [],
	format: [],
	complexity: []
	});
	setSelectedFlavors([]);
	setCheckBoxState(prev => ({
	...prev,
	isChecked: false
	}));
	if (inputWithTagsRef.current) {
	inputWithTagsRef.current.resetTags();
	}
};

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
        {filterCategories.map(({ title, items, category }) => (
          <div key={title} className={styles.filter}>
            <p className={styles.filter__text}>{title}</p>
            <div className={styles.filter_buttons}>
              {items.map((item) => (
                <FilterButton 
                  key={item.title}
                  label={item.title}
                  icon={item.icon}
                  isActive={activeFilters[category].includes(item.title)}
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

			<InputWithTags ref={inputWithTagsRef} />

			<button onClick={resetAllFilters} className={styles.resetButton}>
				Сбросить Фильтры
			</button>
		</div>
	);
};

export default CocktailsFilters;
