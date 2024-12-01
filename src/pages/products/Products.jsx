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
import Loading from '../../components/loading/Loading';
import Pagination from '../../components/pagination/Pagination';
import Error from '../../components/error/Error';
const { productsPage } = pageText
export default function Products() {
  const { lang, token } = useSelector((state) => state.baristica);

  const [heading, setHeading] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [productsCount, setProductsCount] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { pathname } = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    setLoading(true)
    try {
      const response = await productsService.getProducts(token,type, currentPage)
      const products = response.data
      setProductsCount(response.count)
      setProducts(products)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    changePageType(currentType)
  }, [lang])

  useEffect(() => {
    if (window.location.href.includes('/coffeeMachines')) {
      changePageType('coffeeMachines')

      getProducts('Machine')

    } else if (window.location.href.includes('/coffee')) {
      changePageType('coffee')

      getProducts('Coffee')

    } else if (window.location.href.includes('/accesories')) {
      changePageType('accesories')

      getProducts('Accessory')

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
      <Loading status={loading} />
      <Error status={error} setStatus={setError} />

      <div className="container">
        <ProductsHead heading={heading} />
        <ProductTypes content={types?.length ? types : []} />
        <FilterSection productsCount={productsCount} />
        <ProductsList products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
