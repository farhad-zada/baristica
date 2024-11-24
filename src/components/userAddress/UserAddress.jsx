import React, { useState } from 'react'
import styles from './userAdress.module.css'
import { Delete, Edit } from '../../icons'
import EditAddress from './edit/EditAddress'

export default function UserAddress({ address, radio, index, setAddresses }) {

    const [edit, setEdit] = useState(false)

    const deleteAddress = (id) => {
        setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
    };

    const changeSelected = (id) => {
        setAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
                address.id === id
                    ? { ...address, selected: true }
                    : { ...address, selected: false }
            )
        );
    };
    return (
        <div >
            <div className={styles.address}>
                {
                    index
                        ?
                        <span className='f20 fw400'>{index}.</span>
                        :
                        <></>
                }
                {
                    radio
                        ?
                        <span className={styles.circle} onClick={() => changeSelected(address.id)}>
                            {
                                address.selected
                                    ?
                                    <span className={styles.blueCircle}></span>
                                    :
                                    <></>
                            }
                        </span>
                        :
                        <></>
                }
                <span className='f20 fw400'>{address?.city ? address.city : 'Baki'}</span>
                <span className='f20 fw400'>{address?.street ? address.street : 'Ул. Зарифа Алиева 12'}</span>
                <span className='f20 fw400'>{address?.home ? address.home : 'кв. 14'}</span>

                <div className="flex g10">
                    <span className={edit ? styles.active + ' pointer' : 'pointer'} onClick={() => setEdit(!edit)}>{Edit}</span>
                    <span className='pointer' onClick={() => deleteAddress(address.id)}>{Delete}</span>
                </div>
            </div>

            {
                edit
                    ?
                    <EditAddress address={address} setAddresses={setAddresses} setEdit={setEdit} />
                    :
                    <></>
            }
        </div>
    )
}
