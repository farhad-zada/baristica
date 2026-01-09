import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './cart.module.css'
import CartProduct from './cartProduct/CartProduct'
import PageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom'
import ProductsService from '../../../../services/products.service'
import Loading from '../../../../components/loading/Loading'
const { profile, grindingOptionsTranslate } = PageText

export default function Cart() {
  const { cart, lang, token } = useSelector((state) => state.baristica)
  const state = useSelector((state) => state)
  const [loading, setLoading] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const productsServiceRef = useRef(new ProductsService())

  const fetchProducts = useCallback(async (ids) => {
    if (!ids.length) {
      setProducts([])
      return
    }

    try {
      if (isFirstLoad) {
        console.log('First load, setting loading to true.')
        setLoading(true)
      }
      console.log('Fetching products for IDs:', ids)
      let responses = await Promise.all(
        ids.map((id) => productsServiceRef.current.getOneProduct(token, id))
      )
      let productsData = responses.map((res) => {
        let product = res.data;
        const cartItem = cart.find((item) => item._id === product._id)
        if (cartItem) {
          product = { ...product, cartCount: cartItem.cartCount }
        } else {
          product = { ...product, cartCount: 0 }
        }
        return product;
      });

      console.log('Fetched products data:', productsData)
      setProducts(productsData);
      if (isFirstLoad) {
        setIsFirstLoad(false);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      if (isFirstLoad) {
        setIsFirstLoad(false);
        setLoading(false)
      }

    }
  }, [token, cart, setProducts, isFirstLoad, setIsFirstLoad]);
  useEffect(() => {
    if (!token) {
      console.log('No token available.')
      setProducts([])
      return
    }
    fetchProducts(cart.map(item => item._id))
  }, [cart, token, fetchProducts, state])

  return (
    <div className={styles.cart}>
      <Loading status={loading} />
      <h2 className={`${styles.cartHeading} f28 fw600 darkGrey_color`}>
        {lang ? profile[lang].cart.cartHeading : ''}
      </h2>

      {products.length ? (
        <div>
          {products.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              grindingOptionsTranslate={grindingOptionsTranslate}
              weightText={lang ? profile[lang].cart.weight : ''}
              grindityText={lang ? profile[lang].cart.grindity : ''}
            />
          ))}

          <div className="flex j-end">
            <button
              className={styles.submitBtn}
              onClick={() => navigate('/order')}
            >
              {lang ? profile[lang].cart.submitBtn : ''}
            </button>
          </div>
        </div>
      ) : (
        <p className="f20 fw400 darkGrey_color">
          {lang ? profile[lang].cart.emptyCart : ''}
        </p>
      )}
    </div>
  )
}
