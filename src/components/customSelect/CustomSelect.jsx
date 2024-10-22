import React, { useState, useRef } from 'react';
import styles from './customSelect.module.css'
import { useRefClickOutside } from '../../hooks/useRefClickOutside';
import { Select } from '../../icons';

const CustomSelect = ({ options, defaultValue, additionalText }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown to close it
  useRefClickOutside(dropdownRef, setIsOpen)

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.custom_select}>
      <div className={styles.selected_value + ' f16 fw400'} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue} {additionalText ? additionalText : ''}
        <span className={`${styles.dropdown_arrow} ${isOpen ? 'open' : ''}`}>{Select}</span>
      </div>

      {isOpen && (
        <ul className={styles.dropdown_list} ref={dropdownRef}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.dropdown_item} ${option === selectedValue ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option} {additionalText ? additionalText : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
