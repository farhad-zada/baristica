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
    const [loading, setLoading] = useState(false)

    const userService = new UserService()

    const deleteAddress = async (id) => {
        setLoading(true)
        try {
            const response = await userService.deleteAddress(token, id)
            setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
        } catch (error) {

        } finally {
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
        <div>
            <Loading status={loading} />
            <div className={styles.address}>
                {/* Индекс */}
                {index && <span className={`${styles.index} f20 fw400`}>{index}.</span>}

                {/* Город */}
                <span className={`${styles.city} f20 fw400`}>
                    {address?.city || "Baki"}
                </span>

                {/* Улица */}
                <span className={`${styles.street} f20 fw400`}>
                    {address?.street || "Ул. Зарифа Алиева 12"}
                </span>

                {/* Квартира */}
                <span className={`${styles.home} f20 fw400`}>
                    {address?.home || "кв. 14"}
                </span>

                {/* Действия */}
                <div className={styles.actions}>
                    <span
                        className={`${edit ? styles.active : ""} pointer`}
                        onClick={() => setEdit(!edit)}
                    >
                        {Edit}
                    </span>
                    <span className="pointer" onClick={() => deleteAddress(address._id)}>
                        {Delete}
                    </span>
                </div>
            </div>

            {/* Редактирование адреса */}
            {edit && (
                <EditAddress
                    address={address}
                    setAddresses={setAddresses}
                    setEdit={setEdit}
                />
            )}
        </div>

    )
}
