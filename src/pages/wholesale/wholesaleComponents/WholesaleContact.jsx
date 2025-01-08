
import React from 'react'
import PagesText from '../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import style from "../wholesaleCss/contact.module.css"
import { Link } from 'react-router-dom';

const { wholesale } = PagesText;

const WholesaleContact = () => {
    const { lang } = useSelector((state) => state.baristica);
    return (
      <div className={`${style.contact} flex j-center`}>
          <div className='container'>
            {wholesale[lang]?.contact?.title?.split('\n\n')?.map((paragraph, index) => {
              const words = paragraph.split(' ');
              return (
                <p className={`${style.contact_title} f96`} key={index}>
                  {words.map((word, i) => (
                    <span
                      key={i}
                      style={index === 1 && i === 0 ? { fontWeight: 'bold' } : index === 1 && i >= 1 ? { color: 'black' } : {}}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </p>
              );
            })}
            <div className={`${style.contact_item} border16 flex j-between a-center`}>
                <h3 className="f32 fw700">{wholesale[lang]?.contact?.label}</h3>
                <Link className={`${style.link} tifanny rounded fw600 f32 black`} to={wholesale[lang]?.contact?.href}>{wholesale[lang]?.contact?.link}</Link>
            </div>
            <hr style={{width: "90%", marginTop: "50px", marginBottom: "0"}}/>
          </div>
      </div>
    )
}

export default WholesaleContact