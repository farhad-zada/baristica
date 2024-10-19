import React, { useEffect, useState } from "react";
import style from "./headBanner.module.css"
import { useSelector } from "react-redux";

import PagesText from "../../../content/PagesText.json";
const { header } = PagesText;
const { headerIntroText } = header;

export default function HeadBanner() {
  const { lang } = useSelector((state) => state.baristica)

  return <div className={`${style.headBanner} tifanny flex j-center fw700 f20`}>{headerIntroText && headerIntroText[lang]}</div>;
}
