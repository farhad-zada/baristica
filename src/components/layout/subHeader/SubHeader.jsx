import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./subHeader.module.css";

import { setLang, setProfileActiveTab, setToken, setUser } from "../../../redux/slice";

import PagesText from "../../../content/PagesText.json";
import { useDispatch, useSelector } from "react-redux";
import { CartIcon, Favourites, Search } from "../../../icons";
import AuthService from "../../../services/auth.service";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Loading from "../../loading/Loading";
import { useRefClickOutside } from "../../../hooks/useRefClickOutside";

const { header } = PagesText;
const { subHeader } = header;

export default function SubHeader() {
  const { lang, user, token } = useSelector((state) => state.baristica);

  const [isSearchActive, setIsSearchActive] = useState(false); // State for toggling search input
  const [searchInput, setSearchInput] = useState(""); 
  const [loading,setLoading] = useState(false)
  const searchRef = useRef(null); // Ref for click outside handling
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {removeItemFromStorage} = useLocalStorage('baristicaToken')

  const authService = new AuthService()


  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    dispatch(setLang(lang));
  };

  const goToCart = () => {
    dispatch(setProfileActiveTab("cart"));
    navigate("/profile");
  };

  const logout = async () => {
    setLoading(true)
    try {
      const response = await authService.logout(token)
      dispatch(setToken(false))
      dispatch(setUser({}))
      removeItemFromStorage()
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
  }

  const handleSearchToggle = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the document
    setIsSearchActive(true);
  };
  
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false); // Close search input if clicked outside
    }
  };
  
  useRefClickOutside(searchRef, handleClickOutside)


  return (
    <div className={style.subHeader + " flex j-center"}>
      <Loading  status={loading}/>
      <div className="container flex">
        <div className={`${style.subHeader_section} flex a-center j-end w-100`}>
          <div className={`${style.subHeader_buttons} flex a-center j-end`} ref={searchRef}>
            {isSearchActive ? (
              <div style={{position: "relative"}}>
                <input
                  type="text"
                  value={searchInput}
                  className={`${style.searchInput} darkGray defaultBtn border32`}
                  onChange={(e)=>setSearchInput(e.target.value)}
                  placeholder={subHeader && subHeader[lang].searchPlaceholder}
                />
                <button className={style.clear} onClick={() => setSearchInput("")}>
                  <svg data-v-00e70212="" height="9" width="9" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.195.205a.7.7 0 1 0-.99.99l2.899 2.899L.206 6.99a.7.7 0 0 0 .99.99l2.898-2.897 2.898 2.898a.7.7 0 1 0 .99-.99L5.084 4.094 7.98 1.196a.7.7 0 1 0-.99-.99L4.094 3.104 1.195.205Z"></path></svg>
                </button>
              </div>
            ) : (
              <button
                className={`${style.button} darkGray defaultBtn border32 flex a-center`}
                onClick={handleSearchToggle}
              >
                {Search}
              </button>
            )}
            <Link to="/" className={`${style.button} darkGray defaultBtn border32 flex a-center`}>
              {Favourites}
            </Link>
            <span
              className={`${style.button} darkGray defaultBtn border32 flex a-center`}
              onClick={goToCart}
            >
              {CartIcon}
            </span>
          </div>
          <div className={`${style.product_count} flex column a-start`}>
            <h6 className="f16">0 {subHeader && subHeader[lang].products}</h6>
            <h6 className="f16">0 ₼</h6>
          </div>
          {token ? (
            <div className={style.profile_links}>
              <h2 className="f16 fw600">{user?.name ? user.name : "Narmina"}</h2>
              <h2 className="pointer f16 fw400" onClick={logout}>{lang ? subHeader[lang].logoutBtn : ""}</h2>
            </div>
          ) : (
            <div className={`${style.profile_links} flex a-center`}>
              <Link to="/register" className="black fw400">
                {subHeader && subHeader[lang].registration}
              </Link>
              <Link to="/login" className="black fw400">
                {subHeader && subHeader[lang].login}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}