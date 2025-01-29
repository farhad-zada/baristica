import React, { useState } from 'react'
import styles from './CoffeeAccesoriesAbout.module.css'

export default function CoffeeAccesoriesAbout() {
    const [about, setAbout] = useState({
        longDesc: 'BLEND NIGHTHAWK создан для истинных ценителей эспрессо, которые ищут богатство и сложность в каждом глотке. Его уникальная комбинация бразильских и костариканских зерен обеспечивает отличную балансировку вкусов, оставляя длительное и запоминающееся послевкусие.',
        details: [
            {
                heading: 'Тёмный шоколад: насыщенность и глубина',
                paragraph: 'Тёмные шоколадные ноты придают эспрессо интенсивность и богатый вкус, создавая ощущение тепла и комфорта.'
            },
            {
                heading: 'Тёмный шоколад: насыщенность и глубина',
                paragraph: 'Тёмные шоколадные ноты придают эспрессо интенсивность и богатый вкус, создавая ощущение тепла и комфорта.'
            }
        ]
    })
    return (
        <div className={styles.detailSection}>
            <h2 className='f20 fw400 darkGrey_color'>{about.longDesc}</h2>

            <div className={styles.detail}>
                {
                    about.details.length && about.details.map((section) => (
                        <div className="section">
                            <h3 className='f24 fw700 darkGrey_color'>{section.heading}</h3>
                            <p className='darkGrey_color f20 fw400'>{section.paragraph}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
