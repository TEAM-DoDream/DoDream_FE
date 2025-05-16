import Divider from '@common/Divider';
import CheckList from '@common/CheckList';
import CheckImg from '@assets/images/checker.png';

interface ProfileCardProps {
  regionName: string;
  nickname: string;
  day: string;
  todo: string;
  profile: string;
  todotext: string[];
  doneList: boolean[];
  jobName?: string; // 추가
}

const vetTasks = [
  '아롱이 병원에ㅇㅇㅇ 들렀을 때, 늘 친절하신 간호 선생님께 취업 경로 살짝 여쭤보기',
  '요즘 정부지원 교육 많다던데, 중랑구 복지센터에 전화해서 “교육 중에 동물 관련된 것도 있나요?” 물어보기.',
  '동물보건사 자격증은 꼭 필요한지, 아니면 반려동물 키워본 경험만으로도 가능한지 알아보기',
  '알바천국에서 ‘동물병원 보조’, ‘초보 가능’ 키워드로 중랑구 근처(면목동, 묵동, 상봉) 병원 3곳 찾아보기',
  '실습교육기관 알아보기, ‘한국반려동물아카데미’, ‘동물간호보조사 과정’ 등이 있다.',
  '벳잡스, 동물병원협회 채용 게시판에 이력서 올려보기',
];

const psychTasks = [
  '행복심리상담센터에 방문해서 상담사에게 취업 경로 여쭤보기',
  '중랑구복지센터에 전화해서 심리 자격증 관련 과정 물어보기 (02-1930-4609)',
  '성동구 평생학습관에서 ‘심리학’ 관련 수업 있는지 홈페이지 먼저 살펴보기',
  '심리 상담 관련 블로그 3곳 비교해서 정리하기 (공부하는 로빈, 강사 최지훈, 하비)',
  '유튜브에 ‘50대 심리상담사’ 검색해서 사례 영상 보기',
  '신내도서관에서 ‘심리치료에서 정서를 어떻게 다룰 것인가’ 대출하기',
  '온라인 무료 진로 성향 검사 진행하기 (서울진로진학정보센터 - 딸과 함께 해보기)',
];

const ProfileCard = ({
  regionName,
  nickname,
  day,
  profile,
  todotext,
  doneList,
  jobName,
}: ProfileCardProps) => {
  let finalTodos = todotext;

  if (jobName === '수의테크니션') finalTodos = vetTasks;
  else if (jobName === '심리상담사') finalTodos = psychTasks;

  return (
    <div className="flex h-auto w-full flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] transition-shadow hover:shadow-shadow2">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-row gap-5">
          <img
            src={profile || CheckImg}
            alt="프로필이미지"
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col gap-[6px]">
            <span className="text-gray-900 font-T05-SB">{nickname}</span>
            <span className="text-gray-500 font-C01-M">
              {day}일째 꿈꾸는 중
            </span>

            <div className="mt-1 flex items-center gap-[10px]">
              <div className="rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
                할일 {finalTodos.length}개
              </div>
            </div>
          </div>
        </div>

        <button className="h-auto rounded-[12px] bg-purple-500 px-8 py-3 text-white font-B03-SB hover:bg-purple-600">
          방문하기
        </button>
      </div>

      <div className="mb-4 mt-6 flex flex-row items-center justify-center gap-[10px]">
        <span className="text-gray-500 font-B02-M">지역</span>
        {regionName ? (
          <span className="text-gray-800 font-B02-SB">{regionName}</span>
        ) : (
          <span className="text-gray-500 font-B02-SB">
            등록된 지역이 없어요
          </span>
        )}
      </div>

      <Divider />

      <div className="mt-6 flex w-full flex-col gap-3">
        {finalTodos.length === 0 ? (
          <span className="text-gray-500 font-B02-M">
            작성된 할일 목록이 없어요
          </span>
        ) : (
          <CheckList
            lists={finalTodos}
            defaultCheckedList={doneList}
            className="flex flex-col gap-3"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
