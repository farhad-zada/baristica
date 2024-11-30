import React, { useEffect, useState } from 'react'
import { FilterIcon } from '../../../icons'
import styles from '../productsCss/filterSection.module.css'
import CustomSelect from '../../../components/customSelect/CustomSelect'

import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import ProductsFilter from '../../../components/productsFilter/ProductsFilter'
const { productsPage } = pageText
export default function FilterSection() {
    const [priceOptions, setPriceOptions] = useState(['По возрастанию', 'По убыванию'])
    const [defaultOption, setDefaultOption] = useState('')
    const [filter, setFilter] = useState(false)

    const { lang } = useSelector((state) => state.baristica);


    const max = 20
    const showedCount = 6
    useEffect(() => {
        setDefaultOption(lang ? productsPage[lang].filterSection.priceSelect : '')
        setPriceOptions(lang ? productsPage[lang].filterSection.priceSelectOptions : '')
    }, [lang])
    return (
        <div className={`${styles.filterSection}`}>
            <div className={`${styles.filterSection_head} flex j-between a-center`}>
                <h2 className='f20 fw400 darkGrey_color'>{lang ? productsPage[lang].filterSection.leftHeading : ''} {showedCount} {lang ? productsPage[lang].filterSection.leftHeadingAddition : ''} {max}</h2>
                <div className="filterButtons flex a-center g12">
                    {
                        window.location.href.includes('/coffee')
                            ?
                            <div className={`${styles.filterBtn} flex g8 a-center`} onClick={() => setFilter(!filter)}>
                                {FilterIcon}
                                <span className='f20 fw400 darkGrey_color'>{lang ? productsPage[lang].filterSection.filterBtn : ''}</span>
                            </div>
                            :
                            <></>
                    }

                    <CustomSelect options={priceOptions.map(option => option.text)} defaultValue={defaultOption} fontSize={'f20'} textColor={'darkGrey_color'} type={'cart'} />
                </div>
            </div>
            {
                window.location.href.includes('/coffee')
                    ?
                    <ProductsFilter status={filter} content={lang ? productsPage[lang].filterSection.filters : {}} />
                    :
                    <></>
            }
        </div>
    )
}
