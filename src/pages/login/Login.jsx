import React, { useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import InputText from '../../components/form/inputField/InputText'
import AuthButton from '../../components/form/button/AuthButton';
import styles from './login.module.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageText from '../../content/PagesText.json'

const { login } = PageText

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { lang } = useSelector((state) => state.baristica);

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {

    }
    return (
        <div className={styles.login + ' flex j-center'}>
            <div className="container">
                <AuthorizationHeading
                 heading={lang ? login[lang].heading : ''} 
                 subHeading={lang ? login[lang].subHeading : ''}  
                 />
                <div className="flex j-center ">
                    <form className={styles.form}>
                        <InputText
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={lang ? login[lang].emailInput : ''}  
                        />
                        <InputText
                            name="password"
                            type='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={lang ? login[lang].passwordInput : ''}  
                        />
                        <AuthButton text={lang ? login[lang].submitBtn : ''}   onClick={onSubmit} />
                    </form>
                    
                </div>
                <div className={styles.links}>
                        <Link to={'/register'}>{lang ? login[lang].registerBtn : ''}  </Link>
                        <Link to={'/resetPassword'}>{lang ? login[lang].resetPassword : ''}  </Link>
                    </div>
            </div>
        </div>
    )
}
