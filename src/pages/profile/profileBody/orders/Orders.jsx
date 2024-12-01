import React, { useEffect, useState } from 'react';
import Tabs from '../../../../components/tabs/Tabs';
import style from "./orders.module.css";
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import Pagination from '../../../../components/pagination/Pagination';
import OrdersService from '../../../../services/orders.service';
import Error from '../../../../components/error/Error';
import Loading from '../../../../components/loading/Loading';

const { profile } = PagesText;

const Orders = () => {
  const { lang, token } = useSelector((state) => state.baristica);
  const [visibleCoffees, setVisibleCoffees] = useState({}); // Manage visibility of coffees by order ID
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const totalPages = 5;

  const ordersService = new OrdersService()

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleCoffees = (orderId) => {
    setVisibleCoffees((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], // Toggle visibility for the specific order
    }));
  };

  const getOrders = async () => {
    setLoading(true)
    try {
      const response = await ordersService.getOrders(token)

    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <div className={style.orders}>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} />

      <div className={style.tabs}>
        <Tabs tabs={profile[lang]?.orders?.tabs?.map((tab) => tab.title)} children={profile[lang]?.orders} />
      </div>
      {profile[lang]?.orders?.list.length < 1 ?
        <p className={`${style.empty} flex a-center j-center`}>{profile[lang]?.orders?.empty}</p>
        :
        <>
          <h1 className='f28 fw600'>{profile[lang]?.orders?.title}:</h1>
          <div className={style.all_orders}>
            {profile[lang]?.orders?.list?.map((elem, i) => (
              <div key={`${elem?.id}_${i}`}>
                <div
                  id={`${elem?.id}_${i}`}
                  className={`${style.order} flex a-center j-between border8`}
                >
                  <div className={`${style.order_row} flex a-center j-between w-100`}>
                    <p className={`${style.id} f20 fw400 a-center j-center flex ${style.center}`}>№{elem?.id}</p>
                    <p className={`f16 fw400 a-center j-center flex ${style.center}`}>{elem?.date}</p>
                    <p className={`f16 fw400 a-center j-center flex ${style.center}`}>{elem?.location}</p>
                    <p className={`f24 fw400 a-center j-center flex ${style.center} ${style.price}`}>{elem?.price}</p>
                    <button
                      className={`${style.button} ${style.mobile_button} ${visibleCoffees[elem?.id] ? `${style.active} f24 border8` : "f24 border8"}`}
                      onClick={() => toggleCoffees(elem?.id)} // Toggle coffees on button click
                    >
                      {
                        profile[lang]?.orders?.button}
                    </button>
                  </div>
                  <p className={`f24 fw400 ${style.mobile_price}`}>{elem?.price}</p>
                </div>
                <div
                  className={`${style.coffees} ${visibleCoffees[elem?.id] ? style.visible : ""
                    }`}
                >
                  {elem?.coffees?.map((coffee, coffeeIndex) => (
                    <div
                      key={coffee?.id}
                      id={coffee?.id}
                      className={`${style.coffee} border8 flex a-center j-between`}
                    >
                      <p className={`${style.mobile_index} f20 darkGrey_color`}>№ {coffeeIndex + 1}</p>
                      <div className={`${style.info} flex a-center`}>
                        <p className={`${style.index} f20 darkGrey_color`}>№ {coffeeIndex + 1}</p>
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
                      <div className={`${style.coffee_bottom} flex a-center j-between`}>
                        <p
                          className={`${style.amount} flex a-center j-center darkGrey_color`}
                        >
                          {coffee?.amount}
                          {profile[lang]?.orders?.amount_string}
                        </p>
                        <p className={`f24 fw400 ${style.mobile_price}`}>{elem?.price}</p>
                      </div>
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            justify={'justify-end'}
          />
        </>
      }
    </div>
  );
};

export default Orders;
