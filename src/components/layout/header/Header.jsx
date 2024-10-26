import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../../redux/slice";
import { Link, NavLink } from "react-router-dom";
import style from "./header.module.css";

import PagesText from "../../../content/PagesText.json";
import { Logo } from "../../../icons";

const { header } = PagesText;
const { headerPageLinks } = header;

export default function Header() {
  const { lang } = useSelector((state) => state.baristica)

  const dispatch = useDispatch()

  const changeLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    dispatch(setLang(newLang));
  };

  return (
    <header className="flex j-center">
      <div className="container flex j-between a-center">
        <div className={`${style.header_section} flex a-center j-between w-100`}>
          <Link to="/" className={`${style.header_logo}`}>
            {Logo}
          </Link>
          <ul className={`${style.menu} flex a-center`}>
            {headerPageLinks[lang].map((elem, index) => (
              <li key={index}>
                <NavLink
                  to={elem.link}
                  className={({ isActive }) => `${style.menu_item} darkGrey_color ${isActive ? style.active : ''}`}

                >
                  {elem.title}
                </NavLink>
              </li>
            ))}
          </ul>
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
        </div>
      </div>
    </header>
  );
}
