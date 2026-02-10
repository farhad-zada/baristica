import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './cart.module.css'
import CartProduct from './cartProduct/CartProduct'
import PageText from '../../../../content/PagesText.json'
import ProductsService from '../../../../services/products.service'
import Loading from '../../../../components/loading/Loading'
import { deleteFromCart } from '../../../../redux/slice'

const { profile, grindingOptionsTranslate } = PageText

export default function Cart() {
  const { cart, lang, token } = useSelector((state) => state.baristica)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productsServiceRef = useRef(new ProductsService())
  const lastFetchKeyRef = useRef('')

  const ids = useMemo(() => cart.map((item) => item._id), [cart])
  const idsKey = useMemo(() => ids.join(','), [ids])

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      if (!token || !ids.length) {
        setProducts([])
        return
      }

      if (lastFetchKeyRef.current === idsKey) return
      lastFetchKeyRef.current = idsKey

      setLoading(true)
      try {
        const results = await Promise.allSettled(
          ids.map((id) => productsServiceRef.current.getOneProduct(token, id))
        )

        const productsData = []
        const missingIds = []

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const product = result.value?.data
            if (!product) {
              missingIds.push(ids[index])
              return
            }
            if (product?.deleted) {
              missingIds.push(product._id)
              return
            }
            productsData.push(product)
            return
          }

          const status = result.reason?.response?.status
          if (status === 404 || status === 410) {
            missingIds.push(ids[index])
          }
        })

        if (missingIds.length) {
          const uniqueIds = [...new Set(missingIds)]
          uniqueIds.forEach((id) => dispatch(deleteFromCart(id)))
        }

        if (isMounted) setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
        if (isMounted) setProducts([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [token, idsKey, ids, dispatch])

  const mergedProducts = useMemo(() => {
    return products.map((p) => {
      const item = cart.find((c) => c._id === p._id)
      return { ...p, cartCount: item ? item.cartCount : 0, selectedForOrder: item?.selectedForOrder }
    })
  }, [products, cart])

  return (
    <div className={styles.cart}>
      <Loading status={loading} />
      <h2 className={`${styles.cartHeading} f28 fw600 darkGrey_color`}>
        {lang ? profile[lang].cart.cartHeading : ''}
      </h2>

      {mergedProducts.length ? (
        <div>
          {mergedProducts.map((product) => (
            <CartProduct
              key={product._id}
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
