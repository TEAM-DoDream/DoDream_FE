import Banner from './components/Banner';
import HomeRecruit from './components/HomeRecruit';
import Footer from '@common/Footer';
import HomeDreamer from './components/HomeDreamer';
import LoginBanner from './components/LoginBanner';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  return (
    <div>
      {isLoggedIn ? <LoginBanner /> : <Banner />}

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
