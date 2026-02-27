import React, { useEffect, useState } from 'react'
import { setCart, setFavoritesCount, setFinalCart, setFinalCartArr, setLang, setToken, setUser } from './redux/slice';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import SubHeader from "./components/layout/subHeader/SubHeader"
import Header from './components/layout/header/Header';
import AppRoutes from './AppRoutes';
import "./assets/css/main.css"
import Footer from './components/layout/footer/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import useScrollToTop from './hooks/useScrollToTop';
import UserService from './services/user.service';
import Loading from './components/loading/Loading';
import Error from './components/error/Error';
import FavoritesService from './services/favorites.service';
import { handleApiReqRes } from './utils/handleApiReqRes.util';
import PagesText from './content/PagesText.json';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("Something went wrong.");

  const { cart, finalCart, lang, token } = useSelector(state => state.baristica)
  const dispatch = useDispatch()
  const { setItemToStorage, getItemFromStorage } = useLocalStorage('lang');
  const { getItemFromStorage: getTokenFromStorage } = useLocalStorage('baristicaToken'); // Для токена
  const { getItemFromStorage: getObjectFromStorage, setItemToStorage: setObjectToStorage } = useLocalStorage('baristica')

  const userService = new UserService()
  const favoritesService = new FavoritesService()

  const getUser = async (token) => {
    try {
      const request = userService.getUser(token)
      const response = await handleApiReqRes(request);
      dispatch(setUser(response.data))
    } catch (error) {
      setError(true)
      setMessage(error.message)

    }
    finally {
      setLoading(false)
    }
  }

  const getFavorites = async (page, token) => {
    setLoading(true)
    try {
      const request = favoritesService.getFavorites(token, page)
      const response = await handleApiReqRes(request);
      dispatch(setFavoritesCount(response.data.length))
    } catch (error) {
      setError(true)
      setMessage(error.message);
    } finally {
      setLoading(false)
    }
  }

  useScrollToTop()

  useEffect(() => {
    const baristicaObj = getObjectFromStorage();
    if (baristicaObj && cart.length > 0) {
      setObjectToStorage({ ...baristicaObj, cart });
    } else if (cart.length > 0) {
      // Сохраняем объект только если cart не пустой
      setObjectToStorage({ cart });
    }
  }, [cart]);

  useEffect(() => {
    const baristicaObj = getObjectFromStorage();
    if (baristicaObj && finalCart.length > 0) {
      setObjectToStorage({ ...baristicaObj, finalCart });
    } else if (finalCart.length > 0) {
      // Сохраняем объект только если cart не пустой
      setObjectToStorage({ finalCart });
    }
  }, [finalCart]);

  useEffect(() => {
    const storedLang = getItemFromStorage(); // Получаем язык из локального хранилища
    const storedToken = getTokenFromStorage(); // Получаем токен

    if (!storedLang) {
      setItemToStorage('az'); // Устанавливаем язык по умолчанию
      dispatch(setLang('az'));
      return;
    }

    dispatch(setLang(storedLang)); // Устанавливаем язык в redux store
    const baristicaObj = getObjectFromStorage();
    if (baristicaObj?.cart?.length && storedToken) {
      dispatch(setCart(baristicaObj.cart))
    }

    if (baristicaObj?.finalCart?.length && storedToken) {
      dispatch(setFinalCartArr(baristicaObj.finalCart))
    }

    if (storedToken) {
      getUser(storedToken)
      dispatch(setToken(storedToken))
      getFavorites(1, storedToken)
    }
  }, []);

  return (
    <div>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} message={message} />
      {!token ? (
        <div className="top_header_promo">
          {(
            lang === "az" && <>
              İNDİ QEYDİYYATDAN KEÇİN VƏ İLK SİFARİŞİNİZƏ <strong style={{ fontWeight: 900 }}>15% ENDİRİM</strong> QAZANIN!
            </>
            || lang === "en" && <>
              REGISTER NOW AND GET <strong style={{ fontWeight: 900 }}>15% OFF</strong> YOUR FIRST ORDER!
            </>
            ||
            lang === "ru" && <>
              РЕГИСТРИРУЙТЕСЬ И ПОЛУЧИТЕ <strong style={{ fontWeight: 900 }}>15% СКИДКУ</strong> НА ПЕРВЫЙ ЗАКАЗ!
            </>
          )}
        </div>
      ) : null}
      <SubHeader />
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
