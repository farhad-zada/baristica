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
  const [filterQueryString, setFilterQueryString] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [productsCount, setProductsCount] = useState(0)
  const [showedProductsCount, setShowedProductsCount] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [type, setType] = useState('')

  const { pathname } = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(type, filterQueryString, page)
    window.scrollTo(0, 0);
    localStorage.setItem('productsPagination', JSON.stringify({ type: type, page: page }))
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

  const getProducts = async (type, query, page = false) => {
    
    console.log('work', type) 
    if(!type) return

    setLoading(true)
    try {
      const response = await productsService.getProducts(token, type, page ? page : currentPage, query)
      const products = response.data
      // if (productsCount !== response.count) {
      //   setCurrentPage(1)
      // }
      setShowedProductsCount(products.length)
      setProductsCount(response.count)
      setTotalPages(response.page_count)
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

  // we need this to set products and type when user first time opened this page.
  useEffect(() => {
    if (window.location.href.includes('/coffeeMachines')) {
      changePageType('coffeeMachines')

      const productsPagination = JSON.parse(localStorage.getItem('productsPagination'))
      if (productsPagination && 'Machine' === productsPagination?.type) {
        setType('Machine')
        return;
      }
      setCurrentPage(1)
      getProducts('Machine', '',1)
      setType('Machine')
      localStorage.setItem('productsPagination', JSON.stringify({ type: 'Machine', page: 1 }))

    } else if (window.location.href.includes('/coffee')) {

      changePageType('coffee')
      const productsPagination = JSON.parse(localStorage.getItem('productsPagination'))
      if (productsPagination && 'Coffee' === productsPagination?.type) {
        setType('Coffee')
        return;
      }
      setCurrentPage(1)

      getProducts('Coffee', '', 1)
      setType('Coffee')
      localStorage.setItem('productsPagination', JSON.stringify({ type: 'Coffee', page: 1 }))

    } else if (window.location.href.includes('/accesories')) {
      changePageType('accesories')
      // here
      const productsPagination = JSON.parse(localStorage.getItem('productsPagination'))
      if (productsPagination && 'Accessory' === productsPagination?.type) {
        setType('Accessory')
        return;
      }
      setCurrentPage(1)

      getProducts('Accessory', '',1)
      setType('Accessory')
      localStorage.setItem('productsPagination', JSON.stringify({ type: 'Accessory', page: 1 }))
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

  // we need this to change products list when the user change page
  // useEffect(() => {
  //   console.log('work', currentPage)

  //   getProducts(type, filterQueryString)
  // }, [currentPage])

  useEffect(() => {
    if (type && filterQueryString) {
      
      getProducts(type, filterQueryString)
      setCurrentPage(1)
    }
  }, [filterQueryString, type])



  //if the type changed we need to reset filter query string
  useEffect(() => {
    if (type) {
      setFilterQueryString('')
      const productsPagination = JSON.parse(localStorage.getItem('productsPagination'))
      if (productsPagination && type === productsPagination?.type) {
        handlePageChange(productsPagination.page)
      }
    }
  }, [type])


  return (
    <div className={`${style.productsPage}  flex j-center`}>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} />

      <div className="container">
        <ProductsHead heading={heading} />
        <ProductTypes type={type} getProducts={getProducts} setFilterQueryString={setFilterQueryString} content={types?.length ? types : []} />
        <FilterSection
          setFilterQueryString={setFilterQueryString}
          type={type}
          showedProductsCount={showedProductsCount}
          productsCount={productsCount}
          getProducts={getProducts}
        />
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
