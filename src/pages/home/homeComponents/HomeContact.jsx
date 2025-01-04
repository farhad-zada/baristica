import React from 'react'
import style from '../homeCss/homeContact.module.css'
import { useSelector } from 'react-redux'

import PagesText from '../../../content/PagesText.json';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, WPIcon, YoutubeIcon } from '../../../icons';

const { home } = PagesText;
const { body } = home;

const HomeContact = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className='homeContact flex j-center' id="contacts">
      <div className='container'>
        <div className={`${style.homeContact_section} flex a-center j-center`}>
          <div className={`${style.homeContact_subscribe} gray`}>
            <div className={`${style.homeContact_top} flex a-center j-between`}>
              <h1 className='f48 fw700 black'>{body[lang].contact.subscribe.title}</h1>
              <div className={`${style.homeContact_socials} flex a-center`}>
                <Link to="https://www.instagram.com/baristica.roastery/" target="_blank" className={`${style.homeContact_social} darkGray rounded`}>
                  {InstagramIcon}
                </Link>
                <Link target="_blank" to="https://www.youtube.com/@BaristicaLife" className={`${style.homeContact_social} darkGray rounded`}>
                  {YoutubeIcon}
                </Link>
              </div>
            </div>
            <p className={`${style.homeContact_description} f20 robotoFont`}>{body[lang].contact.subscribe.description}</p>
          </div>
        </div>
        <div className={`${style.homeContact_contact} flex a-center j-center`}>
          <div className={`${style.homeContact_getInTouch} flex a-center j-between`}>
            <div className={`${style.homeContact_left}`}>
              <h1>{body[lang].contact.getInTouch.title}</h1>
              <p className={`${style.homeContact_getInTouch_address} f24 robotoFont`}>{body[lang].contact.getInTouch.address}</p>
              <p className='f24 robotoFont'>+99 450 433 30 03</p>
              <div className={`${style.homeContact_workTime}`}>
                <h6 className='f24 fw700 robotoFont'>{body[lang].contact.getInTouch.workTime.title}</h6>
                <p className='f24 darkGrey_color robotoFont'>{body[lang].contact.getInTouch.workTime.weekday} 09:00 - 19:00</p>
                <p className='f24 darkGrey_color robotoFont'>{body[lang].contact.getInTouch.workTime.saturday} 10:00 - 14:00</p>
              </div>
              <div className={`${style.homeContact_socials} flex a-center`}>
                <Link to="https://www.instagram.com/baristica.roastery/" target="_blank" className={`${style.homeContact_social} darkGray rounded`}>
                  {InstagramIcon}
                </Link>
                <Link to="https://api.whatsapp.com/send?phone=+994514333003" target="_blank" className={`${style.homeContact_social} darkGray rounded`}>
                  {WPIcon}
                </Link>
                <Link to="https://www.youtube.com/@BaristicaLife" target="_blank" className={`${style.homeContact_social} darkGray rounded`}>
                  {YoutubeIcon}
                </Link>
              </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3039.7549779254905!2d49.83282!3d40.36995700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIyJzExLjkiTiA0OcKwNDknNTguMiJF!5e0!3m2!1sen!2spl!4v1733025964535!5m2!1sen!2spl" width="610" height="400" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContact