import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../../redux/slice";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
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
    <header className="flex j-center" style={{backgroundColor: "#F2F2F2"}}>
      <div className="container flex j-between a-center">
        <div className={`${style.header_section} flex a-center j-between w-100`}>
          <Link to="/" className={`${style.header_logo}`}>
            {Logo}
          </Link>
          <ul className={`${style.menu} flex a-center`}>
            {headerPageLinks[lang].map((elem, index) => (
                <li key={index} className={`${style.menu_item} relative`}>
                  {elem.link === "#contacts" ? 
                    <HashLink
                      smooth
                      to={elem.link === "#contacts" ? "/#contacts" : elem.link}
                      className={({ isActive }) =>
                        `darkGrey_color ${isActive ? style.active : ""}`
                      }
                    >
                      {elem.title}
                    </HashLink>
                  : 
                  <NavLink
                    to={elem.link}
                    className={({ isActive }) =>
                      `darkGrey_color ${isActive ? style.active : ""}`
                    }
                  >
                    {elem.title}
                  </NavLink>
                  }
                  {elem.list && elem.list.length > 0 && (
                    <ul className={style.dropdown}>
                      {elem.list.map((subItem, subIndex) => (
                        <li key={subIndex} className={style.dropdown_item}>
                          <NavLink to={subItem.link}>{subItem.title}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
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
