import React from 'react'
import { Delete } from '../../icons'

export default function ProductAddedModal({ status, setStatus, product }) {
    return (
        <div className={status ? 'modal' : 'modal active'}>
            <div className="modalContent">
                <div className="modalContent_head flex j-between">
                    <h2 className="f32 fw700">ТОВАР ДОБАВЛЕН В КОРЗИНУ</h2>
                    {Close}
                </div>

                <div className="product flex j-between a-center">
                    <div className="text">
                        <h2 className='f20 fw700  darkGrey_color'>{product?.name ? product.name : 'COLOMBIA GESHA ANCESTRO'}</h2>
                        <p className="f16 fw400 darkGrey_color">{product?.selectedGrinding ? product.selectedGrinding : 'Помол: для турки (мелкий)'}</p>
                        <div className="flex g8">
                            <span>{product?.selectedWeight ? product.selectedWeight : '1000'}</span>
                            <span>{product?.cartCount ? product.cartCount : '2'}</span>
                        </div>
                    </div>
                    <div className="img">
                        <img src={product?.img ? product.img : ''} alt="" />
                    </div>
                </div>

                <div className="final flex j-between">
                    <h2 className='f36 fw400'>
                        Итого:
                        {product?.finalPrice ? product.finalPrice : 84} ₼
                    </h2>
                    {Delete}
                </div>
            </div>
        </div>
    )
}
