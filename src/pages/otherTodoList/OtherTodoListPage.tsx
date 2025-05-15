import BackIcon from '@assets/icons/back.svg?react';
import ViewIcon from '@assets/icons/show_pw.svg?react';
import TodoCard from '@pages/otherTodoList/components/TodoCard.tsx';
import Footer from '@common/Footer.tsx';

const OtherTodoListPage = () => {
  const sections = ['준비하기', '시작하기', '도전하기'];
  const sampleTodos = [
    { text: '고용24에서 인근 요양보호사 과정 검색하기', checked: true },
    { text: '인근 학원 검색하기', checked: false },
    { text: '상담 예약하기', checked: false },
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <BackIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/images/onboarding.png"
                  alt="프로필"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-900 font-T02-B">
                    두잇나우의 할일목록
                  </span>
                  <span className="text-gray-500 font-B02-M">대전 서구</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400 font-B03-M">
                <ViewIcon className="h-4 w-4" />
                <span>조회수 3</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              {sections.map((sectionTitle) => (
                <TodoCard
                  key={sectionTitle}
                  title={sectionTitle}
                  todos={sampleTodos}
                  showAddButton={false}
                  disableHover={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OtherTodoListPage;
