import React, { useState } from 'react'
import InputText from '../../../components/form/inputField/InputText';
import style from "../wholesaleCss/form.module.css"
import { useSelector } from 'react-redux';
import PagesText from '../../../content/PagesText.json';
import Loading from '../../../components/loading/Loading';
import PriceTableService from '../../../services/priceTable.service';
import Error from '../../../components/error/Error';
import Success from '../../../components/success/Success';
const { wholesale } = PagesText;


const WholesaleForm = () => {
  const { lang } = useSelector((state) => state.baristica);
  const [data, setData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const priceTableService = new PriceTableService()

  const handleInputChange = (name, value) => {
    setData(state => {
      return { ...state, [name]: value }
    })
  }

  const submitForm = async () => {
    setLoading(true)
    try {
      await priceTableService.getPriceTable(data)
      setSuccess(true)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={`${style.form} flex j-center`} id="price">
      <Loading status={loading} />
      <Error status={error} setStatus={setError} />
      <Success status={success} setStatus={setSuccess} />

      <div className="container">
        <div className={`${style.form_section} flex a-start`}>
          <div className={`${style.form_elem}`}>
            <h1 className="f60 f700">{wholesale[lang]?.form?.title}</h1>
            <div className={`${style.form_list}`}>
              {wholesale[lang]?.form?.list?.map((elem) => (
                <div className={`${style.elem} border16 f20 flex a-center`}>
                  <div dangerouslySetInnerHTML={{ __html: elem?.icon }} />
                  <p style={{ paddingLeft: "28px" }}>{elem?.title}</p>
                </div>
              ))}
            </div>
          </div>
          <form className={`${style.price_form} border16`}>
            <InputText
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder={lang ? wholesale[lang]?.form?.form?.name : ''}
            />
            <input
              type={'text'}
              name={'phone'}
              value={data.phone}
              onChange={(e) => {
                const inputValue = e.target.value;

                // Удаляем все символы, кроме +0123456789
                let filteredValue = inputValue.replace(/[^+0123456789]/g, '');
            
                // Проверяем, если плюс не на первом месте, удаляем его
                if (filteredValue.indexOf('+') > 0) {
                  filteredValue = filteredValue.replace(/\+/g, '');
                }
            
                // Если плюс не первый символ, но пользователь пытается его ввести, игнорируем
                if (inputValue.includes('+') && filteredValue.indexOf('+') !== 0) {
                  filteredValue = filteredValue.replace(/\+/g, '');
                }
                handleInputChange(e.target.name, filteredValue)
              }}
              className={style.input}
              placeholder={lang ? wholesale[lang]?.form?.form?.phone : ''}
            />
           
            <InputText
              name="email"
              value={data.email}
              onChange={handleInputChange}
              placeholder={lang ? wholesale[lang]?.form?.form?.mail : ''}
            />
            <button className={`${style.button} border40 tifanny fw600 f32 pointer`} type='button' onClick={submitForm}>{wholesale[lang]?.form?.form?.link}</button>
            <p>{wholesale[lang]?.form?.form?.rule}</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WholesaleForm