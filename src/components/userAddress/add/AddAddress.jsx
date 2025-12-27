import React, { useEffect, useState } from 'react'
import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './addAddress.module.css'
import InputText from '../../form/inputField/InputText'
import UserService from '../../../services/user.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../error/Error'
import { handleApiReqRes } from '../../../utils/handleApiReqRes.util'

const { profile } = pageText

export default function AddAddress({ dispatch, setAdd }) {
    const { lang, token } = useSelector(state => state.baristica)

    const [formData, setFormData] = useState({
        city: '',
        street: '',
        apartment: '',
        isPrimary: false
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('Something went wrong')

    const userService = new UserService()

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const checkBoxChange = (bool) => {
        setFormData(prev => ({ ...prev, isPrimary: bool }))
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            const request = userService.addAddress(token, {
                address: formData
            })

            const response = await handleApiReqRes(request)
            console.log("RESPONSE: ", response)
            // IMPORTANT: use backend-returned addresses to update state
            dispatch({ type: 'INIT', payload: response.data.addresses })

            setAdd(false)
        } catch (err) {
            setError(true)
            setMessage(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            setFormData({
                city: '',
                street: '',
                apartment: '',
                isPrimary: false
            })
        }
    }, [])

    return (
        <div className={styles.add}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

            <h2 className={`${styles.heading} f28 fw600 darkGrey_color robotoFont`}>
                {lang ? profile[lang].addresses.newAddress : ''}
            </h2>

            <form>
                <InputText
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={lang ? profile[lang].addresses.cityInput : ''}
                />

                <InputText
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder={lang ? profile[lang].addresses.streetInput : ''}
                />

                <InputText
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder={lang ? profile[lang].addresses.houseInput : ''}
                />

                <div className="flex g10">
                    <span className="f16 fw400 darkGrey_color">
                        {lang ? profile[lang].addresses.doMain : ''}
                    </span>

                    <label className="flex a-center g8 pointer">
                        <input
                            type="radio"
                            checked={formData.isPrimary === true}
                            onChange={() => checkBoxChange(true)}
                        />
                        {lang ? profile[lang].addresses.yes : ''}
                    </label>

                    <label className="flex a-center g8 pointer">
                        <input
                            type="radio"
                            checked={formData.isPrimary === false}
                            onChange={() => checkBoxChange(false)}
                        />
                        {lang ? profile[lang].addresses.no : ''}
                    </label>
                </div>

                <button
                    type="button"
                    className={styles.saveBtn}
                    onClick={onSubmit}
                >
                    {lang ? profile[lang].addresses.saveBtn : ''}
                </button>
            </form>
        </div>
    )
}