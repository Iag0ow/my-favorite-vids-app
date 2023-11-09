import React, { useEffect } from 'react';
import notFound from "../../assets/images/newnotfound.gif";

const NotFound = () => {
  useEffect(() => {
    const originalBodyStyle = document.body.style.cssText;

    document.body.style.background = 'none';
    document.body.style.setProperty('background-color', '#000000', 'important');

    return () => {
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);
  useEffect(() => {
    // Adiciona um estilo específico para o cabeçalho (head) para garantir a visibilidade do favicon
    const headElement = document.head;
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = '/caminho/do/seu/favicon.ico'; // Substitua pelo caminho real do seu favicon
    headElement.appendChild(faviconLink);
  
    // Retorna a função de limpeza para remover o link do favicon quando o componente for desmontado
    return () => {
      headElement.removeChild(faviconLink);
    };
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center align-items-center flex-column' style={{height: '80vh'}}>
        <h1 className='text-white mb-5'>Oops! Parece que você se perdeu não é mesmo?</h1>
        <img src={notFound} alt="Não encontrado" style={{width: '27%'}} />
        <h1 className='text-white'>404</h1>
        <h1 className='text-white'> Página não encontrada</h1>
      </div>
    </>
  );
};

export default NotFound;
