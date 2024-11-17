import React, { useState } from 'react';
import styles from './colorPicker.module.css';

const ColorPicker = ({ options, onColorSelect, text }) => {
  const [selectedColor, setSelectedColor] = useState(options[0].value); // Значение выбранного цвета

  const handleSelect = (color) => {
    setSelectedColor(color);
    if (onColorSelect) onColorSelect(color); // Callback для родительского компонента
  };

  return (
    <div className={styles.color_picker}>
      <h3 className={styles.title}>{text}</h3>
      <div className={styles.options}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`${styles.option} ${
              selectedColor === option.value ? styles.selected : ''
            }`}
            onClick={() => handleSelect(option.value)}
          >
            <img src={option.image} alt={option.label} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
