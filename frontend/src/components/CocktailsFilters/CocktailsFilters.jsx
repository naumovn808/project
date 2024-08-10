import React, { useEffect, useRef, useState } from "react";
import styles from "./CocktailsFilters.module.css";
import axios from "../../utils/axios";
import FilterButton from "../FilterButton/FilterButton";
import InputWithTags from "../InputWithTags/InputWithTags";
import Pagination from "../Pagination/Pagination";

const CocktailsFilters = ({ isMobile, onClose }) => {
  const [activeFilters, setActiveFilters] = useState({
    strength: [],
    format: [],
    complexity: []
  });

  const [ingredients, setIngredients] = useState([]);

  const [strength, setStrength] = useState([]);
  const [sizeDrinks, setSizeDrinks] = useState([]);
  const [complexity, setComplexity] = useState([]);
  const [entered, setEntered] = useState(true);

  const [checkBoxState, setCheckBoxState] = useState({
    isChecked: false,
    default: styles.square,
    checked: styles.square__checked,
  });

  const [flavors, setFlavors] = useState([
    "Горький", "Сладкий", "Фруктовый", "Мятный"
  ]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(28);

  const inputWithTagsRef = useRef();

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

  const applyFilters = async () => {
    const filterData = {
      name: [],   
      description: selectedFlavors, 
      taste: ingredients, 
      difficult: activeFilters.complexity,
      strength: activeFilters.strength,
      format: activeFilters.format,
      chosens: checkBoxState.isChecked
    };


    try {
      const response = await axios.post("http://localhost:1000/product", filterData);
      console.log("Filters have been successfully submitted:", response.data);
    } catch (error) {
      console.error("Error when sending filters:", error);
    }
  };

  const handleIngredientChange = (newIngredients) => {
    setIngredients(newIngredients);
  };  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFlavorDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleCheckbox = () => {
    setCheckBoxState((prev) => ({
      ...prev,
      isChecked: !prev.isChecked,
    }));
  };

  const toggleFlavorDropdown = () => {
    setIsFlavorDropdownOpen(!isFlavorDropdownOpen);
  };

  const closeFlavorDropdown = () => {
    setIsFlavorDropdownOpen(false);
  };

  const handleFlavorSelect = (flavor) => {
    setSelectedFlavors(prev => {
      const newFlavors = prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor];
      
      if (newFlavors.length === 4) {
        setIsFlavorDropdownOpen(false);
      }
      
      return newFlavors;
    });
  };

  const removeFlavor = (flavor) => {
    setSelectedFlavors(prev => prev.filter(f => f !== flavor));
  }

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // fetchDataForPage(pageNumber)
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

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobileContainer : ''}`}>
      {isMobile && (
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileTitle}>Фильтр</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
      )}
      
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

      {/* Search Filters */}
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

      {/* Flavor Selector */}
      <div className={styles.flavorSelector} ref={dropdownRef}>
        <div className={styles.flavorSelectorHeader}>
          <button onClick={toggleFlavorDropdown} className={styles.flavorButton}>
            {selectedFlavors.length > 0 ? `${selectedFlavors.length} вкуса` : '4 вкуса'}
            <span className={`${styles.dropdownArrow} ${isFlavorDropdownOpen ? styles.dropdownArrowUp : ''}`}>▼</span>
          </button>
          {isFlavorDropdownOpen && (
            <button onClick={closeFlavorDropdown} className={styles.closeButton}>
              ×
            </button>
          )}
        </div>
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

      {/* Selected Flavors */}
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

      {/* Input With Tags */}
      <InputWithTags ref={inputWithTagsRef} onChange={handleIngredientChange} />
        {/* Reset Filters и Apply Button для мобильной версии */}
        {isMobile ? (
        <>
          <button onClick={resetAllFilters} className={styles.resetButton}>
            Сбросить фильтры
          </button>
          <button className={styles.applyButton} onClick={() => {
            applyFilters();
            onClose();
          }}>
            Применить
          </button>
        </>
      ) : (
        <>
          <button onClick={resetAllFilters} className={styles.resetButton}>
            Сбросить фильтры
          </button>
          <button onClick={scrollToTop} className={styles.scrollTopButton}>
            <span className={styles.scrollTopIcon}>^</span>
            Наверх
          </button>
          <button className={styles.applyButton} onClick={applyFilters}>
            Применить
          </button>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              applyFilters();
            }}
          />
        </>
      )}
    </div>
  );
};

export default CocktailsFilters;