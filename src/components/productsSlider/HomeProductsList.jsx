import React from 'react';
import ProductCard from '../productCard/ProductCard';
import styles from './homeProductsList.module.css';

const HomeProductsList = ({ products }) => (
  console.log(products,'changed'),
  <div className={styles.productListContainer}>
    {products.slice(0, 3).map((product) => (
      <ProductCard key={`${Math.floor(Math.random() * 10000)}${Date.now()}`} product={product} />
    ))}
  </div>
);

export default HomeProductsList;
