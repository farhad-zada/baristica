import React, { useState } from 'react';
import Tabs from '../../../../components/tabs/Tabs';
import style from "./orders.module.css";
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';

const { profile } = PagesText;

const Orders = () => {
  const { lang } = useSelector((state) => state.baristica);
  const [visibleCoffees, setVisibleCoffees] = useState({}); // Manage visibility of coffees by order ID

  const toggleCoffees = (orderId) => {
    setVisibleCoffees((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], // Toggle visibility for the specific order
    }));
  };

  return (
    <div className={style.orders}>
      <div className={style.tabs}>
        <Tabs tabs={profile[lang]?.orders?.tabs?.map((tab) => tab.title)} children={profile[lang]?.orders} />
      </div>
      <h1 className='f28 fw600'>{profile[lang]?.orders?.title}:</h1>
      <div className={style.all_orders}>
        {profile[lang]?.orders?.list?.map((elem, i) => (
          <div key={`${elem?.id}_${i}`}>
            <div
              id={`${elem?.id}_${i}`}
              className={`${style.order} flex a-center j-around border8`}
            >
              <p className={`${style.id} f20 fw400`}>№{elem?.id}</p>
              <p className='f16 fw400'>{elem?.date}</p>
              <p className='f16 fw400'>{elem?.location}</p>
              <p className='f24 fw400'>{elem?.price}</p>
              <button
                className={`${style.button} ${visibleCoffees[elem?.id] ? `${style.active} f24 border8` : "f24 border8"}`}
                onClick={() => toggleCoffees(elem?.id)} // Toggle coffees on button click
              >
                {
                  profile[lang]?.orders?.button}
              </button>
            </div>
            <div
              className={`${style.coffees} ${
                visibleCoffees[elem?.id] ? style.visible : ""
              }`}
            >
              {elem?.coffees?.map((coffee, coffeeIndex) => (
                <div
                  key={coffee?.id}
                  id={coffee?.id}
                  className={`${style.coffee} border8 flex a-center`}
                >
                  <div className={`${style.info} flex a-center`}>
                    <p className='f20 darkGrey_color'>{coffeeIndex + 1}</p>
                    <div className={style.img}>
                      <img src={coffee?.img} alt="" />
                    </div>
                    <div className={style.info_details}>
                      <h5 className='f20 fw700 darkGrey_color'>{coffee?.name}</h5>
                      <p className='darkGrey_color f16'>
                        {profile[lang]?.orders?.grind}: {coffee?.grind}
                      </p>
                      <p className='darkGrey_color f16'>
                        {profile[lang]?.orders?.weight}: {coffee?.weight}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${style.amount} flex a-center j-center darkGrey_color`}
                  >
                    {coffee?.amount}
                    {profile[lang]?.orders?.amount_string}
                  </p>
                  <h4
                    className={`${style.price} flex a-center j-center darkGrey_color f24 fw400`}
                  >
                    {coffee?.price}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
