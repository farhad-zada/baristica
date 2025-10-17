import React, { useEffect, useState } from 'react';
import Tabs from '../../../../components/tabs/Tabs';
import style from "./orders.module.css";
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import OrdersService from '../../../../services/orders.service';
import Error from '../../../../components/error/Error';
import Loading from '../../../../components/loading/Loading';
import OrderElements from './orderElements/OrderElements';

const { profile } = PagesText;

const Orders = () => {
  const { lang, token } = useSelector((state) => state.baristica);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [activeOrders, setActiveOrders] = useState([])
  const [deliveredOrders, setDeliveredOrders] = useState([])
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const content = {
    [profile[lang].orders.tabs[0].title]: <OrderElements type='active' orders={activeOrders} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />,
    [profile[lang].orders.tabs[1].title]: <OrderElements type='delivered' orders={deliveredOrders} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
  }


  const ordersService = new OrdersService()


  const getOrders = async () => {
    setLoading(true)
    try {
      const [active, delivered] = await Promise.all([
        ordersService.getOrders(token, 'active'),
        ordersService.getOrders(token, 'delivered')
      ]);
      console.log("ACTIVE: ", active);
      // coffee
      setActiveOrders(active.data.orders);
      setDeliveredOrders(delivered.data.orders);

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
        <Tabs tabs={profile[lang]?.orders?.tabs?.map((tab) => tab.title)} children={content} />
      </div>

    </div>
  );
};

export default Orders;
