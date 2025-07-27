import { useState } from 'react';

import Button from '@common/Button';
import CheckBox from '@common/CheckBox';
import { Input } from '@common/Input';
import { useVerifyMutation } from '@hook/signup/useVerifyMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailOnlyFormValues,
  EmailOnlySchema,
} from '@validation/signup/SignupSchema';
import { Controller, useForm } from 'react-hook-form';

interface SignupProps {
  onNext: () => void;
  setEmail: (email: string) => void;
}

const SingupAgree = ({ onNext, setEmail }: SignupProps) => {
  const [checkedList, setCheckedList] = useState([false, false, false]);
  const { control, handleSubmit } = useForm<EmailOnlyFormValues>({
    resolver: zodResolver(EmailOnlySchema),
    mode: 'onChange',
  });

  const verifyMutation = useVerifyMutation();

  const allChecked = checkedList.every(Boolean);
  const handleAllToggle = () => {
    const newValue = !allChecked;
    setCheckedList([newValue, newValue, newValue]);
  };

  const handleSingleToggle = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  const onSubmit = async (data: EmailOnlyFormValues) => {
    if (!checkedList.every(Boolean)) {
      alert('모든 필수 항목에 동의해야 합니다.');
      return;
    }

    try {
      await verifyMutation.mutateAsync({
        email: data.email,
        type: 'SIGN_UP',
      });
      setEmail(data.email);
      onNext();
    } catch (err) {
      alert('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <form
      className="flex w-full flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full max-w-[424px] flex-col items-start">
        <div className="mb-5 text-gray-900 font-T01-B">회원가입하기</div>
        <div className="font-T01-M mb-[50px] text-gray-800">
          아래의 항목을 확인하신 후, 동의 여부를 체크해주세요.
        </div>

        <div className="flex w-full flex-col gap-4">
          <CheckBox
            checked={allChecked}
            onToggle={handleAllToggle}
            label="모두 동의"
            labelClassName="text-gray-900 font-B01-B"
          />

          <div className="flex w-full items-center justify-between">
            <div className="flex w-[270px] items-center justify-between">
              <CheckBox
                checked={checkedList[0]}
                onToggle={() => handleSingleToggle(0)}
                label="만 14세 이상 가입 동의"
                labelClassName="text-gray-900 font-B01-M"
              />
              <div className="text-success font-B01-M">(필수)</div>
            </div>
            <div className="cursor-pointer text-gray-400 underline font-B03-M">
              약관보기
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex w-[270px] items-center justify-between">
              <CheckBox
                checked={checkedList[1]}
                onToggle={() => handleSingleToggle(1)}
                label="서비스 이용약관 동의"
                labelClassName="text-gray-900 font-B01-M"
              />
              <div className="text-success font-B01-M">(필수)</div>
            </div>
            <div className="cursor-pointer text-gray-400 underline font-B03-M">
              약관보기
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex w-[270px] items-center justify-between">
              <CheckBox
                checked={checkedList[2]}
                onToggle={() => handleSingleToggle(2)}
                label="개인 정보처리방침 동의"
                labelClassName="text-gray-900 font-B01-M"
              />
              <div className="text-success font-B01-M">(필수)</div>
            </div>
            <div className="cursor-pointer text-gray-400 underline font-B03-M">
              약관보기
            </div>
          </div>
        </div>

        <div className="mt-[50px] flex w-full flex-col">
          <div className="text-gray-900 font-T04-B"> 이메일 인증하기 </div>
          <span className="mb-6 mt-[10px] text-gray-800 font-B02-M">
            두드림 서비스를 이용하시려면 이메일 인증이 필요합니다.
          </span>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                inputtitle="이메일"
                placeholder="이메일을 입력하세요"
                className="h-[68px] w-full pr-[84px] font-B02-M"
              />
            )}
          />
        </div>

        <Button
          text="인증번호 전송하기"
          color="primary"
          type="submit"
          className="mt-[59px] h-[60px] w-full font-T05-SB"
        />
      </div>
    </form>
  );
};

export default SingupAgree;
