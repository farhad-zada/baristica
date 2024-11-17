import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InstagramIcon, YoutubeIcon } from '../../../icons';
import style from "../contactsCss/address.module.css";
import PagesText from '../../../content/PagesText.json';

const { contacts } = PagesText;

const ContactsAddress = () => {
  const { lang } = useSelector((state) => state.baristica);

  return (
    <div className="flex j-center">
      <div className='container'>
        {contacts[lang].contact?.map((elem) => {
          const [firstWord, ...rest] = elem.title.split(" ")
          return (
            <div key={elem.title} className={`${style.wholesale_contact} flex a-center j-center`}>
              <div className={`${style.wholesale_getInTouch} flex a-center j-between`}>
                <div className={`${style.wholesale_left}`}>
                  {/* Split title and style the first word */}
                  <h1>
                    <span className="tifanny_color">{firstWord}</span> {rest.join(" ")}
                  </h1>
                  <p className={`${style.wholesale_getInTouch_address} f24`}>{elem.address}</p>
                  <p className='f24'>+99 450 433 30 03</p>
                  <div className={`${style.wholesale_workTime}`}>
                    <h6 className='f24 fw700'>{elem.workTime.title}</h6>
                    <p className='f24 darkGrey_color'>{elem.workTime.weekday} 09:00 - 19:00</p>
                    <p className='f24 darkGrey_color'>{elem.workTime.saturday} 10:00 - 14:00</p>
                  </div>
                  <div className={`${style.wholesale_socials} flex a-center`}>
                    <Link to="" className={`${style.wholesale_social} darkGray rounded`}>
                      {InstagramIcon}
                    </Link>
                    <Link to="" className={`${style.wholesale_social} darkGray rounded`}>
                      {YoutubeIcon}
                    </Link>
                  </div>
                </div>
                <iframe src={elem.map} width="610" height="400" style={{ border: "none" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsAddress;
