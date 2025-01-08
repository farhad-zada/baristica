import React, { memo, useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import styles from './homeProductsList.module.css';
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';
import ProductAddedModal from '../productAddedModal/ProductAddedModal';

const { hints } = PageText

const HomeProductsList = ({ products }) => {
  const { lang } = useSelector(state => state.baristica)

  const [modalProduct, setModalProduct] = useState({})
  const [productAdded, setProductAdded] = useState(false)
  const [cartProductCount, setCartProductCount] = useState(1)

  return (
    <div className={styles.productListContainer}>
      <ProductAddedModal product={modalProduct} status={productAdded} setStatus={setProductAdded} cartCount={cartProductCount} setCartCount={setCartProductCount} />

      {
        products.length
          ?
          products.slice(0, 3).map((product) => (
            <ProductCard key={`${Math.floor(Math.random() * 10000)}${Date.now()}`} product={product} setModalProduct={setModalProduct} setProductAdded={setProductAdded} setCartProductCount={setCartProductCount} />
          ))
          :
          <p className="f24 fw400 darkGrey_color">{lang ? hints[lang].noProducts : ''}</p>
      }
    </div>
  )
};

export default memo(HomeProductsList);
