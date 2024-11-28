import React from 'react'
import { useSelector } from 'react-redux';
import styles from './cart.module.css'
import CartProduct from './cartProduct/CartProduct';
import PageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom';

const { profile } = PageText
export default function Cart() {
  const { cart, finalCart, lang } = useSelector((state) => state.baristica);
  const navigate = useNavigate()
  return (
    <div className={styles.cart}>
      <h2 className={styles.cartHeading + " f28 fw600 darkGrey_color"}>{lang ? profile[lang].cart.cartHeading : ''}</h2>
      {
        cart.length
          ?
          <div>
            {
              cart.map((product, key) => (
                <CartProduct
                key={key}
                  product={product}
                  weightText={lang ? profile[lang].cart.weight : ''}
                  grindityText={lang ? profile[lang].cart.grindity : ''}
                />
              ))
            }
            <div className="flex j-end">
              <button  className={styles.submitBtn} onClick={() => navigate('/order')}>{lang ? profile[lang].cart.submitBtn : ''}</button>
            </div>
          </div>
          :
          <p className="f20 fw400 darkGrey_color">{lang ? profile[lang].cart.emptyCart : ''}</p>
      }
    </div>
  )
}
