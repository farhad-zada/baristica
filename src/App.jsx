import React, { useEffect, useState } from 'react'
import { setCart, setFavoritesCount, setFinalCart, setFinalCartArr, setLang, setToken, setUser } from './redux/slice';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import HeadBanner from "./components/layout/headBanner/HeadBanner"
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

const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { cart, finalCart } = useSelector(state => state.baristica)
  const dispatch = useDispatch()
  const { setItemToStorage, getItemFromStorage } = useLocalStorage('lang');
  const { getItemFromStorage: getTokenFromStorage } = useLocalStorage('baristicaToken'); // Для токена
  const { getItemFromStorage: getObjectFromStorage, setItemToStorage: setObjectToStorage } = useLocalStorage('baristica')

  const userService = new UserService()
  const favoritesService = new FavoritesService()

  const getUser = async (token) => {
    // setLoading(true)
    try {
      const response = await userService.getUser(token)
      dispatch(setUser(response.data))
    } catch (error) {
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }

  const getFavorites = async (page, token) => {
    setLoading(true)
    try {
      const response = await favoritesService.getFavorites(token, page)
      dispatch(setFavoritesCount(response.data.length))
    } catch (error) {
      setError(true)
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
    const lang = getItemFromStorage(); // Получаем язык из локального хранилища
    const token = getTokenFromStorage(); // Получаем токен

    if (!lang) {
      setItemToStorage('az'); // Устанавливаем язык по умолчанию
      dispatch(setLang('az'));
      return;
    }

    dispatch(setLang(lang)); // Устанавливаем язык в redux store
    const baristicaObj = getObjectFromStorage();
    if (baristicaObj?.cart?.length && token) {
      dispatch(setCart(baristicaObj.cart))
    }

    if (baristicaObj?.finalCart?.length && token) {
      dispatch(setFinalCartArr(baristicaObj.finalCart))
    }

    if (token) {
      getUser(token)
      dispatch(setToken(token))
      getFavorites(1, token)
    }
  }, []);

  return (
    <div>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} />
      <SubHeader />
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App