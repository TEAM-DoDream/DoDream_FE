import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import clapIcon from '@assets/images/clap.webp';
import Pagination from '@common/Pagination.tsx';
import ProfileCard from '@pages/otherTodo/components/ProfileCard.tsx';
import Footer from '@common/Footer.tsx';
import { useJobDetailQuery } from '@hook/useJobQuery.ts';
import LoadingSpinner from '@common/LoadingSpinner.tsx';

const ITEMS_PER_PAGE = 3;

const suyiGroups = [
  [
    '아롱이 병원에 들렀을 때, 늘 친절하신 간호 선생님께 취업 경로 살짝 여쭤보기',
    '요즘 정부지원 교육 많다던데, 중랑구 복지센터에 전화해서 “교육 중에 동물 관련된 것도 있나요?” 물어보기.',
    '동물보건사 자격증은 꼭 필요한지, 아니면 반려동물 키워본 경험만으로도 가능한지 알아보기',
  ],
  [
    '대전시 평생학습관 홈페이지 들어가서 동물 관련 수업 있는지 확인하기',
    '한 달에 한 번, 가까운 유기견 보호소에 봉사 문의해보기',
    '네이버카페 ‘대전동물사랑’ 봉사팀 가입하면 유기견 봉사 일정 확인할 수 있다.',
  ],
  [
    '동물보건과가 있는 전문대학 찾아보기: 중부대학교, 연성대학교',
    '중부대학교 동물보건과 교육 과정 찾아보고 공부할 것 정리해보기',
    '전문대학 만학도 전형 있는지 모집 요강 꼭 확인해야함!',
  ],
];

const simriGroups = [
  [
    '행복심리상담센터에 방문해서 상담사에게 취업 경로 여쭤보기',
    '중랑구복지센터에 전화해서 심리 자격증 관련 과정 물어보기 (02-1930-4609)',
    '성동구 평생학습관에서 ‘심리학’ 관련 수업 있는지 홈페이지 먼저 살펴보기',
  ],
  [
    '서울여성인력개발원 홈페이지에서 ‘심리상담사 양성과정’ 개강 일정 확인 (다음 개강이 6월 둘째주→ 달력에 표시하기)',
    '중랑여성인력개발센터 상담과정 수강 일정 체크하기',
    '상담 자격증 교육비 알아보기 (서울여성인력개발원: 40만원대, 사설: 65만원-국비 지원 미포함)',
  ],
  [
    '심리상담사 수료증 받자마자 실습기관 2곳에 지원하기 (마음쉼터상담소, 행복심리상담센터)',
    '실습일지 양식 출력해두기 (한국상담학회 양식 기준)- 하루 2회 이상 작성',
    '면접 준비용 자기소개서 초안 작성하기 (“왜 심리상담사가 되고 싶은가요?” 질문에 대한 답변부터 정리 시작!)',
  ],
];

const OtherTodoPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data: jobDetail, isPending } = useJobDetailQuery(Number(jobId));
  if (isPending || !jobDetail) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  const getTaskGroupsByJob = (jobName: string): string[][] => {
    if (jobName.includes('수의') || jobName.includes('테크니션'))
      return suyiGroups;
    if (jobName.includes('심리')) return simriGroups;
    return [];
  };

  const taskGroups = getTaskGroupsByJob(jobDetail?.jobName || '');

  const totalPages = Math.ceil(taskGroups.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentGroups = taskGroups.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const dummyDreamers = currentGroups.map((tasks, i) => ({
    todo: `${tasks.length}`,
    day: `${i + 1}`,
    nickname: `사용자${i + 1}`,
    doneList: new Array(tasks.length).fill(false),
    profile: '/path/to/profile.png',
    regionName: '서울 강남구',
    todotext: tasks,
    onClick: () => navigate(`/otherslist/${jobId}`),
  }));

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-10 py-8">
        <div className="mb-6" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>

        <div className="mb-6 flex flex-col items-start">
          <img src={clapIcon} alt="응원 아이콘" className="h-12 w-12" />
          <h2 className="mt-4 font-T01-B">{jobDetail.jobName} 함께 준비해요</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dummyDreamers.map((item, idx) => (
            <div key={idx} className="cursor-pointer" onClick={item.onClick}>
              <ProfileCard {...item} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
};

export default OtherTodoPage;
