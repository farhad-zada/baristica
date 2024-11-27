import React, { useState } from "react";
import SidebarTabs from "../../../components/sidebarTabs/SideBarTabs";
import PageText from "../../../content/PagesText.json";
import { useDispatch, useSelector } from "react-redux";
import styles from './profileBody.module.css'
import PersonalData from "./personalData/PersonalData";
import { setProfileActiveTab } from "../../../redux/slice";
import Cart from './cart/Cart'
import Addresses from "./addresses/Addresses";
import Orders from "./orders/Orders";

const ProfileBody = () => {
    const { lang, profileActiveTab } = useSelector((state) => state.baristica);

    const tabs = [
        { key: "personalData" },
        { key: "addresses" },
        { key: "orders" },
        { key: "comments" },
        { key: "cart" }
    ];

    const dispatch = useDispatch()

    const handleTabChange = (key) => {
        dispatch(setProfileActiveTab(key))
    };

    return (
        <div className={styles.profileBody + " flex j-between"}>
            <SidebarTabs
                tabs={tabs}
                activeTab={profileActiveTab}
                onTabChange={handleTabChange}
                translations={PageText.profileTabs}
                lang={lang}
            />
            {/* Рендер компонента для выбранного таба */}
            <div className={styles.tab_content}>
                {profileActiveTab === "personalData" && <PersonalData />}
                {profileActiveTab === "addresses" && <Addresses />}
                {profileActiveTab === "orders" && <Orders/>}
                {profileActiveTab === "comments" && "Мои комментарии"}
                {profileActiveTab === "cart" && <Cart />}
            </div>
        </div>
    );
};

export default ProfileBody;
