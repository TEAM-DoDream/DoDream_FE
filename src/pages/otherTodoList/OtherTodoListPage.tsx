import { useParams, useNavigate } from 'react-router-dom';
import BackIcon from '@assets/icons/back.svg?react';
import ViewIcon from '@assets/icons/show_pw.svg?react';
import TodoCard from '@pages/otherTodoList/components/TodoCard.tsx';
import Footer from '@common/Footer.tsx';
import { useJobDetailQuery } from '@hook/useJobQuery.ts';

const suyiGroups = [
  [
    '아롱이 병원에 들렀을 때, 늘 친절하신 간호 선생님께 취업 경로 살짝 여쭤보기',
    '요즘 정부지원 교육 많다던데, 중랑구 복지센터에 전화해서 “교육 중에 동물 관련된 것도 있나요?” 물어보기.',
    '동물보건사 자격증은 꼭 필요한지, 아니면 반려동물 키워본 경험만으로도 가능한지 알아보기',
    '알바천국에서 ‘동물병원 보조’, ‘초보 가능’ 키워드로 중랑구 근처(면목동, 묵동, 상봉) 병원 3곳 찾아보기',
    '실습교육기관 알아보기, ‘한국반려동물아카데미’, ‘동물간호보조사 과정’ 등이 있다.',
    '벳잡스, 동물병원협회 채용 게시판에 이력서 올려보기',
  ],
  [
    '대전시 평생학습관 홈페이지 들어가서 동물 관련 수업 있는지 확인하기',
    '한 달에 한 번, 가까운 유기견 보호소에 봉사 문의해보기',
    '네이버카페 ‘대전동물사랑’ 봉사팀 가입하면 유기견 봉사 일정 확인할 수 있다.',
    '대전 동물보호센터 (유성구 구암동) 방문 해보기: 집에서 버스타고 30분',
    '봉사 지원 전, 봉사 참여 인증서 발급 여부 꼭 확인하기! (병원 알바 지원 시 참고자료로 활용 가능하다고 함!)',
    '동물병원은 소규모라 사람 뽑을 때 딱 한 줄만 SNS에 공지할 때가 많으니 계정 팔로우 해놓기.',
    '네이버 카페 ‘동물병원인 모임’, ‘동물사랑 관저동’ 상시 확인할 것!!',
    '인스타그램: #동물병원구인, #동물병원보조 등 해시태그로 검색하면 좋다.',
    '알바몬에 애견카페 스탭 (배변 정리, 음식 서빙, 강아지 관리) 올라오면 지원해보기.',
    '직접 병원에 이력서 들고 찾아가기 (생각보다 이런식으로 많이 한다고 한다..',
  ],
  [
    '동물보건과가 있는 전문대학 찾아보기: 중부대학교, 연성대학교',
    '중부대학교 동물보건과 교육 과정 찾아보고 공부할 것 정리해보기',
    '전문대학 만학도 전형 있는지 모집 요강 꼭 확인해야함!',
    '전문대학교육협의회 2025학년도 전문대학 입학전형 기본사항 꼭 참고할 것.',
    '수시 1차 원서 접수 기간 달력에 표시해놓고 잊지 말기!!! (9월 9일 부터 모집)',
    '2월 중으로 검정고시 신청 접수 넣기 (기간 엄수해야된다): 검정고시 지원센터 홈페이지',
    '검정고시 커트라인 7등급 넘기기 (연성대학교는 6등급)',
    '검정고시 합격증 사본, 성적 사본으로 수시 원서 접수 넣기',
    '3월 말에 대전시교육청 홈페이지에 시험 장소 공지 뜬거 확인! 4월 11일 시험',
  ],
];

const simriGroups = [
  [
    '행복심리상담센터에 방문해서 상담사에게 취업 경로 여쭤보기',
    '중랑구복지센터에 전화해서 심리 자격증 관련 과정 물어보기 (02-1930-4609)',
    '성동구 평생학습관에서 ‘심리학’ 관련 수업 있는지 홈페이지 먼저 살펴보기',
    '심리 상담 관련 블로그 3곳 비교해서 정리하기 (공부하는 로빈, 강사 최지훈, 하비)',
    '유튜브에 ‘50대 심리상담사’ 검색해서 사례 영상 보기',
    "신내도서관에서 '심리치료에서 정서를 어떻게 다룰 것인가' 대출하기",
    '온라인 무료 진로 성향 검사 진행하기 (서울진로진학정보센터 - 딸과 함께 해보기)',
    '서울여성인력개발원 홈페이지에서 ‘심리상담사 양성과정’ 개강 일정 확인 (다음 개강이 6월 둘째주→ 달력에 표시하기)',
    '중랑여성인력개발센터 상담과정 수강 일정 체크하기',
    '상담 자격증 교육비 알아보기 (서울여성인력개발원: 40만원대, 사설: 65만원-국비 지원 미포함)',
    '5월 30일(목) 오후 2시: ‘심리학의 첫걸음’ 무료특강 듣기 (중랑구청 4층 대강당)',
    '행복심리상담센터 블로그에 올라온 강사 후기들 정리해보기',
    '‘50대에 심리상담사 된 이야기’ 영상 보기 (유튜브에서 봤던 거 저장해둠)',
    '네이버 카페 ‘심전- 심리상담’, ‘50심리 공간’ 가입 후 주기적으로 정보 확인하기',
    '청소년 상담사 민숙 언니에게 전화 해보기 (상담일과 관련된 질문하기)',
    '심리상담사 수료증 받자마자 실습기관 2곳에 지원하기 (마음쉼터상담소, 행복심리상담센터)',
    '실습일지 양식 출력해두기 (한국상담학회 양식 기준)- 하루 2회 이상 작성',
    '면접 준비용 자기소개서 초안 작성하기 (“왜 심리상담사가 되고 싶은가요?” 질문에 대한 답변부터 정리 시작!)',
    '‘한국심리상담협회’ 홈페이지에서 자격증 시험일 확인 (다음 회차: 8월 24일 / 접수 마감일: 8월 10일)',
    '8월 10일까지 시험 응시료(35000원) 카드 결제 → 접수증 pdf 저장하기',
    '8월 24일: 시험장 위치/시간 확인하기 (동국대학교 법학관 3층: 오전 9시까지 도착하기!!)',
    '8월 19일 오후1시: 면목 미소스튜디오 증명사진 촬영하기 (3×4, 6매)',
    '구직용 이메일 새로 개설하기 (업무 이메일로도 사용 예정)',
    '9월 4일: 자격증 시험 합격자 발표일 확인! (한국심리상담협회 홈페이지)',
    '8월 28일: 9월 채용 연계 교육과정 관련 상담 전화 예약하기 (02-456-1039)',
  ],
];

const OtherTodoListPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { data: jobDetail } = useJobDetailQuery(Number(jobId));

  const getTaskGroups = (name: string): string[][] => {
    if (name.includes('수의') || name.includes('테크니션')) return suyiGroups;
    if (name.includes('심리')) return simriGroups;
    return [['할 일이 등록되지 않았어요.']];
  };
  const taskGroups = getTaskGroups(jobDetail?.jobName || '');
  // 각 그룹을 하나로 합칩니다.
  const allTodos = taskGroups.flat().map((text) => ({ text, checked: false }));

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <button
              className="ml-4 rounded-full p-2 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
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
                    {jobDetail?.jobName ?? '직업'}의 할일목록
                  </span>
                  <span className="text-gray-500 font-B02-M">서울 강남구</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-400 font-B03-M">
                <ViewIcon className="h-4 w-4" />
                <span>조회수 3</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              <TodoCard
                title="할 일 목록"
                todos={allTodos}
                showAddButton={false}
                disableHover={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OtherTodoListPage;
