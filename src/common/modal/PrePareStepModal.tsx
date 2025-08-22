import Cancel from '@assets/icons/bigcancel.svg?react';
import SeedIcon from '@assets/icons/seed.svg?react';
import SproutIcon from '@assets/icons/sprout.svg?react';
import TreeIcon from '@assets/icons/tree.svg?react';
import Button from '@common/Button';
import CheckBox from '@common/CheckBox';
import Divider from '@common/Divider';
import { useLevelMutation } from '@hook/mypage/useLevelMutation';
import { useState } from 'react';

interface PrePareStepModalProps {
  onClose: () => void;
  jobName: string | undefined;
}

type StepCode = 'SEED' | 'SPROUT' | 'TREE';

type Step = {
  label: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  code: StepCode;
};

const STEPS: Step[] = [
  {
    label: '씨앗',
    description: '관심은 있지만, 아직 정보만 찾아보고 있어요',
    Icon: SeedIcon,
    code: 'SEED',
  },
  {
    label: '새싹',
    description: '교육을 듣거나, 자격증 공부를 시작할 거예요',
    Icon: SproutIcon,
    code: 'SPROUT',
  },
  {
    label: '꿈나무',
    description: '실제로 채용 공고를 찾거나, 서류를 준비하고 있어요',
    Icon: TreeIcon,
    code: 'TREE',
  },
];

const PrePareStepModal = ({ onClose, jobName }: PrePareStepModalProps) => {
  const { mutate, isPending } = useLevelMutation();

  const [selectedCode, setSelectedCode] = useState<StepCode | null>(null);

  const handleSelect = (index: number) => {
    setSelectedCode(STEPS[index].code);
  };

  const handleSubmit = () => {
    if (!selectedCode || isPending) return;
    mutate(
      { level: selectedCode },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/50">
      <div className="flex w-[511px] flex-col items-start rounded-[30px] bg-white p-[30px]">
        <div className="flex w-full items-center justify-between">
          <div className="text-black font-T03-B">
            {jobName}를 <br /> 준비하는 나의 상태는 어떻나요?
          </div>
          <Cancel className="cursor-pointer text-gray-500" onClick={onClose} />
        </div>

        <Divider className="my-5" />

        <div className="flex w-full flex-col gap-7">
          {STEPS.map(({ label, description, Icon, code }, idx) => {
            const checked = selectedCode === code;
            return (
              <button
                key={label}
                type="button"
                onClick={() => handleSelect(idx)}
                className="flex w-full items-start gap-3"
                aria-pressed={checked}
              >
                <CheckBox
                  checked={checked}
                  onToggle={() => handleSelect(idx)}
                  label=""
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-900 font-T05-SB">{label}</span>
                    <Icon />
                  </div>
                  <span className="mt-1 text-gray-800 font-B02-M">
                    {description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex w-full justify-end">
          <Button
            text="완료"
            color="primary"
            className="cursor-pointer rounded-[14px] px-[30px] py-3 disabled:opacity-60"
            onClick={handleSubmit}
            disabled={!selectedCode || isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default PrePareStepModal;
