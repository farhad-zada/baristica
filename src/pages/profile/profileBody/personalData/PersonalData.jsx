import React, { useEffect, useState } from 'react'
import InputText from '../../../../components/form/inputField/InputText'
import AuthButton from '../../../../components/form/button/AuthButton';
import AuthService from '../../../../services/auth.service'
import styles from './personalData.module.css'
import { useSelector } from 'react-redux';

import PageText from '../../../../content/PagesText.json'
import Loading from '../../../../components/loading/Loading';
import Error from '../../../../components/error/Error';

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


    const { lang, user, token } = useSelector((state) => state.baristica);
    const authService = new AuthService()

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errorMessage) {
            setErrorMessage('')
        }
    };

    const onSubmit = () => {

    }

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
            handleInputChange('oldPassword', '')
            handleInputChange('newPassword', '')
            handleInputChange('repeatPassword', '')
        } catch (error) {
            setError(true)
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
            <Error status={error} setStatus={setError} />

            <form className={styles.form}>
                <div className="flex j-between g26">
                    <div className="left">
                        <h2 className="f32 fw600 darkGrey_color">{lang ? profile[lang].personalData.personalInfoHeading : ''}</h2>
                        <InputText
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.nameInput : ''}
                        />
                        <InputText
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.phoneInput : ''}
                        />
                        <InputText
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={lang ? profile[lang].personalData.emailInput : ''}
                        />

                        <AuthButton text={lang ? profile[lang].personalData.submitBtn : ''} onClick={onSubmit} />

                    </div>
                    <div className="right">
                        <h2 className="f32 fw600 darkGrey_color">{lang ? profile[lang].personalData.passwordHeading : ''}</h2>


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
