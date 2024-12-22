import React, { useEffect, useState } from 'react'

import PageText from '../../../../content/PagesText.json'
import { useNavigate } from 'react-router-dom';
import UserAddress from '../../../../components/userAddress/UserAddress';
import styles from './addresses.module.css'
import { useSelector } from 'react-redux';
import AddAddress from '../../../../components/userAddress/add/AddAddress'

const { profile } = PageText
export default function Addresses() {
    const [addresses, setAddresses] = useState([
       
    ])

    const [add,setAdd] = useState(false)

    const { lang, user } = useSelector((state) => state.baristica);
    
    useEffect(() => {
        if(JSON.stringify(user) !== '{}'){
            setAddresses(user.addresses)
        }
    },[user])
    return (
        <div>
            <h2 className={styles.heading + " f28 fw600 darkGrey_color robotoFont"}>{lang ? profile[lang].addresses.heading : ''}:</h2>
            {
                addresses.length
                    ?
                    addresses.map((address, index) => (
                        <UserAddress content={lang ? profile[lang].addresses : {}} address={address} index={index + 1} key={index} setAddresses={setAddresses} />
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
