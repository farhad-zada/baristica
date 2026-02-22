import React, { useEffect, useState } from 'react';
import Tabs from '../../../../components/tabs/Tabs';
import style from "./orders.module.css";
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import OrdersService from '../../../../services/orders.service';
import Error from '../../../../components/error/Error';
import Loading from '../../../../components/loading/Loading';
import OrderElements from './orderElements/OrderElements';
import { handleApiReqRes } from '../../../../utils/handleApiReqRes.util';


const { profile } = PagesText;

const Orders = () => {
  const { lang, token } = useSelector((state) => state.baristica);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("Something went wrong.")
  const [activeOrders, setActiveOrders] = useState([])
  const [deliveredOrders, setDeliveredOrders] = useState([])
  const [firstOrderId, setFirstOrderId] = useState(null)
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const content = {
    [profile[lang].orders.tabs[0].title]: <OrderElements type='active' orders={activeOrders} firstOrderId={firstOrderId} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />,
    [profile[lang].orders.tabs[1].title]: <OrderElements type='delivered' orders={deliveredOrders} firstOrderId={firstOrderId} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
  }


  const ordersService = new OrdersService()


  const getOrders = async () => {
    setLoading(true)
    try {
      // await Promise.all([
      //   ,
      //   handleApiReqRes(ordersService.getOrders(token, 'delivered'))
      // ]);
      let active = await handleApiReqRes(ordersService.getOrders(token, 'active'));
      let delivered = await handleApiReqRes(ordersService.getOrders(token, 'delivered'));
      console.log("ACTIVE: ", active);
      // coffee
      setActiveOrders(active.data.orders);
      setDeliveredOrders(delivered.data.orders);
      const allOrders = [...(active?.data?.orders || []), ...(delivered?.data?.orders || [])];
      if (allOrders.length) {
        const oldestOrder = allOrders.reduce((oldest, current) => {
          if (!oldest) return current;
          return new Date(current.createdAt) < new Date(oldest.createdAt) ? current : oldest;
        }, null);
        setFirstOrderId(oldestOrder?._id || null);
      } else {
        setFirstOrderId(null);
      }

    } catch (error) {
      setError(true)
      setMessage(error.message)
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
      <Error status={error} setStatus={setError} message={message} />

      <div className={style.tabs}>
        <Tabs tabs={profile[lang]?.orders?.tabs?.map((tab) => tab.title)} children={content} />
      </div>

    </div>
  );
};

export default Orders;
