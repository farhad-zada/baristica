import React, { useState } from 'react';
import ProductType from './ProductType';
import styles from '../productsCss/productTypes.module.css';

export default function ProductTypes({ content }) {
    const [activeIndices, setActiveIndices] = useState([]);

    const handleTypeClick = (index) => {
        if (activeIndices.includes(index)) {
            // Убираем индекс из массива, если он уже активен
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            // Добавляем индекс в массив, если он еще не активен
            setActiveIndices([...activeIndices, index]);
        }
    };

    return (
        <div className={`${styles.productTypes} flex`}>
            {content.map((element, index) => (
                <ProductType
                    width={content.length ? `${100 / content.length}%` : '100%'}
                    type={element}
                    key={index}
                    isActive={activeIndices.includes(index)}
                    onClick={() => handleTypeClick(index)}
                />
            ))}
        </div>
    );
}
