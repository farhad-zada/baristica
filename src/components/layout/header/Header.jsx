import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../../redux/slice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import AuthService from "../../../services/auth.service";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import style from "./header.module.css";

import PagesText from "../../../content/PagesText.json";
import { DownHeader, Logo } from "../../../icons";

import { setToken, setUser } from "../../../redux/slice";

const { header } = PagesText;
const { headerPageLinks } = header;

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [size, setSize] = useState("")
  const [menu, setMenu] = useState(false)
  const { lang, user, token } = useSelector((state) => state.baristica)
  const navigate = useNavigate();
  const authService = new AuthService()
  const dispatch = useDispatch()

  const { removeItemFromStorage } = useLocalStorage('baristicaToken')

  const changeLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    dispatch(setLang(newLang));
  };

  const logout = async () => {
      const response = await authService.logout(token)
      dispatch(setToken(false))
      dispatch(setUser({}))
      removeItemFromStorage()
      navigate('/')
  }

  useEffect(() => {
    // Toggle the body class based on mobileMenu state
    if (mobileMenu) {
      document.body.classList.add("noOverwlowY");
      document.getElementsByClassName("menu_body")[0].classList.add("body-overlay");
    } else {
      document.body.classList.remove("noOverwlowY");
      document.getElementsByClassName("menu_body")[0].classList.remove("body-overlay");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("noOverwlowY");
      document.getElementsByClassName("menu_body")[0].classList.remove("body-overlay");
    };
  }, [mobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  },[])

  useEffect(() => {
    size > 960 && setMobileMenu(false)
  }, [size])
  
  return (
    <header className="flex j-center" style={{ backgroundColor: "#F2F2F2" }}>
      <div className="container flex j-between a-center">
        <div className={`${style.header_section} flex a-center j-between w-100`}>
          <Link to="/" className={`${style.header_logo}`}>
            {Logo}
          </Link>
          <div className="menu_body">
            <ul className={`${style.menu} ${mobileMenu ? `flex a-center ${style.show_menu}` : `flex a-center`} `}>
              <span className={style.close_menu} onClick={() => setMobileMenu(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                  <path d="M2 2.54395L28 28.5439" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M28 2.54395L2 28.5439" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {headerPageLinks[lang].map((elem, index) => (
                <li key={index} className={`${style.menu_item} relative`}>
                  {elem.link === "#contacts" ?
                    <HashLink 
                      smooth
                      to={elem.link === "#contacts" ? "/#contacts" : elem.link}
                      className={`darkGrey_color`}
                      onMouseEnter={() => setMenu(elem.list.length > 0 && window.innerWidth > 960 && true)}
                      onMouseLeave={() => setMenu(elem.list.length > 0 && window.innerWidth > 960 && false)}
                      onClick={() => {setMenu(elem.list.length > 0 && window.innerWidth < 960 && !menu);setMobileMenu(false)}}
                    >
                      {elem.title}
                    </HashLink>
                    : elem.link === "/catalog" ?
                      <span
                        className={`darkGrey_color flex a-center pointer`}
                        onClick={() => {setMenu(!menu)}}
                      >
                        {elem.title}
                        {DownHeader}
                      </span>
                      : elem.link === '#faq'
                        ?
                        <HashLink
                          smooth
                          to={elem.link === "#faq" ? "/wholesale/#faq" : elem.link}
                          onClick={() => {setMenu(elem.list.length > 0 && window.innerWidth < 960 && !menu);setMobileMenu(false)}}
                          className={({ isActive }) =>
                            `darkGrey_color ${isActive ? style.active : ""}`
                          }
                        >
                          {elem.title}
                        </HashLink>
                        :
                        <NavLink
                          to={elem.link}
                          onMouseEnter={() => setMenu(elem.list.length > 0 && window.innerWidth > 960 && true)}
                          onMouseLeave={() => setMenu(elem.list.length > 0 && window.innerWidth > 960 && false)}
                          onClick={() => {setMenu(elem.list.length > 0 && window.innerWidth < 960 && !menu);setMobileMenu(false)}}
                          className={'darkGrey_color'}
                        >
                          {elem.title}
                        </NavLink>
                  }
                  {elem.list && elem.list.length > 0 && (
                    <ul className={`${style.dropdown} ${menu ? style.show : ''}`}>
                      {elem.list.map((subItem, subIndex) => (
                        <li key={subIndex} className={style.dropdown_item}>
                          <NavLink to={subItem.link}>{subItem.title}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {window.innerWidth < 960 ?
                token ? (
                  <div className={style.profile_links}>
                    <h2 className="f20 white fw700 pointer" onClick={() => navigate('/profile')}>{user?.name ? user.name : ""}</h2>
                    <h2 className="pointer f20 white fw700" onClick={logout}>{lang ? header?.subHeader[lang].logoutBtn : ""}</h2>
                  </div>
                ) : (
                  <div className={`${style.profile_links} ${style.header_auth} flex a-end column`}>
                    <Link to="/register" className="f20 white fw700">
                      {header?.subHeader && header?.subHeader[lang]?.registration}
                    </Link>
                    <Link to="/login" className="f20 white fw700">
                      {header?.subHeader && header?.subHeader[lang]?.login}
                    </Link>
                  </div>
                )
                : null
              }
            </ul>
          </div>
          <div className="flex a-center">
            <div className={`${style.languages} flex a-center`}>
              {["az", "en", "ru"].map((langCode) => (
                <span
                  key={langCode}
                  className={`black f16 fw700 ${lang === langCode ? style.active : ''}`}
                  onClick={() => changeLang(langCode)}
                >
                  {langCode.toUpperCase()}
                </span>
              ))}
            </div>
            <span className={style.menu_btn} onClick={() => setMobileMenu(!menu)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M25 1.42857C25 1.80745 24.8537 2.17081 24.5932 2.43872C24.3327 2.70663 23.9795 2.85714 23.6111 2.85714H1.38889C1.02053 2.85714 0.667263 2.70663 0.406796 2.43872C0.146329 2.17081 0 1.80745 0 1.42857C0 1.04969 0.146329 0.686328 0.406796 0.418419C0.667263 0.15051 1.02053 0 1.38889 0H23.6111C23.9795 0 24.3327 0.15051 24.5932 0.418419C24.8537 0.686328 25 1.04969 25 1.42857ZM25 10C25 10.3789 24.8537 10.7422 24.5932 11.0102C24.3327 11.2781 23.9795 11.4286 23.6111 11.4286H1.38889C1.02053 11.4286 0.667263 11.2781 0.406796 11.0102C0.146329 10.7422 0 10.3789 0 10C0 9.62112 0.146329 9.25776 0.406796 8.98985C0.667263 8.72194 1.02053 8.57143 1.38889 8.57143H23.6111C23.9795 8.57143 24.3327 8.72194 24.5932 8.98985C24.8537 9.25776 25 9.62112 25 10ZM23.6111 20C23.9795 20 24.3327 19.8495 24.5932 19.5816C24.8537 19.3137 25 18.9503 25 18.5714C25 18.1925 24.8537 17.8292 24.5932 17.5613C24.3327 17.2934 23.9795 17.1429 23.6111 17.1429H9.02793C8.65957 17.1429 8.3063 17.2934 8.04584 17.5613C7.78537 17.8292 7.63904 18.1925 7.63904 18.5714C7.63904 18.9503 7.78537 19.3137 8.04584 19.5816C8.3063 19.8495 8.65957 20 9.02793 20H23.6111Z" fill="#54565A" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
