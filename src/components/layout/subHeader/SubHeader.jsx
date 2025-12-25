import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./subHeader.module.css";

import { setFavoritesCount, setLang, setProfileActiveTab, setToken, setUser } from "../../../redux/slice";

import PagesText from "../../../content/PagesText.json";
import { useDispatch, useSelector } from "react-redux";
import { CartIcon, Favourites, Search } from "../../../icons";
import AuthService from "../../../services/auth.service";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Loading from "../../loading/Loading";
import { useRefClickOutside } from "../../../hooks/useRefClickOutside";
import { calculateTotalPrice } from "../../../utils/price.util";
import Error from "../../error/Error";

const { header } = PagesText;
const { subHeader } = header;

export default function SubHeader() {
  const { lang, user, token, cart, favoritesCount } = useSelector((state) => state.baristica);

  const [isSearchActive, setIsSearchActive] = useState(false); // State for toggling search input
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("Something went wrong.")

  const searchRef = useRef(null); // Ref for click outside handling
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { removeItemFromStorage } = useLocalStorage('baristicaToken')

  const authService = new AuthService()


  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    dispatch(setLang(lang));
  };

  const goToCart = () => {
    if (token) {
      dispatch(setProfileActiveTab("cart"));
      navigate("/profile");
    } else {
      navigate('/login')
    }
  };

  const logout = async () => {
    setLoading(true)
    try {
      const response = await authService.logout(token)
      if (response.status >= 400) {
        throw new Error("Couldn't log out: application backend is down.")
      }
      dispatch(setToken(false))
      dispatch(setUser({}))
      dispatch(setFavoritesCount(0))
      removeItemFromStorage()
      navigate('/')
    } catch (error) {
      setError(true)
      setMessage(error.message)
    } finally {
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

  const calculateTotalCount = (products) => {
    const count = products.reduce((acc, product) => {

      return acc + product.cartCount;
    }, 0);
    return count;
  }

  useRefClickOutside(searchRef, handleClickOutside)


  return (
    <div className={style.subHeader + " flex j-center"}>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} message={message} />

      <div className="container flex">
        <div className={`${style.subHeader_section} flex a-center j-between w-100`}>
          <h2 className={style.mainHeading + " w-100 fw700"}>{subHeader[lang].headText}</h2>

          <div className="flex j-end w-100">
            <div className={`${style.subHeader_buttons} flex a-center j-end`} ref={searchRef}>
              {/* {isSearchActive ? (
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={searchInput}
                  className={`${style.searchInput} darkGray defaultBtn border32`}
                  onChange={(e) => setSearchInput(e.target.value)}
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
            )} */}
              <span className={`${style.button} darkGray defaultBtn border32 flex a-center`} onClick={() => {
                if (token) {
                  navigate('/favorites')
                } else {
                  navigate('/login')
                }
              }}>
                {Favourites}
                <span className={`${style.badge}`}>{favoritesCount}</span>
              </span>
              <span
                className={`${style.button} darkGray defaultBtn border32 flex a-center`}
                onClick={goToCart}
              >
                {CartIcon}
                <span className={`${style.badge}`}>{calculateTotalCount(cart)}</span>
              </span>
            </div>
            <div className={`${style.product_count} flex column a-start`}>
              <h6 className="f16">{calculateTotalCount(cart)} {subHeader && subHeader[lang].products}</h6>
              <h6 className="f16">{calculateTotalPrice(cart).toFixed(2)} ₼</h6>
            </div>
            {token ? (
              <div className={style.profile_links}>
                <h2 className="f16 fw600 pointer" onClick={() => navigate('/profile')}>{user?.name ? user.name : ""}</h2>
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
    </div>
  );
}