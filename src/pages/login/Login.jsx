import React, { useState } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import InputText from '../../components/form/inputField/InputText'
import AuthButton from '../../components/form/button/AuthButton';
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageText from '../../content/PagesText.json'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AuthService from '../../services/auth.service';
import { setToken } from '../../redux/slice';

const { login } = PageText

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { lang } = useSelector((state) => state.baristica);

    const { setItemToStorage } = useLocalStorage('baristicaToken')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authService = new AuthService()

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async () => {
        try {
            const response = await authService.login({creds: {...formData}})
            const token = response?.data?.token || true
            if (token) {
                dispatch(setToken(token))
                setItemToStorage(token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
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
                        <AuthButton text={lang ? login[lang].submitBtn : ''} onClick={onSubmit} />
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
