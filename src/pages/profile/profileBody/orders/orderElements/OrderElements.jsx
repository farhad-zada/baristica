import React, { useEffect, useState, useMemo, useCallback } from 'react';
import style from '../orders.module.css';

import PagesText from '../../../../../content/PagesText.json';
import Pagination from '../../../../../components/pagination/Pagination';
import { useSelector } from 'react-redux';
import ProductsService from '../../../../../services/products.service';
import Loading from '../../../../../components/loading/Loading';

const { profile, grindingOptionsTranslate } = PagesText;

export default function OrderElements({ orders, currentPage, totalPages, handlePageChange }) {
    const [visibleCoffees, setVisibleCoffees] = useState({}); // Manage visibility of coffees by order ID
    const { lang, token } = useSelector((state) => state.baristica);
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({});
    const [activeOrders, setActiveOrders] = useState([])
    const productsService = useMemo(() => new ProductsService(), []);

    // Format date without moment
    const formatDate = useCallback((dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat(lang, options).format(new Date(dateString));
    }, [lang]);

    // Fetch product details once and cache results
    const getProducts = useCallback(async (productIds) => {
        setLoading(true)
        try {
            const uniqueIds = [...new Set(productIds)]; // Avoid duplicate requests
            const requests = uniqueIds.map((id) =>
                productsService.getOneProduct(token, id).then((response) => ({
                    id,
                    data: response.data,
                }))
            );
            const responses = await Promise.all(requests);
            const newProducts = responses.reduce((acc, { id, data }) => {
                acc[id] = data;
                return acc;
            }, {});
            setProducts((prevState) => ({ ...prevState, ...newProducts }));
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false)
        }
    }, [productsService, token]);

    // Toggle coffee visibility
    const toggleCoffees = useCallback((orderId) => {
        setVisibleCoffees((prevState) => ({
            ...prevState,
            [orderId]: !prevState[orderId],
        }));
    }, []);

    // Fetch products on orders change
    useEffect(() => {
        if (orders?.length) {
            const productIds = orders.flatMap((order) => order.items.map((item) => item.product));
            getProducts(productIds);
        }
    }, [orders, getProducts]);


    return (
        <div>
            <Loading status={loading} />
            {orders?.length < 1 ? (
                <p className={`${style.empty} flex a-center j-center`}>{profile[lang]?.orders?.empty}</p>
            ) : (
                <>
                    <h1 className="f28 fw600 robotoFont">{profile[lang]?.orders?.title}:</h1>
                    <div className={style.all_orders}>
                        {orders.map((elem, i) => (
                            <div key={`${elem?._id}_${i}`}>
                                <div className={`${style.order} flex a-center j-between border8`}>
                                    <div className={`${style.order_row} flex a-center j-between w-100`}>
                                        <p className={`${style.id} robotoFont f20 fw400 a-center j-center flex ${style.center}`}>
                                            № {i + 1}
                                        </p>
                                        <p className={`robotoFont f16 fw400 a-center j-center flex ${style.center}`}>
                                            {formatDate(elem?.createdAt)}
                                        </p>
                                        <p className={`robotoFont f16 fw400 a-center j-center flex ${style.center}`}>{elem?.location}</p>
                                        <p className={`robotoFont f24 fw400 a-center j-center flex ${style.center} ${style.price}`}>
                                            {elem?.totalCost / 100} ₼
                                        </p>
                                        <button
                                            className={`${style.button} ${style.mobile_button} ${
                                                visibleCoffees[elem?._id] ? `${style.active} f24 border8` : 'f24 border8'
                                            }`}
                                            onClick={() => toggleCoffees(elem?._id)}
                                        >
                                            {profile[lang]?.orders?.button}
                                        </button>
                                    </div>
                                    <p className={`f24 fw400 ${style.mobile_price}`}>{elem?.price}</p>
                                </div>
                                <div
                                    className={`${style.coffees} ${visibleCoffees[elem?._id] ? style.visible : ''}`}
                                >
                                    {elem?.items?.map((coffee, coffeeIndex) => {
                                        const product = products[coffee?.product];
                                        return (
                                            <div
                                                key={coffee?.id}
                                                id={coffee?.id}
                                                className={`${style.coffee} border8 flex a-center j-between`}
                                            >
                                                <p className={`${style.mobile_index} f20 darkGrey_color robotoFont`}>№ {coffeeIndex + 1}</p>
                                                <div className={`${style.info} flex a-center`}>
                                                    <p className={`${style.index} f20 darkGrey_color robotoFont`}>№ {coffeeIndex + 1}</p>
                                                    <div className={style.img}>
                                                        <img src={product?.images?.[0]} alt="" />
                                                    </div>
                                                    <div className={style.info_details}>
                                                        <h5 className="f20 fw700 darkGrey_color robotoFont">{coffee?.name}</h5>
                                                        <p className="darkGrey_color f16 robotoFont">
                                                            {profile[lang]?.orders?.grind}:{' '}
                                                            {
                                                                grindingOptionsTranslate[lang].find(
                                                                    (grinding) => grinding.value === coffee.grindingOption
                                                                )?.text
                                                            }
                                                        </p>
                                                        <p className="darkGrey_color f16 robotoFont">
                                                            {profile[lang]?.orders?.weight}: {product?.weight}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`${style.coffee_bottom} flex a-center j-between`}>
                                                    <p
                                                        className={`${style.amount} flex a-center j-center darkGrey_color robotoFont`}
                                                    >
                                                        {coffee?.quantity}
                                                        {profile[lang]?.orders?.amount_string}
                                                    </p>
                                                    <p className={`f24 fw400 ${style.mobile_price}`}>{elem?.price / 100} ₼</p>
                                                </div>
                                                <h4
                                                    className={`${style.price} flex a-center j-center darkGrey_color f24 fw400`}
                                                >
                                                    {coffee?.price / 100} ₼
                                                </h4>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={1}
                        onPageChange={handlePageChange}
                        justify={'justify-end'}
                    />
                </>
            )}
        </div>
    );
}
