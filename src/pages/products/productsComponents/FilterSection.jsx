import React, { useEffect, useState } from 'react'
import { CloseFilter, FilterIcon } from '../../../icons'
import styles from '../productsCss/filterSection.module.css'
import CustomSelect from '../../../components/customSelect/CustomSelect'

import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import ProductsFilter from '../../../components/productsFilter/ProductsFilter'
const { productsPage } = pageText

export default function FilterSection({ setFilterQueryString,showedProductsCount, productsCount, type, getProducts }) {
    const [priceOptions, setPriceOptions] = useState(['По возрастанию', 'По убыванию'])
    const [selectedOption, setSelectedOption] = useState({})
    const [defaultOption, setDefaultOption] = useState('')
    const [filter, setFilter] = useState(false)

    const { lang } = useSelector((state) => state.baristica);

    const changeSelect = (field, value) => {
        const selected = productsPage[lang].filterSection.priceSelectOptions.find((option) => option.text === value);
        setFilterQueryString((state) => {
            let arr = state.split('&');
            
            // Удаляем все элементы с ключом `price`
            arr = arr.filter((item) => !item.startsWith('price='));
            
            // Формируем строку заново и добавляем `price`
            const updatedState = arr.filter(item => item).join('&'); // Исключаем пустые строки
            return updatedState ? `${updatedState}&price=${selected.value}` : `price=${selected.value}`;
        });
    };

    const resetFilter = () => {
        setFilterQueryString((state) => {
            let arr = state.split('&');
            
            // Удаляем все элементы с ключом `price`
            arr = arr.filter((item) => item.startsWith('price='));
            arr = arr.filter((item) => item.startsWith('category='))
            arr = arr.filter((item) => item.startsWith('coffeeType='))
            
            // Формируем строку заново и добавляем `price`
            const updatedState = arr.filter(item => item).join('&'); // Исключаем пустые строки
            return updatedState
        })
        getProducts('Coffee', '')
        
    }

    function getEnding(productsCount) {
        const strCount = String(productsCount); // Преобразуем число в строку
        const lastDigit = strCount.slice(-1); // Последняя цифра
        const lastTwoDigits = strCount.slice(-2); // Последние две цифры
    
        // Проверяем условия
        if (
            ['6', '9'].includes(lastDigit) || 
            ['10', '30', '40', '60', '90'].includes(lastTwoDigits)
        ) {
            return 'dan';
        }
        return 'dən';
    }

    const setProductsCountText = (lang) => {
        if (lang === 'ru' || lang === 'en') {
            return (
                <h2 className={`${styles.filterSection_paginationCount} robotoFont f20 fw400 darkGrey_color`}>
                    {lang ? productsPage[lang].filterSection.leftHeading : ''} {showedProductsCount} {lang ? productsPage[lang].filterSection.leftHeadingAddition : ''} {productsCount}
                </h2>
            )
        } else{
            return (
                <h2 className={`${styles.filterSection_paginationCount} robotoFont f20 fw400 darkGrey_color`}>
                    {lang ? productsPage[lang].filterSection.leftHeading : ''} {productsCount} - {getEnding(productsCount)} {showedProductsCount}
                </h2>
            )
        }
    }

    useEffect(() => {
        setDefaultOption(lang ? productsPage[lang].filterSection.priceSelect : '')
        setPriceOptions(lang ? productsPage[lang].filterSection.priceSelectOptions : '')
    }, [lang])

    useEffect(() => {
        setFilter(false)
    },[type])
    
    return (
        <div className={`${styles.filterSection}`}>
            <div className={`${styles.filterSection_head} flex j-between a-center`}>
            {setProductsCountText(lang)}
                <div className="filterButtons flex a-center g12">
                    {
                        type === 'Coffee'
                            ?
                            filter
                            ?
                            <div className={`${styles.closeFilter} flex g8 a-center`} onClick={() =>{resetFilter(); setFilter(!filter)}}>
                                <span className='f20 fw400 darkGrey_color'>{lang ? productsPage[lang].filterSection.closeFilter : ''}</span>
                                {CloseFilter}
                            </div>
                            :
                            <div className={`${styles.filterBtn} flex g8 a-center`} onClick={() => setFilter(!filter)}>
                                {FilterIcon}
                                <span className='f20 fw400 darkGrey_color'>{lang ? productsPage[lang].filterSection.filterBtn : ''}</span>
                            </div>
                            :
                            <></>
                    }

                    <CustomSelect field={'price'} callBack={changeSelect} options={priceOptions.map(option => option.text)} defaultValue={defaultOption} fontSize={'f20'} textColor={'darkGrey_color'} type={'cart'} />
                </div>
            </div>
            {
                type === 'Coffee'
                    ?
                    <ProductsFilter getProducts={getProducts} setFilterQueryString={setFilterQueryString} status={filter} content={lang ? productsPage[lang].filterSection.filters : {}} />
                    :
                    <></>
            }
        </div>
    )
}
