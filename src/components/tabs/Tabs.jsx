import React, { memo, useEffect, useState } from 'react';
import styles from './Tabs.module.css'; // Твой CSS-модуль
import { useSelector } from 'react-redux';

const Tabs = ({ tabs, children, additionalHeadingStyles = '', additionalTabStyle = '', callback }) => {
    const { tabIdx } = useSelector(state => state.baristica)
    const [selectedTab, setSelectedTab] = useState(tabIdx ? tabs[tabIdx] : tabs[0]);

    useEffect(() => {
        if (tabs?.length) {
            setSelectedTab(tabs[0])
        }
    }, [tabs])
    
    // for product detail tabs
    useEffect(() => {
        if (tabIdx !== null) {
            setSelectedTab(tabs[tabIdx])
        }
    }, [tabIdx, children, tabs, callback])

    return (
        <div className={styles.tabs + additionalTabStyle}>
            <div className={styles.tabsHeadings + additionalHeadingStyles}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={selectedTab === tab ? styles.selectedTab : styles.tab}
                        onClick={() => {
                            setSelectedTab(tab)
                            if(callback){
                                callback(index)
                            }
                        }}
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

export default memo(Tabs);
