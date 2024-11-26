import React, { useEffect, useState } from 'react'
import ProductsHead from './productsComponents/ProductsHead'
import style from './productsCss/products.module.css'
import pageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductTypes from './productsComponents/ProductTypes';
import ProductsList from './productsComponents/ProductsList';
import FilterSection from './productsComponents/FilterSection';
import ProductsService from '../../services/products.service';
const { productsPage } = pageText
export default function Products() {
  const { lang, token } = useSelector((state) => state.baristica);

  const [heading, setHeading] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [products, setProducts] = useState([])
  const { pathname } = useLocation();

  const productsService = new ProductsService()

  const changePageType = (type) => {
    if (type) {
      setHeading(productsPage[lang][type])
      setTypes(productsPage.productTypes[type])
      setCurrentType(type)
    }
  }

  const navigate = useNavigate()

  const getProducts = async (type) => {
    try {
      const response = await productsService.getProducts(token, type)
      const products = response.data
      setProducts(products)
      console.log(response)
    } catch (error) {

    }
  }

  useEffect(() => {
    changePageType(currentType)
  }, [lang])

  useEffect(() => {
    if (window.location.href.includes('/coffeeMachines')) {
      changePageType('coffeeMachines')
      if (token) {
        getProducts('Machine')
      }
    } else if (window.location.href.includes('/coffee')) {
      changePageType('coffee')
      if (token) {
        getProducts('Coffee')
      }
    } else if (window.location.href.includes('/accesories')) {
      changePageType('accesories')
      if (token) {
        getProducts('Accessory')
      }
    }
    else {
      navigate('/')
    }
    return () => {
      setHeading('')
      setTypes([])
      setCurrentType('')
    }
  }, [pathname, token])


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
