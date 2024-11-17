import React from 'react'
import ContactsInfo from './contactsComponents/ContactsInfo'
import ContactsAddress from './contactsComponents/ContactsAddress'
import ContactsGallery from './contactsComponents/ContactsGallery'

const Contacts = () => {
  return (
    <div className='wholeSale'>
        <ContactsInfo/>
        <ContactsAddress/>
        <ContactsGallery/>
    </div>
  )
}

export default Contacts