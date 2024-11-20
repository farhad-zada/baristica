import React from "react";
import styles from "./inputText.module.css";

const InputText = ({ name, value, type='text', placeholder ,onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value); // Передаём данные в родительский компонент
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className={styles.input}
      placeholder={placeholder}
    />
  );
};

export default InputText;
