import React from "react";
import styles from "./sidebarTabs.module.css";

const SidebarTabs = ({ tabs, activeTab, onTabChange, translations, lang }) => {
    return (
        <div className={styles.sidebar}>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.active : ""} robotoFont`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {translations[lang]?.[tab.key] || ""}
                </div>
            ))}
        </div>
    );
};

export default SidebarTabs;
