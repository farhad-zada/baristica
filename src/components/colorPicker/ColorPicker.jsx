import React, { useState } from 'react';
import styles from './colorPicker.module.css';

const ColorPicker = ({ field, options, onColorSelect, text }) => {
  const [selectedColor, setSelectedColor] = useState(options[0].fieldValue); // Значение выбранного цвета

  const handleSelect = (field,color) => {
    setSelectedColor(color);
    if (onColorSelect) onColorSelect(field,color); // Callback для родительского компонента
  };

  return (
    <div className={styles.color_picker}>
      <h3 className={styles.title}>{text}</h3>
      <div className={styles.options}>
        {options.map((option) => (
          <div
            key={option.fieldValue}
            className={`${styles.option} ${selectedColor === option.fieldValue ? styles.selected : ''
              }`}
            onClick={() => handleSelect(field, option.fieldValue)}
          >
            <img src={option.fieldValue} alt={option.field} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
