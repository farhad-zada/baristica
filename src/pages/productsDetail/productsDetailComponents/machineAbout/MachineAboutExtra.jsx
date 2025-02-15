import React from 'react'
import { useSelector } from 'react-redux'
import styles from './machineAbout.module.css'
import mazzerJson from '../../../../content/MazzerPhilos.json'
import mazzer1 from "../../../../assets/img/mazzer1.png"
import mazzer2 from "../../../../assets/img/mazzer2.png"
import mazzer3 from "../../../../assets/img/mazzer3.png"
import mazzer4 from "../../../../assets/img/mazzer4.png"
import mazzer5 from "../../../../assets/img/mazzer5.png"
import mazzer6 from "../../../../assets/img/mazzer6.png"
 const images = {mazzer1: mazzer1,mazzer2: mazzer2, mazzer3: mazzer3, mazzer4: mazzer4, mazzer5: mazzer5, mazzer6: mazzer6}

const MachineAboutExtra = () => {
  const { lang } = useSelector((state) => state.baristica)
  return (
    <div className={styles.details_extra}>
        {mazzerJson[lang]?.descriptions?.map((desc) => (
            <div className={`${styles.details_row} flex`}>
                <div className={styles.details_extra_img}>
                    <img src={images[desc?.img]} alt="" />
                </div>
                <div className={styles.details_extra_text}>
                    <p className='darkGrey_color'>{desc?.subtitle}</p>
                    <h3 className='f36 darkGrey_color'>{desc?.title}</h3>
                    <p className='f20 darkGrey_color'>{desc?.text.split('\n\n').map((paragraph, index) => (<p className='robotoFont' style={{marginBottom: "22px"}} key={index}>{paragraph}</p>))}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MachineAboutExtra