import React, { useState } from 'react'
import styles from './productsFilter.module.css'
import CustomDropdown from '../customDropdown/CustomDropdown'

export default function ProductsFilter({ content, status }) {

    const [selectedArr, setSelectedArr] = useState([]);
    const [selectedRating, setSelectedRating] = useState([])
    const [selectedGrader, setSelectedGrader] = useState([])
    const [selectedAcidity, setSelecteAcidity] = useState([])
    const [selectedProcessing, setSelecteProcessing] = useState([])
    const [selectedCountry, setSelecteCountry] = useState([])
    const [selectedDencity, setSelecteDencity] = useState([])

    const filters = [
        {
            header: content.rating.header,
            options: content.rating.options,
            type: 'rating'
        },
        {
            header: content.grader.header,
            options: content.grader.options,
            type: 'grader'
        },
        {
            header: content.acidity.header,
            options: content.acidity.options,
            type: 'acidity'
        },
        {
            header: content.processing.header,
            options: content.processing.options,
            type: 'processing'
        },
        {
            header: content.country.header,
            options: content.country.options,
            type: 'country'
        },
        {
            header: content.dencity.header,
            options: content.dencity.options,
            type: 'dencity'
        }
    ]

    const handleSelectionChange = (selectedOptions, type) => {
        switch (type) {
            case 'rating':
                setSelectedRating(selectedOptions)
                break;
            case 'grader':
                setSelectedGrader(selectedOptions)
                break;
            case 'acidity':
                setSelecteAcidity(selectedOptions)
                break;
            case 'processing':
                setSelecteProcessing(selectedOptions)
                break;
            case 'country':
                setSelecteCountry(selectedOptions)
                break;
            case 'dencity':
                setSelecteDencity(selectedOptions)
                break;
            default:
                break;
        }
        setSelectedArr(selectedOptions); // Update selectedArr with the selected options
    };


    return (
        <div className={status ? styles.productsFilterActive : styles.productsFilter}>
            {
                filters.length && filters.map((filter) => (
                    <CustomDropdown
                        label={filter.header}
                        options={filter.options}
                        onSelectionChange={handleSelectionChange}
                        key={filter.header}
                        type={filter.type}
                    />
                ))
            }
        </div>
    )
}
