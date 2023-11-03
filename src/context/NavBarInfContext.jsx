import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPlatforms } from '../utils/config';

const useNavContext = createContext();

const NavBarInfProvider = ({ children }) => {
  const [navBarData, setNavBarData] = useState(null);
  const [updateComponentNav, setUpdateComponentNav] = useState(false);
  const [page, setPage] = useState(1);

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
    setPage(1);
    setNavBarData(newData);
  };
  const updatePage = (newPage) => {
    setPage(newPage);
  }
  const updateNavPlatform = (update) => {
    setUpdateComponentNav(update);
  }

  return (
    <useNavContext.Provider value={{ navBarData, updateNavBarData,updateComponentNav, updateNavPlatform,page,updatePage }}>
      {children}
    </useNavContext.Provider>
  );
};

export { useNavContext, NavBarInfProvider };
