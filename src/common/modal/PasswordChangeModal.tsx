import Cancel from '@assets/icons/bigcancel.svg?react';
import Button from '@common/Button';
import Divider from '@common/Divider';
import { Input } from '@common/Input';
import { useUpdatePasswordMutation } from '@hook/mypage/useUpdatePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdatePasswordFormValues,
  UpdatePasswordSchema,
} from '@validation/mypage/UpdatePasswordSchema';

import { Controller, useForm } from 'react-hook-form';

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: 'onChange',
  });

  const { mutate: updatePassword } = useUpdatePasswordMutation(onClose);

  const onSubmit = (data: UpdatePasswordFormValues) => {
    updatePassword({
      newPassword: data.password,
      newPasswordCheck: data.passwordcheck,
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-[511px] flex-col items-start rounded-[30px] bg-white p-[30px]">
        <div className="flex w-full justify-between">
          <div className="text-black font-T03-B">비밀번호 변경 </div>
          <Cancel className="cursor-pointer text-gray-500" onClick={onClose} />
        </div>

        <Divider className="mt-4" />

        <div className="flex w-full flex-col items-end gap-10">
          <div className="mt-10 flex w-full flex-col gap-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  inputtitle="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  isPassword
                  className={`h-[68px] w-full font-B02-M ${
                    errors.password ? 'border-warning' : ''
                  }`}
                  undertext={
                    errors.password?.message ||
                    '8~16자/영문 대소문자,숫자,특수문자 조합'
                  }
                  undertextClassName={
                    errors.password ? 'text-warning' : 'text-gray-500'
                  }
                  minLength={8}
                  maxLength={16}
                />
              )}
            />

            <Controller
              name="passwordcheck"
              control={control}
              defaultValue=""
              render={({ field }) => {
                const passwordValue = getValues('password');
                const isMatch = field.value && passwordValue === field.value;
                const hasError = !!errors.passwordcheck;

                return (
                  <Input
                    {...field}
                    inputtitle="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력하세요"
                    isPassword
                    className={`h-[68px] w-full font-B02-M ${
                      hasError ? 'border-warning' : ''
                    }`}
                    undertext={
                      hasError
                        ? errors.passwordcheck?.message
                        : isMatch
                          ? '비밀번호가 일치합니다'
                          : ''
                    }
                    undertextClassName={
                      hasError ? 'text-warning' : isMatch ? 'text-success' : ''
                    }
                  />
                );
              }}
            />
          </div>

          <Button
            text="완료"
            color="primary"
            className="flex items-center justify-end rounded-[14px] px-[30px] py-3"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
