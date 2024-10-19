import React from "react";
import { Link } from "react-router-dom";
import style from "./subHeader.module.css";

import { setLang } from "../../../redux/slice";

import PagesText from "../../../content/PagesText.json";
import { useDispatch, useSelector } from "react-redux";
import { CartIcon, Favourites, Search } from "../../../icons";
const { header } = PagesText;
const { subHeader } = header;

export default function SubHeader() {

  const { lang } = useSelector((state) => state.baristica)

  const dispatch = useDispatch()

  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    dispatch(setLang(lang));
  };


  return (
    <div className={style.subHeader}>
      <div className="container flex">
        <div className={`${style.subHeader_section} flex a-center j-end w-100`}>
          <div className={`${style.subHeader_buttons} flex a-center j-end`}>
            <button className={`${style.button} darkGray defaultBtn border32 flex a-center`}>
              {Search}
            </button>
            <Link to="/" className={`${style.button} darkGray defaultBtn border32 flex a-center`}>
              {Favourites}
            </Link>
            <Link to="/" className={`${style.button} darkGray defaultBtn border32 flex a-center`}>
              {CartIcon}
            </Link>
          </div>
          <div className={`${style.product_count} flex column a-start`}>
            <h6 className="f16">0 {subHeader && subHeader[lang].products}</h6>
            <h6 className="f16">0 ₼</h6>
          </div>
          <div className={`${style.profile_links} flex a-center`}>
            <Link to="/" className="black fw400">{subHeader && subHeader[lang].registration}</Link>
            <Link to="/" className="black fw400">{subHeader && subHeader[lang].login}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
