import React, { useEffect, useState } from 'react'
import InputText from '../../../../components/form/inputField/InputText'
import AuthButton from '../../../../components/form/button/AuthButton';
import AuthService from '../../../../services/auth.service'
import styles from './personalData.module.css'
import { useDispatch, useSelector } from 'react-redux';

import PageText from '../../../../content/PagesText.json'
import Loading from '../../../../components/loading/Loading';
import Error from '../../../../components/error/Error';
import UserService from '../../../../services/user.service';
import Success from '../../../../components/success/Success';
import { setUser } from '../../../../redux/slice';
import { handleApiReqRes } from '../../../../utils/handleApiReqRes.util';


const { profile, register } = PageText

export default function PersonalData() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); // Для вывода ошибки
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong.")
    const [success, setSuccess] = useState(false)


    const { lang, user, token } = useSelector((state) => state.baristica);
    const authService = new AuthService()
    const userService = new UserService()
    const dispatch = useDispatch()

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errorMessage) {
            setErrorMessage('')
        }
    };
    const changePassword = async () => {
        if (formData.newPassword !== formData.repeatPassword) {
            const errorText = lang ? register[lang].passwordMismatch : "Passwords do not match";
            setErrorMessage(errorText); // Установить сообщение об ошибке
            return;
        }

        // Очистить сообщение об ошибке, если пароли совпадают
        setErrorMessage("");

        const data = {
            creds: {
                "oldPassword": formData.oldPassword,
                "password": formData.newPassword,
                "passwordConfirm": formData.repeatPassword
            }
        }
        setLoading(true)
        try {
            const response = await authService.updatePassword(token, data)
            if
                (response.status >= 400) {
                throw new Error("Couldn't change password: " + response.data.message);
            }
            handleInputChange('oldPassword', '')
            handleInputChange('newPassword', '')
            handleInputChange('repeatPassword', '')
        } catch (error) {
            setError(true)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const changePersonalData = async () => {

        const data = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
        }

        setLoading(true)
        try {
            const request = userService.changePersonalData(token, data)
            const response = await handleApiReqRes(request);
            dispatch(setUser(response.data.user))
            setSuccess(true)
        } catch (error) {
            setError(true)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            setFormData(user)
        }
    }, [user])
    return (
        <div className={styles.personalData}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />
            <Success status={success} setStatus={setSuccess} navigateTo='no' />

            <form className={styles.form}>
                <div className="flex j-between g26">
                    <div className="left">
                        <h2 className="f32 fw600 darkGrey_color robotoFont">{lang ? profile[lang].personalData.personalInfoHeading : ''}</h2>
                        <InputText
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.nameInput : ''}
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
                            placeholder={lang ? profile[lang].personalData.phoneInput : ''}
                        />

                        <InputText
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.emailInput : ''}
                        />
                        <AuthButton text={lang ? profile[lang].personalData.submitBtn : ''} onClick={changePersonalData} />
                    </div>
                    <div className="right">
                        <h2 className="f32 fw600 darkGrey_color robotoFont">{lang ? profile[lang].personalData.passwordHeading : ''}</h2>
                        <InputText
                            name="oldPassword"
                            type='password'
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.oldPasswordInput : ''}
                        />
                        <InputText
                            name="newPassword"
                            type='password'
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.newPasswordInput : ''}
                        />
                        <InputText
                            name="repeatPassword"
                            type='password'
                            value={formData.repeatPassword}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.repeatPasswordInput : ''}
                        />
                        {errorMessage && ( // Условный рендеринг ошибки
                            <p className="f26 fw400 error">{errorMessage}</p>
                        )}
                        <AuthButton text={lang ? profile[lang].personalData.changePassword : ''} onClick={changePassword} />
                    </div>
                </div>

                {/* <div className="w-48">
                </div> */}
            </form>
        </div>
    )
}
