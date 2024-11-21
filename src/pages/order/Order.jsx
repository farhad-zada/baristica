import React from 'react'
import AuthorizationHeading from '../../components/authorizationHeading/AuthorizationHeading'
import PageText from '../../content/PagesText.json'
import { useSelector } from 'react-redux';

const { order } = PageText

export default function Order() {
    const { lang } = useSelector((state) => state.baristica);

    return (
        <div className='flex j-center'>
            <div className="container">
                <AuthorizationHeading heading={lang ? order[lang].heading : ''} />
            </div>
        </div>
    )
}
