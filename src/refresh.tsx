import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useRedirectMobileOnRefresh() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isRefresh = performance.navigation.type === performance.navigation.TYPE_RELOAD;

    if (isMobile && isRefresh && location.pathname !== '/') {
      navigate('/');
    }
  }, []);
}