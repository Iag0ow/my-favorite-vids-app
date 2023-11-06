import React, { createContext,useState } from 'react';

const useAcessoContext = createContext();

const AcessoProvider = ({ children }) => {
  const [acesso, setAcesso] = useState(false);
 
  const updateAcesso = (bolean) => {
    setAcesso(bolean);
  }

  return (
    <useAcessoContext.Provider value={{ acesso, updateAcesso}}>
      {children}
    </useAcessoContext.Provider>
  );
};

export { useAcessoContext, AcessoProvider };
