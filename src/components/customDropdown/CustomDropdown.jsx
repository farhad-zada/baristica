import React, { useState, useEffect, useRef } from 'react';
import styles from './customDropdown.module.css';
import { Down } from '../../icons';

const CustomDropdown = ({ label, options, onSelectionChange, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionChange = (option) => {
        const isSelected = selectedOptions.some((item) => item.value === option.value);
        const newSelectedOptions = isSelected
            ? selectedOptions.filter((item) => item.value !== option.value)
            : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);

        // Call the onSelectionChange callback to pass the selected options to the parent component
        if (onSelectionChange) {
            onSelectionChange(newSelectedOptions,type);
        }
    };

    const selectedText = selectedOptions.length > 0
        ? `${label}: ` + selectedOptions.map(option => option.text).join(', ')
        : label;

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={selectedOptions.length ? styles.headerSelected : styles.header} onClick={toggleDropdown}>
                <span>{selectedText}</span>
                <span className={styles.arrow}>{Down}</span>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option) => (
                        <label key={option.value} className={styles.option}>
                            <input
                                type="checkbox"
                                checked={selectedOptions.some((item) => item.value === option.value)}
                                onChange={() => handleOptionChange(option)}
                            />
                            <span className='f16 fw400 darkGrey_color'>{option.text}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
