import React, { useEffect, useState } from 'react'
import { CloseFilter, FilterIcon } from '../../../icons'
import styles from '../productsCss/filterSection.module.css'
import CustomSelect from '../../../components/customSelect/CustomSelect'

import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import ProductsFilter from '../../../components/productsFilter/ProductsFilter'
const { productsPage } = pageText
export default function FilterSection({ setFilterQueryString, productsCount, type }) {
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
    }

    const showedCount = 6
    useEffect(() => {
        setDefaultOption(lang ? productsPage[lang].filterSection.priceSelect : '')
        setPriceOptions(lang ? productsPage[lang].filterSection.priceSelectOptions : '')
    }, [lang])
    return (
        <div className={`${styles.filterSection}`}>
            <div className={`${styles.filterSection_head} flex j-between a-center`}>
                <h2 className={`${styles.filterSection_paginationCount} robotoFont f20 fw400 darkGrey_color`}>{lang ? productsPage[lang].filterSection.leftHeading : ''} {showedCount} {lang ? productsPage[lang].filterSection.leftHeadingAddition : ''} {productsCount}</h2>
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
                window.location.href.includes('/coffee')
                    ?
                    <ProductsFilter setFilterQueryString={setFilterQueryString} status={filter} content={lang ? productsPage[lang].filterSection.filters : {}} />
                    :
                    <></>
            }
        </div>
    )
}
