import React, { useState, useEffect, useRef } from 'react';
import styles from './customDropdown.module.css';
import { Down } from '../../icons';

const CustomDropdown = ({
    label,
    options,
    onSelectionChange,
    type,
    selectionMode = 'multiple', // "multiple" или "single" выбор
    selectedOptions: parentSelectedOptions,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionChange = (option) => {
        let newSelectedOptions;

        if (selectionMode === 'single') {
            // В режиме "single" выбирается только один элемент
            newSelectedOptions = [option];
        } else {
            // В режиме "multiple" добавляем или убираем выбранный элемент
            const isSelected = selectedOptions.some((item) => item.value === option.value);
            newSelectedOptions = isSelected
                ? selectedOptions.filter((item) => item.value !== option.value)
                : [...selectedOptions, option];
        }

        setSelectedOptions(newSelectedOptions);

        // Вызов родительской функции onSelectionChange с актуальными значениями
        if (onSelectionChange) {
            onSelectionChange(newSelectedOptions, type);
        }
    };

    const selectedText =
        selectedOptions.length > 0
            ? `${label}: ` + selectedOptions.map((option) => option.text).join(', ')
            : label;

    // Закрытие dropdown при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Синхронизация состояния selectedOptions с пропсом parentSelectedOptions
    useEffect(() => {
        if (parentSelectedOptions) {
            setSelectedOptions(parentSelectedOptions);
        }
    }, [parentSelectedOptions]);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div
                className={selectedOptions.length ? styles.headerSelected : styles.header}
                onClick={toggleDropdown}
            >
                <span>{selectedText}</span>
                <span className={styles.arrow}>{Down}</span>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option) => (
                        <label key={option.value} className={styles.option}>
                            <input
                                type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                                name={selectionMode === 'single' ? label : undefined}
                                checked={selectedOptions.some((item) => item.value === option.value)}
                                onChange={() => handleOptionChange(option)}
                            />
                            <span className="f16 fw400 darkGrey_color">{option.text}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
