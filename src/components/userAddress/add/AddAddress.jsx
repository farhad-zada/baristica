import React, { useEffect, useState } from 'react'
import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux';
import styles from './addAddress.module.css'
import InputText from '../../form/inputField/InputText';
const { profile } = pageText

export default function AddAddress({ setAddresses, setAdd }) {
    const { lang } = useSelector((state) => state.baristica);

    // ask Farhad to return me object or entire array in response of adding address to set live
    const [formData, setFormData] = useState({
        id: 3,
        city: "",
        street: "",
        house: "",
    })

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateAddress = (formData) => {
        setAddresses((prevState) => [...prevState, formData]);
    };

    const onSubmit = () => {
        handleUpdateAddress(formData)
        setAdd(false)
    }

    useEffect(() => {
        return () => {
            setFormData({
                id: 3,
                city: "",
                street: "",
                house: "",
            })
        }
    }, [])

    return (
        <div className={styles.add}>

            <h2 className={styles.heading + " f28 fw600 darkGrey_color"}>{lang ? profile[lang].addresses.newAddress : ''}</h2>

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
                    name="house"
                    value={formData.house}
                    onChange={handleInputChange}
                    placeholder={lang ? profile[lang].addresses.houseInput : ''}
                />


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
