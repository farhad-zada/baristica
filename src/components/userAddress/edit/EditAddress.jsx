import React, { useEffect, useState } from 'react'
import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux';
import styles from './editAddress.module.css'
import InputText from '../../form/inputField/InputText';
import Loading from '../../loading/Loading';
import UserService from '../../../services/user.service';
import Error from '../../error/Error';
const { profile } = pageText

export default function EditAddress({ address, setAddresses, setEdit }) {
    const { lang, token } = useSelector((state) => state.baristica);

    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong")

    const userService = new UserService()

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateAddress = async (id, formData) => {
        const data = {
            "address": {
                ...formData
            }
        }
        setLoading(true)
        try {
            const response = await userService.editAddress(token, id, data)
            if (response.status >= 400) {
                throw new Error("Couldn't edit address: Application backend is down.");
            }
            setAddresses((prevAddresses) =>
                prevAddresses.map((address) =>
                    address._id === id ? { id: address._id, ...formData } : address
                )
            );
            setEdit(false)

        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    };

    const checkBoxChange = (bool) => {
        setFormData({ ...formData, isPrimary: bool })
    }

    const onSubmit = async () => {
        await handleUpdateAddress(formData._id, formData)
    }

    useEffect(() => {
        if (address) {
            setFormData(address)
        }

    }, [address])

    useEffect(() => {
        return () => {
            setFormData({})
        }
    }, [])

    return (
        <div className={styles.edit}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

            <h2 className={styles.heading + " f28 fw600 darkGrey_color robotoFont"}>{lang ? profile[lang].addresses.changeAddress : ''}</h2>

            <form action="">
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
                    <span className='f16 fw400 darkGrey_color'>{lang ? profile[lang].addresses.doMain : ''}</span>
                    <div className="flex a-center g8 pointer">
                        <input id='yes' name='main' type="radio" onChange={() => { checkBoxChange(true) }} />
                        <label htmlFor='yes' className='f16 fw400 darkGrey_color'>{lang ? profile[lang].addresses.yes : ''}</label>
                    </div>
                    <div className="flex a-center g8 pointer">
                        <input id='no' name='main' type="radio" onChange={() => { checkBoxChange(false) }} />
                        <label htmlFor='no' className='f16 fw400 darkGrey_color'>{lang ? profile[lang].addresses.no : ''}</label>
                    </div>
                </div>

                <button
                    type='button'
                    className={styles.saveBtn}
                    onClick={onSubmit}
                >
                    {lang ? profile[lang].addresses.saveBtn : ''}
                </button>
            </form>
        </div>
    )
}
