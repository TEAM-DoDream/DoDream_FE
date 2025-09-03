import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import HomeRecruit from './components/HomeRecruit';
import Footer from '@common/Footer';
import HomeDreamer from './components/HomeDreamer';
import LoginBanner from './components/LoginBanner';
import ToastModal from '@common/modal/ToastModal';
import Info from '@assets/icons/info.svg?react';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import { useGetInfo } from '@hook/mypage/useMypageQuery';
import PrePareStepModal from '@common/modal/PrePareStepModal';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [prepareOpen, setPrepareOpen] = useState(false);

  const { data, isLoading } = useMdTodoQuery();
  const { data: myInfo } = useGetInfo();

  const hasNoJob =
    isLoggedIn &&
    !isLoading &&
    data &&
    Array.isArray(data.todos) &&
    data.todos.length === 0 &&
    !data.todoGroupId;

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      navigate(location.pathname, { replace: true });

      setTimeout(() => {
        setToast(null);
      }, 1500);
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!myInfo) return;
    const hasLevel = Boolean(
      myInfo.level && String(myInfo.level).trim().length > 0
    );
    if (!hasLevel) {
      setPrepareOpen(true);
    }
  }, [isLoggedIn, myInfo]);

  return (
    <div>
      {toast && (
        <div className="fixed left-1/2 top-[98px] z-50 -translate-x-1/2 transform">
          <ToastModal icon={<Info className="text-white" />} text={toast} />
        </div>
      )}

      {prepareOpen && (
        <PrePareStepModal
          onClose={() => setPrepareOpen(false)}
          jobName={myInfo?.job?.jobName}
        />
      )}

      {!isLoggedIn ? <Banner /> : hasNoJob ? <Banner /> : <LoginBanner />}

      <div className="px-[120px] py-20">
        <HomeDreamer />
      </div>

      <div className="mb-20 px-[120px]">
        <HomeRecruit />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
