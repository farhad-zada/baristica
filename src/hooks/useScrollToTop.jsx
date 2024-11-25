import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Скроллит наверх при изменении маршрута
  }, [pathname]);
};

export default useScrollToTop;
