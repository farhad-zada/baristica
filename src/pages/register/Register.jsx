import React, { useState } from 'react';
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading';
import InputText from '../../components/form/inputField/InputText';
import AuthButton from '../../components/form/button/AuthButton';
import styles from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageText from '../../content/PagesText.json';
import AuthService from '../../services/auth.service';
import { setToken, setUser } from '../../redux/slice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { handleApiReqRes } from '../../utils/handleApiReqRes.util';


const { register } = PageText;

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); // Для вывода ошибки
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong.")

    const { lang } = useSelector((state) => state.baristica);

    const { setItemToStorage } = useLocalStorage('baristicaToken')

    const authService = new AuthService()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errorMessage) {
            setErrorMessage('')
        }
    };

    const onSubmit = async (e) => {

        // Проверка совпадения паролей
        if (formData.password !== formData.passwordConfirm) {
            const errorText = lang ? register[lang].passwordMismatch : "Passwords do not match";
            setErrorMessage(errorText); // Установить сообщение об ошибке
            return;
        }

        // Очистить сообщение об ошибке, если пароли совпадают
        setErrorMessage("");
        setLoading(true)
        try {
            const request = authService.register({ creds: { ...formData } })
            const response = await handleApiReqRes(request);
            const token = response.data.token
            const user = response.data.user
            if (token) {
                dispatch(setToken(token))
                dispatch(setUser(user))
                setItemToStorage(token)
                navigate('/')
            }
        } catch (error) {
            setError(true)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className={styles.register + ' flex j-center'}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

            <div className="container">
                <AuthorizationHeading
                    heading={lang ? register[lang].heading : ''}
                    subHeading={lang ? register[lang].subHeading : ''}
                />
                <div className="flex j-center ">
                    <form className={styles.form}>
                        <h2 className="f32 fw600 darkGreyColor">{lang ? register[lang].personalInfoHeading : ''}</h2>
                        <InputText
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={lang ? register[lang].nameInput : ''}
                        />
                        <input
                            type={'text'}
                            name={'phone'}
                            value={formData.phone}
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
                            className={styles.input}
                            placeholder={lang ? register[lang].phoneInput : ''}
                        />

                        <InputText
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={lang ? register[lang].emailInput : ''}
                        />
                        <h2 className="f32 fw600 darkGreyColor">{lang ? register[lang].passwordHeading : ''}</h2>
                        <InputText
                            name="password"
                            type='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={lang ? register[lang].passwordInput : ''}
                        />
                        <InputText
                            name="passwordConfirm"
                            type='password'
                            value={formData.passwordConfirm}
                            onChange={handleInputChange}
                            placeholder={lang ? register[lang].repeatPasswordInput : ''}
                        />

                        {errorMessage && ( // Условный рендеринг ошибки
                            <p className="f26 fw400 error">{errorMessage}</p>
                        )}

                        <p className="f16 fw400">{lang ? register[lang].termsConditionsHint : ''}</p>

                        <AuthButton text={lang ? register[lang].submitBtn : ''} onClick={onSubmit} />
                    </form>
                </div>
                <div className={styles.links}>
                    <p className="italic f24 fw400 darkGrey_color">{lang ? register[lang].loginHint : ''}</p>
                    <Link to={'/login'}>{lang ? register[lang].loginBtn : ''}  </Link>
                </div>
            </div>
        </div>
    );
}
