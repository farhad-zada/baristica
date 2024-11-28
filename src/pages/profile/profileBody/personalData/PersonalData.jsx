import React, { useEffect, useState } from 'react'
import InputText from '../../../../components/form/inputField/InputText'
import AuthButton from '../../../../components/form/button/AuthButton';
import styles from './personalData.module.css'
import { useSelector } from 'react-redux';

import PageText from '../../../../content/PagesText.json'

const { profile } = PageText

export default function PersonalData() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
    });
    const { lang, user } = useSelector((state) => state.baristica);

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {

    }

    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            setFormData(user)
        }
    }, [user])
    return (
        <div className={styles.personalData}>
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
                    </div>
                </div>

                <div className="w-48">
                    <AuthButton text={lang ? profile[lang].personalData.submitBtn : ''} onClick={onSubmit} />
                </div>
            </form>
        </div>
    )
}
