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
          toast:
            '상단의 로그인 버튼을 통해 로그인 후 , 나의 할 일을 이용하실 수 있어요',
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
