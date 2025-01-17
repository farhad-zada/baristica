import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './productsSection.module.css'
import pagesText from '../../content/PagesText.json'
import { useSelector } from 'react-redux'
import Tabs from '../tabs/Tabs'
import { RightArrow } from '../../icons'
const { productsSection } = pagesText
const ProductsSection = (props) => {
    const { heading, tabs, content, navigateTo } = props
    const { lang } = useSelector((state) => state.baristica);
    return (
        <div className={styles.productsSection + ' flex j-center'}>
            <div className="container">
                <div className={styles.productsSection_heading}>
                    <h2 className='f64 fw700 text-center text-upperCase'>{heading}</h2>
                </div>
                <Tabs tabs={tabs?.map((tab) => tab.label)} children={content} />
                <Link to={navigateTo} className={styles.navigateTo + " flex j-center a-center g12"}>
                    <span className='f32 fw400 black' >{lang ? productsSection[lang].seeAll : ''}</span>
                    {RightArrow}
                </Link>
            </div>
        </div>
    )
}

export default memo(ProductsSection)