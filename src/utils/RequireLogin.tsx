import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RequireLoginProps {
  children: React.ReactNode;
}

const RequireLogin = ({ children }: RequireLoginProps) => {
  const navigate = useNavigate();
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/', {
        state: {
          toast: '로그인 후 이용 가능한 기능입니다.',
        },
      });
    } else {
      setAllow(true);
    }
  }, [navigate]);

  if (!allow) return null;

  return <>{children}</>;
};

export default RequireLogin;
