import React from 'react'
import styles from './button.module.css'

export default function AuthButton({ text, onClick }) {
    return (
        <button type='button' className={styles.button} onClick={onClick}>{text}</button>
    )
}
