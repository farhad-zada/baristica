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
import { setFavoritesCount, setToken, setUser } from '../../redux/slice';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import FavoritesService from '../../services/favorites.service';

const { login } = PageText

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong.")
    const { lang } = useSelector((state) => state.baristica);

    const { setItemToStorage } = useLocalStorage('baristicaToken')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authService = new AuthService()
    const favoritesService = new FavoritesService()
    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getFavorites = async (page, token) => {
        setLoading(true)
        try {
            const request = favoritesService.getFavorites(token, page)
            const response = await handleApiReqRes(request);
            dispatch(setFavoritesCount(response.data.length))
        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            const request = authService.login({ creds: { ...formData } })
            const response = await handleApiReqRes(request);
            const token = response?.data?.token || true
            const user = response.data.user
            if (token) {
                dispatch(setToken(token))
                dispatch(setUser(user))
                setItemToStorage(token)
                navigate('/')
                getFavorites(1, token)
            }
        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className={styles.login + ' flex j-center'}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

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
