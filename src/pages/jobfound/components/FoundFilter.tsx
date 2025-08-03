import { useMemo } from 'react';
import DropDown from '@common/DropDown';
import ResetButton from '@common/ResetButton';
import { useFilterStore } from '@store/filterStore';
import Cancel from '@assets/icons/purplecancel.svg?react';
import { ReactTagManager } from 'react-gtm-ts';
import { useLocation } from 'react-router-dom';

type Tag = { label: string; type: 'require' | 'workTime' | 'bodyActivity' };

const needOptions = ['필요함', '불필요함', '선택 사항'];
const workTimeOptions = [
  '평일 오전',
  '평일 오후',
  '평일 9시-18시',
  '주말 근무',
  '이벤트성',
  '탄력 근무',
];
const bodyActivityOptions = ['낮은 활동량', '중간 활동량', '높은 활동량'];

const FoundFilter = () => {
  const { require, workTime, bodyActivity, setSelection, removeTag, reset } =
    useFilterStore();

  const tags = useMemo<Tag[]>(() => {
    const t: Tag[] = [];
    if (require) t.push({ label: require, type: 'require' });
    if (workTime) t.push({ label: workTime, type: 'workTime' });
    if (bodyActivity) t.push({ label: bodyActivity, type: 'bodyActivity' });
    return t;
  }, [require, workTime, bodyActivity]);
  const location = useLocation();
  const handleFilterEvent = (
    filterType: 'cert' | 'work_time' | 'activity_level',
    value: string
  ) => {
    const certVal = filterType === 'cert' ? value : require || '';
    const workTimeVal = filterType === 'work_time' ? value : workTime || '';
    const activityLevelVal =
      filterType === 'activity_level' ? value : bodyActivity || '';

    ReactTagManager.action({
      event: 'filter_used_recruit',
      category: '직업정보',
      cert: certVal,
      work_time: workTimeVal,
      activity_level: activityLevelVal,
      method: filterType,
      clickText: `필터 선택: ${value}`,
      source_page: location.pathname,
    });
  };

  const handleResetAll = () => {
    reset();
  };

  return (
    <div className="mt-[81px] flex w-full flex-col items-start rounded-[30px] bg-white p-[30px] shadow-shadow2">
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row gap-5">
          <DropDown
            title="자격증 필요여부"
            placeholder="자격증 필요여부를 선택"
            options={needOptions}
            value={require}
            onSelect={(v) => {
              setSelection('require', v);
              handleFilterEvent('cert', v);
            }}
          />

          <DropDown
            title="근무시간대"
            placeholder="근무시간대를 선택"
            options={workTimeOptions}
            value={workTime}
            onSelect={(v) => {
              setSelection('workTime', v);
              handleFilterEvent('work_time', v);
            }}
          />

          <DropDown
            title="직무 활동량 정도"
            placeholder="직무 활동량 정도 선택"
            options={bodyActivityOptions}
            value={bodyActivity}
            onSelect={(v) => {
              setSelection('bodyActivity', v);
              handleFilterEvent('activity_level', v);
            }}
          />
        </div>

        {/* 선택된 태그 & 리셋 버튼 */}
        <div className="mt-5 flex w-full justify-between">
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="flex h-9 items-center gap-1 rounded-full border border-purple-500 bg-purple-100 px-3 py-2 text-purple-500 font-B03-M"
              >
                {tag.label}
                <button onClick={() => removeTag(tag.type)}>
                  <Cancel />
                </button>
              </span>
            ))}
          </div>

          <ResetButton onClick={handleResetAll} />
        </div>
      </div>
    </div>
  );
};

export default FoundFilter;
