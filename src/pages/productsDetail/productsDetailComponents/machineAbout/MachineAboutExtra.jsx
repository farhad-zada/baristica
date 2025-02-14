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

const MachineAboutExtra = () => {
    console.log(mazzerJson)
  const { lang } = useSelector((state) => state.baristica)
  return (
    <div className={styles.details_extra}>
        {mazzerJson[lang]?.descriptions?.map((desc) => (
            <div className={styles.details_row}>
                <div className={styles.details_extra_img}>
                    <img src={desc?.img} alt="" />
                </div>
                <div className={styles.details_extra_text}>
                    <h6>{desc?.subtitle}</h6>
                    <h3>{desc?.title}</h3>
                    <p>{desc?.text}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MachineAboutExtra