import { useVerifyMutation } from '@hook/signup/useVerifyMutation';
import { Input } from '@common/Input.tsx';
import Button from '@common/Button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IdFindFormData, idFindSchema } from '@validation/idFind/idFindSchema';
import { useNavigate } from 'react-router-dom';

const IdFindPage = () => {
  const navigate = useNavigate();
  const { mutate: verify } = useVerifyMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IdFindFormData>({
    resolver: zodResolver(idFindSchema),
    mode: 'onChange',
  });

  const handleEmail = () => {
    verify(
      {
        email: watch('email'),
        type: 'FIND_ID',
      },
      {
        onSuccess: () => {
          navigate('/verification', {
            state: { email: watch('email'), type: 'FIND_ID' },
          });
        },
        onError: (error) => {
          alert(error);
        },
      }
    );
  };

  const onSubmit = () => {
    handleEmail();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">아이디 찾기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          가입한 이메일을 입력하시면, 아이디를 찾을 수 있는 인증번호를
          전송해드립니다.
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className={'mb-1 text-gray-600 font-B01-M'}>이메일</div>
          <Input
            {...register('email')}
            title={'이메일'}
            placeholder={'이메일을 입력하세요'}
            className={'mb-1 h-[68px] w-full font-B02-M'}
            value={watch('email')}
          />
          {errors.email && (
            <p className="mb-4 text-sm text-red-500">{errors.email.message}</p>
          )}
          <div className="mt-8 h-[60px] w-full font-T05-SB">
            <Button
              text={'인증번호 전송하기'}
              className="h-full w-full"
              type="submit"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdFindPage;
