import React from 'react'
import ProductCard from '../../../components/productCard/ProductCard'
import styles from '../productsCss/productsList.module.css'
import { useSelector } from 'react-redux'
import pageText from '../../../content/PagesText.json'

const { hints } = pageText
export default function ProductsList({ products }) {
  const { lang } = useSelector(state => state.baristica)

  if (products?.length) {
    return (
      <div className={`${styles.productsList}`}>
        {
          products.map((product, index) => (
            <ProductCard product={product} width={'15%'} />
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
