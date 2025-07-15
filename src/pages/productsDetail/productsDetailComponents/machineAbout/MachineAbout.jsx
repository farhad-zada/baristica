import React, { useEffect, useState } from 'react'
// import content from '../../../../content/CoffeMachines.json'
import { useSelector } from 'react-redux'
import { machineDetailsIcons } from '../../../../assets/machineDetailIcons/machineDetailicons'
import styles from './machineAbout.module.css'
import MachineAboutExtra from './MachineAboutExtra'
// const { machines } = content

export default function MachineAbout({ product }) {
    const { lang } = useSelector(state => state.baristica)
    const [data, setData] = useState({})
    useEffect(() => {
        if (JSON.stringify(product) !== '{}') {
            // Очистка строк от всех скрытых символов (например, разрывов строки)
            // const cleanedProductName = product.name[lang].replace(/\s+/g, ' ').trim();

            // const machine = machines.find((machine) => {
            //     // Очистка строки из machines перед сравнением
            //     const cleanedMachineName = machine.name.replace(/\s+/g, ' ').trim();
            //     if(cleanedMachineName === 'SANREMO F64 OD EVO PRO' && cleanedProductName === 'SANREMO F64 OD EVO PRO'){
            //         return 'SANREMO F64 OD EVO PRO'
            //     }
            //     return cleanedProductName.includes(cleanedMachineName);
            // });
            setData(product.about);
        }
    }, [product, lang]);

    return (
        product?.name[lang]?.includes("MAZZER PHILOS") ? <MachineAboutExtra/>
        : <div className={styles.detailSection}>
            {
                data && data[lang]?.preface.map((description) => (
                    <h2 className='f20 fw400 darkGrey_color robotoFont'>{description}</h2>
                ))
            }

            <div className={styles.detail + ' flex'}>
                {
                    data && data[lang]?.body.map((section) => (
                        <div className={styles.section + ' flex g8'}>
                            <div className="left">
                                {
                                    section?.icon
                                        ?
                                        <div>{machineDetailsIcons[section.icon]}</div>
                                        :
                                        <></>
                                }
                            </div>
                            <div className="right">
                                <h3 className='f24 darkGrey_color fw700'>{section.header}</h3>
                                <p className='darkGrey_color f20 fw400'>{section.paragraph}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
