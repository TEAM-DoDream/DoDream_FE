import Divider from '@common/Divider.tsx';
import LoginImageComponent from '@pages/login/components/LoginImage.tsx';
import LoginForm from '@pages/login/components/LoginForm.tsx';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-[1200px]">
        <LoginImageComponent />

        <div className="flex w-full flex-col items-center justify-center px-4 md:w-1/2">
          <div className="w-full max-w-[400px] space-y-6">
            <div className="space-y-2 pb-8 text-left">
              <div className="text-2xl text-gray-600 md:text-3xl">
                당신의 인생 2막,
              </div>
              <div className="text-4xl font-bold text-black md:text-6xl">
                지금 두드림에서
              </div>
            </div>

            <LoginForm />

            <Divider />

            <div className="mt-4 w-full text-center text-gray-500 font-B03-M">
              두드림이 처음이신가요?{'  '}
              <a href="/signup" className="text-purple-500 font-B03-M">
                회원가입
              </a>
            </div>
            <div className="mt-4 flex w-full items-center justify-center text-center">
              <div className="flex w-full items-center justify-center gap-6 px-4">
                <a href="/findpwd" className="text-gray-400 font-B02-SB">
                  비밀번호 찾기
                </a>
                <div className="text-gray-200 font-B02-SB">|</div>
                <a href="/findid" className="text-gray-400 font-B02-SB">
                  아이디 찾기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
