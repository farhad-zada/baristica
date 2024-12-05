import React, { useState } from 'react';
import ProductType from './ProductType';
import styles from '../productsCss/productTypes.module.css';

export default function ProductTypes({ setFilterQueryString, content, type }) {
    const [activeIndices, setActiveIndices] = useState([]);


    const handleTypeClick = (index) => {

        if (activeIndices.includes(index)) {
            // Убираем индекс из массива, если он уже активен
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            // Добавляем индекс в массив, если он еще не активен
            setActiveIndices([...activeIndices, index]);
        }

        if(type === 'Coffee'){
            setFilterQueryString((state) => {
                let arr = state.split('&');
    
                // Удаляем существующую строку с ключом `category`
                arr = arr.filter((item) => !item.startsWith('coffeeType='));
    
                // Получаем все активные значения из `content` по `activeIndices`
                const activeValues = [...activeIndices, index] // Добавляем или убираем текущий индекс
                    .filter((i) => activeIndices.includes(i) ? i !== index : i === index) // Обновляем активные индексы
                    .map((i) => content[i].value); // Извлекаем значения
    
                // Если есть активные значения, добавляем `category` с этими значениями
                if (activeValues.length > 0) {
                    arr.push(`coffeeType=${activeValues.join(',')}`);
                }
    
                // Формируем новую строку
                return arr.filter((item) => item).join('&'); // Убираем пустые строки
            });
            return ;
        }
        setFilterQueryString((state) => {
            let arr = state.split('&');

            // Удаляем существующую строку с ключом `category`
            arr = arr.filter((item) => !item.startsWith('category='));

            // Получаем все активные значения из `content` по `activeIndices`
            const activeValues = [...activeIndices, index] // Добавляем или убираем текущий индекс
                .filter((i) => activeIndices.includes(i) ? i !== index : i === index) // Обновляем активные индексы
                .map((i) => content[i].value); // Извлекаем значения

            // Если есть активные значения, добавляем `category` с этими значениями
            if (activeValues.length > 0) {
                arr.push(`category=${activeValues.join(',')}`);
            }

            // Формируем новую строку
            return arr.filter((item) => item).join('&'); // Убираем пустые строки
        });
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
