import React from 'react';
import style from './progressBar.module.css'

const ProgressBar = ({ progress }) => {
  return (
    <div className={style.progress_bar}>
      <div className={style.progress} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
