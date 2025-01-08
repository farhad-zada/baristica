import React, { useState } from 'react'
import ProductCard from '../../../components/productCard/ProductCard'
import styles from '../productsCss/productsList.module.css'
import { useSelector } from 'react-redux'
import pageText from '../../../content/PagesText.json'
import ProductAddedModal from '../../../components/productAddedModal/ProductAddedModal'

const { hints } = pageText
export default function ProductsList({ products }) {
  const { lang } = useSelector(state => state.baristica)
  const [modalProduct, setModalProduct] = useState({})
  const [productAdded, setProductAdded] = useState(false)
  const [cartProductCount, setCartProductCount] = useState(1)

  if (products?.length) {
    return (
      <div className={`${styles.productsList}`}>
            <ProductAddedModal product={modalProduct} status={productAdded} setStatus={setProductAdded} cartCount={cartProductCount} setCartCount={setCartProductCount} />

        {
          products.map((product, index) => (
            <ProductCard key={index} product={product} width={'15%'} setModalProduct={setModalProduct} setProductAdded={setProductAdded} setCartProductCount={setCartProductCount} />
          ))
        }
      </div>
    )
  } else {
    return (
      <p className="f24 fw400 darkGrey_color">{lang ? hints[lang].noProducts : ''}</p>
    )
  }


}
