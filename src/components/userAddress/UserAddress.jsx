import React, { useState } from 'react'
import styles from './userAdress.module.css'
import { Delete, Edit } from '../../icons'
import EditAddress from './edit/EditAddress'
import UserService from '../../services/user.service'
import { useSelector } from 'react-redux'
import Loading from '../loading/Loading'
import Error from '../error/Error'
import { handleApiReqRes } from '../../utils/handleApiReqRes.util'

export default function UserAddress({ content, address, index, dispatch, radio=false }) {
    const { token } = useSelector(state => state.baristica)

    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('Something went wrong')


    const userService = new UserService()

    const deleteAddress = async (id) => {
        setLoading(true)
        try {
            const request = userService.deleteAddress(token, id)
            await handleApiReqRes(request)
            dispatch({ type: 'DELETE', payload: id })
        } catch (err) {
            setError(true)
            setMessage(err.message)
        } finally {
            setLoading(false)
        }
    }

    const setSelectedAddress = (id) => {
        dispatch({type: 'SET_SELECTED', payload: id});
    }

    let highlightedAddress = false;
    if (!radio) {
        highlightedAddress = address.isPrimary;
    } else {
        highlightedAddress = address.selected;
    }
    return (
        <div>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />

            <div
                className={`${styles.address} ${highlightedAddress ? styles.isPrimary : ''} flex a-center j-between`}
            >
                <span className={`${styles.index} f20 fw400 robotoFont`}>
                    {index}.
                </span>
                {radio &&
                    <span className={styles.circle} onClick={() => setSelectedAddress(address._id)}>
                        {
                            address.selected === true
                                ?
                                <span className={styles.blueCircle}></span>
                                :
                                <></>
                        }
                    </span>
                }
                <div className={`${styles.address_row} flex a-center j-around w-100`}>
                    <span className={`${styles.city} f20 fw400 robotoFont`}>
                        {address.city}
                    </span>

                    <span className={`${styles.street} f20 fw400 robotoFont`}>
                        {address.street}
                    </span>

                    <span className={`${styles.home} f20 fw400 robotoFont`}>
                        {content.houseHint} {address.apartment}
                    </span>
                </div>

                <div className={styles.actions}>
                    <span
                        className={`${edit ? styles.active : ''} pointer`}
                        onClick={() => setEdit(prev => !prev)}
                    >
                        {Edit}
                    </span>
                    <span
                        className="pointer"
                        onClick={() => deleteAddress(address._id)}
                    >
                        {Delete}
                    </span>
                </div>
            </div>

            {edit && (
                <EditAddress
                    address={address}
                    dispatch={dispatch}
                    setEdit={setEdit}
                />
            )}
        </div>
    )
}
