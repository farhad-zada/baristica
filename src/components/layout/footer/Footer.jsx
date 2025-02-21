import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BaristicaLogo, FacebookIcon, InstagramIcon, WPIcon, YoutubeIcon } from "../../../icons"
import style from "./footer.module.css";

import PagesText from '../../../content/PagesText.json';
import { HashLink } from "react-router-hash-link";

const { footer } = PagesText;

export default function Footer() {
  const { lang } = useSelector((state) => state.baristica)

  return (
    <footer className="gray flex j-center">
      <div className="container">
        <div className={`${style.footer}`}>
          <div className={`${style.footer_top} flex a-center j-between`}>
            <div className={`${style.footer_topLeft} flex a-start`}>
              {footer[lang].menu?.map((elem,i) => (
                <div className="menu" key={i}>
                  <h4 className="f24 fw600 darkGrey_color">{elem.title}</h4>
                  <div className={`${style.menu_links} flex column`}>
                    {elem.list.map((item) => (
                      <>
                        {
                          item.link === "#contacts" ?
                            <HashLink
                              smooth
                              to={item.link === "#contacts" ? "/#contacts" : item.link}
                              className={`${style.menu_link} f16 fw400 darkGrey_color`}
                            >
                              {item.label}
                            </HashLink>
                            :
                            item.link === "#about" ?
                            <HashLink
                              smooth
                              to={item.link === "#about" ? "/#about" : item.link}
                              className={`${style.menu_link} f16 fw400 darkGrey_color`}
                            >
                              {item.label}
                            </HashLink>
                            :
                            item.link === "#homestore" ?
                            <HashLink
                              smooth
                              to={item.link === "#homestore" ? "/#homestore" : item.link}
                              className={`${style.menu_link} f16 fw400 darkGrey_color`}
                            >
                              {item.label}
                            </HashLink>
                            :
                            <Link to={item.link} className={`${style.menu_link} f16 fw400 darkGrey_color`}>{item.label}</Link>
                        }
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={`${style.footer_topRight} flex column`}>
              {BaristicaLogo}
              <Link to="tel:+994 51 433 30 03" className={`${style.footer_num} f32 fw600 darkGrey_color`}>+994 51 433 30 03</Link>
              <div className={`${style.footer_socials} flex a-center`}>
                <Link to="https://www.instagram.com/baristica.az/" target="_blank" className={`${style.footer_social} darkGray rounded`}>
                  {InstagramIcon}
                </Link>
                <Link to="https://api.whatsapp.com/send?phone=+994514333003" target="_blank" className={`${style.footer_social} darkGray rounded`}>
                  {WPIcon}
                </Link>
                <Link to="https://www.youtube.com/@BaristicaLife" target="_blank" className={`${style.footer_social} darkGray rounded`}>
                  {YoutubeIcon}
                </Link>
              </div>
            </div>
          </div>
          <div className={`${style.footer_bottom} flex a-center j-between`}>
            <p className="f16 fw600 darkGrey_color">© 2024 BARISTICA COFFEE ROASTERY</p>
            <Link to="/" className="f16 fw600 darkGrey_color">{footer[lang].privacy_policy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
