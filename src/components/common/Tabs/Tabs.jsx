import React, { useState } from "react";
import classes from "./Tabs.module.css";
import clsx from "clsx";

const Tabs = ({ tabs, activeTab, setActiveTab, className, type2 }) => {
  return (
    <div className={clsx(classes.tabs, className, type2 && classes.type2)}>
      {tabs.map((tab, i) => (
        <button
          className={clsx(classes.tab, activeTab === tab && classes.activeTab)}
          key={i}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
