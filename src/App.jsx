import React, { useEffect, useState } from 'react'
import { setLang, setToken, setUser } from './redux/slice';
import { useDispatch, UseDispatch } from 'react-redux';
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

const App = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { setItemToStorage, getItemFromStorage } = useLocalStorage('lang');
  const { getItemFromStorage: getTokenFromStorage } = useLocalStorage('baristicaToken'); // Для токена

  const userService = new UserService()

  const getUser = async (token) => {
    setLoading(true)
    try {
      const response = await userService.getUser(token)
      dispatch(setUser(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useScrollToTop()

  useEffect(() => {
    const lang = getItemFromStorage(); // Получаем язык из локального хранилища
    const token = getTokenFromStorage(); // Получаем токен

    if (!lang) {
      setItemToStorage('az'); // Устанавливаем язык по умолчанию
      dispatch(setLang('az'));
      return;
    }

    dispatch(setLang(lang)); // Устанавливаем язык в redux store

    if (token) {
      getUser(token)
      dispatch(setToken(token))
    }
  }, []);

  return (
    <div>
      <Loading status={loading} />
      <HeadBanner />
      <SubHeader />
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App