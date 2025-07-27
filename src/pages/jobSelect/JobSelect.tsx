import Button from '@common/Button';

const dummyJobs = Array(12).fill({
  title: '요양보호사',
  description:
    '구직자에게 맞는 일자리를 찾도록 돕고 이력서·면접 준비도 도와주는 역할을 해요.',
  imageUrl: 'example.jpg',
});

const JobSelect = () => {
  return (
    <div className="flex flex-col items-start justify-center px-[120px] pb-[92px] pt-[90px]">
      <div className="text-center text-gray-900 font-T01-B">
        관심 있는 직업을 하나만 담아주세요!
      </div>
      <div className="mt-[18px] text-center text-gray-500 font-B01-M">
        담은 직업을 바탕으로 나만의 할 일을 작성해볼 수 있어요.
      </div>

      <div className="mt-[60px] flex flex-col">
        <div className="text-gray-600 font-B01-B">담은 직업</div>
        <div className="mt-1 flex flex-row items-center gap-[30px]">
          <div className="text-gray-300 font-B01-M">
            아직 담은 직업이 없어요
          </div>
          <Button
            text="저장"
            color="primary"
            type="button"
            className="h-[42px] w-[85px] font-B03-SB"
          />
        </div>
      </div>

      <div className="mt-11 grid w-full grid-cols-5 gap-x-5 gap-y-5">
        {dummyJobs.map((job, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer flex-col items-start rounded-[18px] border border-gray-200 pb-5 hover:shadow-shadow2"
          >
            <img
              src={job.imageUrl}
              alt={job.title}
              className="h-[180px] w-full object-cover"
            />
            <div className="flex flex-col px-4">
              <div className="mt-3 text-gray-900 font-T05-SB">{job.title}</div>
              <div className="mt-[10px] text-gray-500 font-C01-R">
                {job.description}
              </div>

              <button className="font-B03-R mt-5 flex w-[49px] self-end text-nowrap rounded-[6px] border border-purple-500 bg-white px-3 py-[6px] text-purple-500 hover:bg-purple-50">
                담기
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[60px] flex w-full justify-center">
        <Button
          text="직업 추천 받기"
          color="primary"
          type="button"
          className="h-[71px] w-[196px] items-center justify-center font-T04-B"
        />
      </div>
    </div>
  );
};

export default JobSelect;
