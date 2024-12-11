import React, { useState, useRef, memo, useEffect } from 'react';
import styles from './customSelectBordered.module.css';
import { useRefClickOutside } from '../../hooks/useRefClickOutside';
import { Select } from '../../icons';

const CustomSelectBordered = ({ options, defaultValue, additionalText, fontSize, textColor, callback }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Закрытие при клике вне компонента
  useRefClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (value) => {
    if(callback){
      callback(value)
    }
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={styles.custom_select}>
      <div
        className={`${styles.selected_value} ${fontSize || 'f16'} ${textColor || ''} fw400`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue} {additionalText || ''}
        <span className={`${styles.dropdown_arrow} ${isOpen ? styles.open : ''}`}>{Select}</span>
      </div>

      {isOpen && (
        <ul className={styles.dropdown_list} ref={dropdownRef}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.dropdown_item} ${option === selectedValue ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option} {additionalText || ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(CustomSelectBordered);
