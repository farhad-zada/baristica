import React from 'react';
import ProductCard from '../productCard/ProductCard';
import styles from './homeProductsList.module.css';

const HomeProductsList = ({ products }) => (
  <div className={styles.productListContainer}>
    {products.slice(0, 3).map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default HomeProductsList;
