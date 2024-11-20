import React from 'react'

export default function AuthorizationHeading({ heading = '', subHeading = '' }) {
    return (
        <div>
            <h2 className="f48 fw700">{heading}</h2>
            {
                subHeading
                    ?
                    <p className="f24 fw400 darkGrey_color mt4">{subHeading}</p>
                    :
                    ""
            }
        </div>
    )
}
