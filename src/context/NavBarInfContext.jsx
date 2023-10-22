import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPlatforms } from '../utils/config';

const useNavContext = createContext();

const NavBarInfProvider = ({ children }) => {
  const [navBarData, setNavBarData] = useState(null);
  const [updateComponentNav, setUpdateComponentNav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const dataPlatform = await getPlatforms();
        if (dataPlatform && dataPlatform.length > 0) {
          updateNavBarData(dataPlatform[0]);
        }
    };
  
    fetchData();
  }, []);
  const updateNavBarData = (newData) => {
    setNavBarData(newData);
  };
  const updateNavPlatform = (update) => {
    setUpdateComponentNav(update);
  }

  return (
    <useNavContext.Provider value={{ navBarData, updateNavBarData,updateComponentNav, updateNavPlatform }}>
      {children}
    </useNavContext.Provider>
  );
};

export { useNavContext, NavBarInfProvider };
