import React from 'react';
import styles from './counter.module.css'
import { Minus, Plus } from '../../icons';

const Counter = ({ min = 1, max = 100000, count = 1, setCount, callBack }) => {
  
  const handleIncrement = () => {
    if (count < max) {
      if(callBack){
        callBack('increase')
        return;
      }
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      if(callBack){
        callBack('decrease')
        return;
      }
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.counter}>
      <button className={styles.decrement + ' flex a-center j-center'} onClick={handleDecrement}>
        {Minus}
      </button>
      <span className={`${styles.count} f16 fw400`}>{count}</span>
      <button className={styles.increment + ' flex a-center j-center'} onClick={handleIncrement}>
        {Plus}
      </button>
    </div>
  );
};

export default Counter;
