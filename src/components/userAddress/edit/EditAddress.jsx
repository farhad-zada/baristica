import React, { useEffect, useState } from 'react'
import pageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux';
import styles from './editAddress.module.css'
import InputText from '../../form/inputField/InputText';
const { profile } = pageText

export default function EditAddress({ address, setAddresses, setEdit }) {
    const { lang } = useSelector((state) => state.baristica);

    const [formData, setFormData] = useState({})

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateAddress = (id, formData) => {
        setAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
                address.id === id ? { id: address.id, ...formData } : address
            )
        );
    };

    const checkBoxChange = (bool) => {
        setFormData({ ...formData, main: bool })
    }

    const onSubmit = () => {
        handleUpdateAddress(formData.id, formData)
        setEdit(false)
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

            <h2 className={styles.heading + " f28 fw600 darkGrey_color"}>{lang ? profile[lang].addresses.changeAddress : ''}</h2>

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
