import React from 'react'
import PagesText from '../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import style from "../wholesaleCss/faq.module.css"

const { wholesale } = PagesText;

const WholesaleFAQ = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className={`${style.faq} flex j-center`} id="faq">
        <div className='container'>
            <div className='flex j-center column'>
                <h1 className='f96 fw700'>{wholesale[lang]?.faq?.title}</h1>
                <p className='f32 fw400 robotoFont' style={{paddingTop: "30px"}}>{wholesale[lang]?.faq?.lable}</p>
                <div className={`${style.faqs}`}>
                    {wholesale[lang]?.faq?.list?.map((elem) => (
                        <div className={`${style.faq_elem} border16`}>
                            <h1 className='f56'>{elem.title}</h1>
                            {elem?.labels?.map((label, index) => (
                                elem?.labels?.length > 1 ?
                                    <div className={`${style.label} flex a-center`}>
                                        <h1 className={`${style.label_num} f80`}>{index+1}</h1>
                                        <p className={`${style.label_text} f32 robotoFont`}>{label}</p>
                                    </div> 
                                : 
                                <div className={`${style.label} flex a-center`}>
                                    <p className={`${style.label_text} f32 robotoFont`}>{label}</p>
                                </div> 
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WholesaleFAQ