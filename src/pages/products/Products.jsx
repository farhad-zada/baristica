import React, { useEffect, useState } from 'react'
import ProductsHead from './productsComponents/ProductsHead'
import style from './productsCss/products.module.css'
import pageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductTypes from './productsComponents/ProductTypes';
import ProductsList from './productsComponents/ProductsList';
import FilterSection from './productsComponents/FilterSection';
const { productsPage } = pageText
export default function Products() {
  const { lang } = useSelector((state) => state.baristica);

  const [heading, setHeading] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [products, setProducts] = useState([1, 3, 2, 4, 5, 6, 4])

  const changePageType = (type) => {
    if (type) {
      setHeading(productsPage[lang][type])
      setTypes(productsPage.productTypes[type])
      setCurrentType(type)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    changePageType(currentType)
  }, [lang])

  useEffect(() => {
    if (window.location.href.includes('/coffeeMachines')) {
      changePageType('coffeeMachines')
    } else if (window.location.href.includes('/coffee')) {
      changePageType('coffee')
    } else if (window.location.href.includes('/accesories')) {
      changePageType('accesories')
    }
    else {
      navigate('/')
    }
    return () => {
      setHeading('')
      setTypes([])
      setCurrentType('')
    }
  }, [])



  return (
    <div className={`${style.productsPage}  flex j-center`}>
      <div className="container">
        <ProductsHead heading={heading} />
        <ProductTypes content={types?.length ? types : []} />
        <FilterSection />
        <ProductsList products={products} />
      </div>
    </div>
  )
}
