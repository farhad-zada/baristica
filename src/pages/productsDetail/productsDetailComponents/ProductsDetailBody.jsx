import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '../../../components/tabs/Tabs';

import PageText from '../../../content/PagesText.json'
import ProductDetailsAbout from './ProductDetailsAbout';
import ProductDetailsCharacteristics from './ProductDetailsCharacteristics';
import ProductDetailsReviews from './ProductDetailsReviews';
import { setTabIdx } from '../../../redux/slice';
const { productDetail } = PageText

export default function ProductsDetailBody({ product }) {
    const { lang } = useSelector((state) => state.baristica);
    const sectionsContent = [
        {
            tabs: lang ? productDetail[lang].tabs : [],
            content: {
                [productDetail[lang].tabs[0]]: <ProductDetailsAbout product={product} />,
                [productDetail[lang].tabs[1]]: <ProductDetailsCharacteristics product={product} />,
                [productDetail[lang].tabs[2]]: <ProductDetailsReviews product={product} />
            }
        },
    ]
    const dispatch = useDispatch()


    const changeActiveTabIdx = (index) => {
        dispatch(setTabIdx(index))
    }

    return (
        <div className='flex j-center'>
            {sectionsContent.map((section) => (
                <Tabs
                    tabs={section.tabs?.map((tab) => tab)}
                    children={section.content}
                    additionalHeadingStyles={' flex j-center pb6 border-bottom'}
                    additionalTabStyle={' w-100'}
                    callback={changeActiveTabIdx}
                />
            ))}
        </div>
    )
}
