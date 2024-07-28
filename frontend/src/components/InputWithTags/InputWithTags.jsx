import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from './InputWithTags.module.css'

const mockFilters = [
  "Водка", "Джин", "Ром", "Текила", "Виски",
  "Лед", "Лайм", "Лимон", "Апельсин", "Мята",
  "Сахарный сироп", "Содовая", "Тоник", "Кола"
];

const InputWithTags = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useImperativeHandle(ref, () => ({
    resetTags: () => {
      setTags([]);
      setInputValue('');
      setSuggestions([]);
      setNoResults(false);
    }
  }));

  const searchFilters = async (query) => {
    // Имитация запроса к бэкенду
    return mockFilters.filter(filter =>
      filter.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputValue) {
        const results = await searchFilters(inputValue);
        setSuggestions(results);
        setNoResults(results.length === 0);
      } else {
        setSuggestions([]);
        setNoResults(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue('');
    setSuggestions([]);
    setNoResults(false);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите фильтр"
          className={styles.input}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map(suggestion => (
            <li
              key={suggestion}
              onClick={() => addTag(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {noResults && (
        <div className={styles.noResults}>
          Такого нет
        </div>
      )}
      <div className={styles.tagsContainer}>
        {tags.map(tag => (
          <span key={tag} className={styles.tag}>
            {tag}
            <button onClick={() => removeTag(tag)} className={styles.removeTag}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
});

export default InputWithTags;