import React from 'react';
import ProductCard from '../productCard/ProductCard';
import styles from './homeProductsList.module.css';
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';

const {hints} = PageText

const HomeProductsList = ({ products }) => {
  const {lang} = useSelector(state => state.baristica)
  return(
    <div className={styles.productListContainer}>
      {
        products.length
          ?
          products.slice(0, 3).map((product) => (
            <ProductCard key={`${Math.floor(Math.random() * 10000)}${Date.now()}`} product={product} />
          ))
          :
          <p className="f24 fw400 darkGrey_color">{lang ? hints[lang].noProducts : ''}</p>
      }
    </div>
  )
};

export default HomeProductsList;
