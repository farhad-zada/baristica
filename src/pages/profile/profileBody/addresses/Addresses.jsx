import React, { useEffect, useReducer, useState } from 'react'
import PageText from '../../../../content/PagesText.json'
import UserAddress from '../../../../components/userAddress/UserAddress'
import AddAddress from '../../../../components/userAddress/add/AddAddress'
import styles from './addresses.module.css'
import { useSelector } from 'react-redux'

const { profile } = PageText

const addressReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.payload

        case 'ADD':
            return [...state, action.payload]

        case 'UPDATE':
            return state.map(addr =>
                addr._id === action.payload._id
                    ? { ...addr, ...action.payload }
                    : addr
            )

        case 'DELETE':
            return state.filter(addr => addr._id !== action.payload)

        case 'SET_PRIMARY':
            return state.map(addr => ({
                ...addr,
                isPrimary: addr._id === action.payload
            }))

        default:
            return state
    }
}

export default function Addresses() {
    const { lang, user } = useSelector(state => state.baristica)
    const [addresses, dispatch] = useReducer(addressReducer, [])
    const [add, setAdd] = useState(false)

    useEffect(() => {
        if (user?.addresses?.length) {
            dispatch({ type: 'INIT', payload: user.addresses })
        }
    }, [])

    return (
        <div>
            <h2 className={`${styles.heading} f28 fw600 darkGrey_color robotoFont`}>
                {lang ? profile[lang].addresses.heading : ''}:
            </h2>

            {addresses.map((address, index) => (
                <UserAddress
                    key={address._id}
                    index={index + 1}
                    address={address}
                    content={lang ? profile[lang].addresses : {}}
                    dispatch={dispatch}
                />
            ))}

            <button
                type="button"
                className={styles.addBtn}
                onClick={() => setAdd(prev => !prev)}
            >
                {lang ? profile[lang].addresses.addBtn : ''}
            </button>

            {add && (
                <AddAddress
                    dispatch={dispatch}
                    setAdd={setAdd}
                />
            )}
        </div>
    )
}
