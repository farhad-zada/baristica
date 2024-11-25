import React from 'react'
import style from "../wholesaleCss/cooperation.module.css"
import { useSelector } from 'react-redux';
import PagesText from '../../../content/PagesText.json';
import { Link } from 'react-router-dom';
import coop from "../../../assets/img/coop.jpeg"
import coop2 from "../../../assets/img/coop2.jpeg"

const { wholesale } = PagesText;

const WholesaleCooperation = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className={`${style.cooperation} flex j-center`}>
        <div className='container'>
            <h1 className={`${style.cooperation_title} f64`}>{wholesale[lang]?.cooperation?.title}</h1>
            <div className={`${style.cooperations} flex`}>
                {wholesale[lang]?.cooperation?.elems?.map((elem) => (
                    <div className={`${style.cooperation_item} flex a-start j-start border16`} key={elem.title}>
                        <div className={style.cooperation_item_inner}>
                            <h1 className={`${style.title} f48`}>{elem.title}</h1>
                            <hr style={{width: "20%", margin: "25px 0 0 0"}}/>
                            <div className={style.list}>
                                {elem?.list?.map((item) => (<p className={`${style.elem_subtitle} f20`} key={item}>{item}</p>))}
                            </div>
                            <Link className="f24 fw700 border40" to={elem?.href}>{elem?.link}</Link>
                        </div>
                        <img src={elem?.img == "coop" ? coop : coop2}></img>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default WholesaleCooperation