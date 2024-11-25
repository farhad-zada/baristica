import React from 'react'
import InputText from '../../../components/form/inputField/InputText';
import style from "../wholesaleCss/form.module.css"
import { useSelector } from 'react-redux';
import PagesText from '../../../content/PagesText.json';
const { wholesale } = PagesText;


const WholesaleForm = () => {
  const { lang } = useSelector((state) => state.baristica);
  const handleInputChange = () => {
    console.log(1)
  }
  return (
    <div className={`${style.form} flex j-center`}>
      <div className="container">
        <div className={`${style.form_section} flex a-start`}>
          <div className={`${style.form_elem}`}>
            <h1 className="f60 f700">{wholesale[lang]?.form?.title}</h1>
            <div className={`${style.form_list}`}>
              {wholesale[lang]?.form?.list?.map((elem) => (
                <div className={`${style.elem} border16 f20 flex a-center`}>
                  <img src={elem?.icon}/>
                  <p>{elem?.title}</p>
                </div>
              ))}
            </div>
          </div>
          <form className={`${style.price_form} border16`}>
            <InputText
              name="name"
              value=""
              onChange={handleInputChange}
              placeholder={lang ? wholesale[lang]?.form?.form?.name : ''}
            />
            <InputText
              name="phone"
              value=""
              onChange={handleInputChange}
              placeholder={lang ? wholesale[lang]?.form?.form?.phone : ''}
            />
            <InputText
              name="mail"
              value=""
              onChange={handleInputChange}
              placeholder={lang ? wholesale[lang]?.form?.form?.mail : ''}
            />
            <button className={`${style.button} border40 tifanny fw600 f32`}>{wholesale[lang]?.form?.form?.link}</button>
            <p>{wholesale[lang]?.form?.form?.rule}</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WholesaleForm