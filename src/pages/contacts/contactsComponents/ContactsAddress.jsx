import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InstagramIcon, WPIcon, YoutubeIcon } from '../../../icons';
import style from "../contactsCss/address.module.css";
import PagesText from '../../../content/PagesText.json';

const { contacts } = PagesText;

const ContactsAddress = () => {
  const { lang } = useSelector((state) => state.baristica);
  const [phone, setPhone] = useState("")

//   const openWhatsApp = () => {
//     const whatsappUrl = `https://wa.me/${phone}`;
//     window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
// };

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
                  <p className={`${style.wholesale_getInTouch_address} robotoFont f24`}>{elem.address}</p>
                  <p className='f24 robotoFont'>{elem?.phone}</p>
                  <div className={`${style.wholesale_workTime}`}>
                    <h6 className='f24 fw700 robotoFont'>{elem.workTime.title}</h6>
                    <p className='f24 darkGrey_color robotoFont'>{elem.workTime.weekday} {elem.workTime.weekday_hours}</p>
                    <p className='f24 darkGrey_color robotoFont'>{elem.workTime.saturday} {elem.workTime.weekend_hours}</p>
                  </div>
                  <div className={`${style.wholesale_socials} flex a-center`}>
                    <Link target="_blank" to="https://www.instagram.com/baristica.roastery/" className={`${style.wholesale_social} darkGray rounded`}>
                      {InstagramIcon}
                    </Link>
                    <span
                      onClick={() => {
                        if (elem?.phone) {
                          window.open(`https://wa.me/${elem?.phone.replace(/[\+\s]/g, '')}`, '_blank', 'noopener,noreferrer');
                        } else {
                          console.error("Phone number is missing or invalid.");
                        }
                      }}
                      className={`${style.wholesale_social} darkGray rounded`}
                    >
                      {WPIcon}
                    </span>
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
