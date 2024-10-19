import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, LinkedinIcon, RIDS, YoutubeIcon } from "../../../icons"
import PagesText from "../../../content/PagesText.json";
import "./footer.css";

const { footer } = PagesText;

export default function Footer() {
  const { lang } = useSelector((state) => state.baristica)
  return (
    <footer>
      <div className="container">
      </div>
    </footer>
  );
}
