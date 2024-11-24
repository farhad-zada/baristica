import React, { useState } from 'react'

import PageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom';
import UserAddress from '../../../../components/userAddress/UserAddress';
import styles from './addresses.module.css'
import { useSelector } from 'react-redux';
import AddAddress from '../../../../components/userAddress/add/AddAddress'

const { profile } = PageText
export default function Addresses() {
    const [addresses, setAddresses] = useState([
        {
            id: 0,
            city: "Baku",
            street: "Ул. Зарифа Алиева 12",
            house: "кв. 14",
            main: false
        },
        {
            id: 1,
            city: "Baku",
            street: "Ул. Зарифа Алиева 12",
            house: "кв. 14",
            main: false
        }
    ])

    const [add,setAdd] = useState(false)

    const { lang } = useSelector((state) => state.baristica);

    return (
        <div>
            <h2 className={styles.heading + " f28 fw600 darkGrey_color"}>{lang ? profile[lang].addresses.heading : ''}:</h2>
            {
                addresses.length
                    ?
                    addresses.map((address, index) => (
                        <UserAddress address={address} index={index + 1} key={index} setAddresses={setAddresses} />
                    ))
                    :
                    <></>
            }

            <button
                type='button'
                className={styles.addBtn}
                onClick={() => setAdd(!add)}
            >
                {lang ? profile[lang].addresses.addBtn : ''}
            </button>

            {
                add
                ?
                <AddAddress setAddresses={setAddresses} setAdd={setAdd} />
                :
                <></>
            }
        </div>
    )
}
