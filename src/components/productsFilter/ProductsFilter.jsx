import React, { useEffect, useRef, useState } from 'react'
import styles from './productsFilter.module.css'
import CustomDropdown from '../customDropdown/CustomDropdown'
import { useSelector } from 'react-redux';
import CountriesService from '../../services/countries.service';
import ProductsService from '../../services/products.service';

export default function ProductsFilter({ setFilterQueryString, content, status, getProducts }) {
    const { lang } = useSelector(state => state.baristica)
    const [selectedArr, setSelectedArr] = useState([]);
    const [selectedRating, setSelectedRating] = useState([])
    const [selectedGrader, setSelectedGrader] = useState([])
    const [selectedAcidity, setSelecteAcidity] = useState([])
    const [selectedProcessing, setSelecteProcessing] = useState([])
    const [selectedCountry, setSelecteCountry] = useState([])
    const [selectedDencity, setSelecteDencity] = useState([])

    const [countryOptions, setCountryOptions] = useState([])
    const [processingMethodsOptions, setProcessingMethodsOptions] = useState([])

    const isFirstRender = useRef(true);

    const filters = [
        {
            header: content.rating.header,
            options: content.rating.options,
            type: 'rating',
            selectionMode: 'single'
        },
        {
            header: content.grader.header,
            options: content.grader.options,
            type: 'grader',
            selectionMode: 'single'
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

    const countriesService = new CountriesService()
    const productsService = new ProductsService()

    const getCountries = async (lang) => {
        try {
            const response = await countriesService.getCountries()
            const countriesData = response.data.countries.map((country) => {
                return {
                    "text": country[lang],
                    "value": country.en
                }
            })

            setCountryOptions(countriesData)
        } catch (error) {
            console.log(error)
        }
    }

    const getProcessingMethods = async (lang) => {
        try {
            const response = await productsService.getProcessingMethods()
            const processingResponse = response.data.processingMethods
            console.log(processingResponse)
            const processingTranslations = processingResponse[lang] ? processingResponse[lang] : processingResponse['az']
            const processingData = processingTranslations.map((method, index) => {
                return {
                    "text": method,
                    "value": processingResponse['az'][index]
                }
            })
            setProcessingMethodsOptions(processingData)

        } catch (error) {

        }
    }

    const processFilters = () => {
        const data = {
            rating: selectedRating,
            processingMethod: selectedProcessing,
            qGrader: selectedGrader,
            acidity: selectedAcidity,
            viscocity: selectedDencity,
            country: selectedCountry
        };

        const result = Object.entries(data)
            .filter(([_, values]) => {
                // Исключаем ключи с пустыми массивами
                return !(Array.isArray(values) && values.length === 0);
            })
            .map(([key, values]) => {
                if (Array.isArray(values)) {
                    return `${key}=${values.map(value => value.value).join(',')}`;
                }
                return `${key}=${values}`;
            })
            .join('&');

        setFilterQueryString((state) => {
            let arr = state.split('&');

            // Фильтруем массив, оставляя только `price`
            arr = arr.filter(item => item.startsWith('price='));

            // Формируем новую строку с только `price` и результатом фильтров
            const updatedState = arr.filter(item => item).join('&'); // Убираем пустые строки
            return updatedState ? `${updatedState}&${result}` : result;
        });

        return result;
    };


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

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if(!selectedArr.length){
            getProducts('Coffee', '')
            
        }

        processFilters()
    }, [selectedArr])

    useEffect(() => {
        if (!status) {
            setSelectedRating([])
            setSelectedGrader([])
            setSelecteAcidity([])
            setSelecteProcessing([])
            setSelecteCountry([])
            setSelecteDencity([])
            setSelectedArr([])
        }
    }, [status])

    useEffect(() => {
        if (lang) {
            getCountries(lang)
            getProcessingMethods(lang)
        }
    }, [lang])
    return (
        <div className={status ? styles.productsFilterActive : styles.productsFilter}>
            {
                filters.length && filters.map((filter) => {
                    const selectedOptions =
                        filter.type === 'rating' ? selectedRating :
                            filter.type === 'grader' ? selectedGrader :
                                filter.type === 'acidity' ? selectedAcidity :
                                    filter.type === 'processing' ? selectedProcessing :
                                        filter.type === 'country' ? selectedCountry :
                                            filter.type === 'dencity' ? selectedDencity : [];
                    if (filter.type === 'country') {
                        return (
                            <CustomDropdown
                                label={filter.header}
                                options={countryOptions}
                                onSelectionChange={handleSelectionChange}
                                key={filter.header}
                                type={filter.type}
                                selectionMode={filter.selectionMode}
                                selectedOptions={selectedOptions} // Передаем состояние в CustomDropdown
                            />
                        );
                    } else if (filter.type === 'processing') {
                        return (
                            <CustomDropdown
                                label={filter.header}
                                options={processingMethodsOptions}
                                onSelectionChange={handleSelectionChange}
                                key={filter.header}
                                type={filter.type}
                                selectionMode={filter.selectionMode}
                                selectedOptions={selectedOptions} // Передаем состояние в CustomDropdown
                            />
                        );
                    }
                    else {
                        return (
                            <CustomDropdown
                                label={filter.header}
                                options={filter.options}
                                onSelectionChange={handleSelectionChange}
                                key={filter.header}
                                type={filter.type}
                                selectionMode={filter.selectionMode}
                                selectedOptions={selectedOptions} // Передаем состояние в CustomDropdown
                            />
                        );
                    }

                })
            }

        </div>
    )
}
