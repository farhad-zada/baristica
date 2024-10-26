import React, { memo, useEffect, useState } from 'react';
import styles from './Tabs.module.css'; // Твой CSS-модуль

const Tabs = ({ tabs, children }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    useEffect(() => {
        if (tabs?.length) {
            setSelectedTab(tabs[0])
        }
    }, [tabs])
    return (
        <div className={styles.tabs}>
            <div className={styles.tabsHeadings}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={selectedTab === tab ? styles.selectedTab : styles.tab}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className={styles.tabContent}>
                {children[selectedTab]}
            </div>
        </div>
    );
};

export default Tabs;
