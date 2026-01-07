import ProductsDetailHeadLeft from './ProductsDetailHeadLeft'
import ProductsDetailHeadRight from './ProductsDetailHeadRight'
import styles from '../productDetailComponentsCss/productsDetailHead.module.css'
import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'

export default function ProductsDetailHead({ product }) {
      const { lang } = useSelector(state => state.baristica)
    const isDeleted = product?.deleted === true
    
    return (
        <div className={`${styles.productDetail_head} ${product.deleted ? '' : styles.marginTop}`}>
            {/* Deleted product warning banner */}
            {isDeleted && (
                <div className={styles.deletedWarningBanner}>
                    <div className={styles.warningContent}>
                        <svg 
                            className={styles.warningIcon} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                        <div className={styles.warningText}>
                            <h3 className={styles.warningTitle}>
                                {pageText.productsPage[lang].deleted_heading}
                            </h3>
                            <p className={styles.warningMessage}>
                                {pageText.productsPage[lang].deleted_subheading}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Image with reduced opacity when deleted */}
            <div className={`${styles.leftColumn} ${isDeleted ? styles.deletedProduct : ''}`}>
                <ProductsDetailHeadLeft product={product} />
            </div>
            
            {/* Product details */}
            <ProductsDetailHeadRight product={product} />
        </div>
    )
}