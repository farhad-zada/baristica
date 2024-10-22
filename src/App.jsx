import React, {useEffect} from 'react'
import { setLang } from './redux/slice';
import { useDispatch, UseDispatch } from 'react-redux';
import HeadBanner from "./components/layout/headBanner/HeadBanner"
import SubHeader from "./components/layout/subHeader/SubHeader"
import Header from './components/layout/header/Header';
import AppRoutes from './AppRoutes';
import "./assets/css/main.css"
import Footer from './components/layout/footer/Footer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    
    if (!lang) {
      localStorage.setItem("lang", "az");
      dispatch(setLang(lang));
      return;
    }
    dispatch(setLang(lang));
  }, []);
  return (
    <div>
      <HeadBanner/>
      <SubHeader/>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </div>
  )
}

export default App