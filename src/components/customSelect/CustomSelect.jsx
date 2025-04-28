import React, { useState, useRef, memo, useEffect } from 'react';
import styles from './customSelect.module.css'
import { useRefClickOutside } from '../../hooks/useRefClickOutside';
import { Select } from '../../icons';

const CustomSelect = ({ field, options, defaultValue, additionalText, fontSize, textColor, callBack }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown to close it
  useRefClickOutside(dropdownRef, setIsOpen)

  const handleSelect = (value) => {
    if (callBack) {
      callBack(field, value)
    }
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue])
  return (
    <div className={styles.custom_select}>
      <div style={{display: "flex", alignItems: "center"}} className={styles.selected_value + fontSize ? fontSize : 'f16' + textColor ? textColor : '' + ' fw400'} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.selectText} robotoFont ${styles.truncate}`}>{selectedValue} {additionalText ? additionalText : ''}</span>
        {
          options.length 
          ?
          <span className={`${styles.dropdown_arrow} ${isOpen ? 'open' : ''} flex a-center`}>{Select}</span>
          :
          <></>
        }
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

export default memo(CustomSelect);
