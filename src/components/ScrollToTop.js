import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(props) {
  const { pathname, search, ...location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}
