import React, { useEffect } from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import styles from './profile.module.css'
import ProfileBody from './profileBody/ProfileBody'
import PageText from '../../content/PagesText.json'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileActiveTab } from '../../redux/slice'

const { profile } = PageText

export default function Profile() {
    const { lang } = useSelector((state) => state.baristica);

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setProfileActiveTab('personalData'))
        }
    },[])
    return (
        <div className={styles.profile + ' flex j-center'}>
            <div className="container">
                <AuthorizationHeading heading={lang ? profile[lang].heading : ''} />
                <ProfileBody />
            </div>
        </div>
    )
}
