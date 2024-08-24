import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Drivers() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/drivers/drafts');
  }, []);
  return <Outlet />;
}
