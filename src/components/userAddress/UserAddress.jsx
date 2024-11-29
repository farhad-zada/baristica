import React, { useState } from 'react'
import styles from './userAdress.module.css'
import { Delete, Edit } from '../../icons'
import EditAddress from './edit/EditAddress'
import UserService from '../../services/user.service'
import { useSelector } from 'react-redux'
import Loading from '../loading/Loading'

export default function UserAddress({ address, radio, index, setAddresses }) {
    const { token } = useSelector(state => state.baristica)
    const [edit, setEdit] = useState(false)
    const [loading,setLoading] = useState(false)

    const userService = new UserService()

    const deleteAddress = async (id) => {
        setLoading(true)
        try {
            const response = await userService.deleteAddress(token, id)
            setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
        } catch (error) {

        } finally{
            setLoading(false)
        }
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
            <Loading status={loading} />
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
                    <span className='pointer' onClick={() => deleteAddress(address._id)}>{Delete}</span>
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
