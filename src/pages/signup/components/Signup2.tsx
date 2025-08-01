import Button from '@common/Button';
import { useState } from 'react';
import useMediaQuery from '@hook/useMediaQuery';
import AddressModal from './AddressModal';
import { Input } from '@common/Input';
import AddressInput from './AddressInput';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Signup2FormValues,
  Signup2Schema,
} from '@validation/signup/SignupSchema';
import { useSignupStore } from '@store/useSignupStore';
import {
  useDuplicateNicknameMutation,
  useSignupMutation,
} from '@hook/useSignup';

const Signup2 = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const isMobile = useMediaQuery();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [address, setAddress] = useState('');
  const genderOptions = [
    { label: '여자', value: 'FEMALE' },
    { label: '남자', value: 'MALE' },
  ];
  const [regionCode, setRegionCode] = useState<string | null>(null);

  const { loginId, password, gender, email } = useSignupStore();
  const { mutate } = useSignupMutation();
  const { mutate: checkNickname } = useDuplicateNicknameMutation();
  const [displayBirthDate, setDisplayBirthDate] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);
  const [duplicateSuccess, setDuplicateSuccess] = useState<boolean | null>(
    null
  );
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<Signup2FormValues>({
    resolver: zodResolver(Signup2Schema),
    defaultValues: {
      nickname: '',
      date: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: Signup2FormValues) => {
    if (duplicateSuccess !== true) {
      setDuplicateMessage('닉네임 중복확인을 완료해주세요');
      setDuplicateSuccess(false);
      return;
    }
    const requestData = {
      loginId,
      password,
      email,
      nickName: data.nickname,
      birthDate: data.date,
      gender: selectedGender ?? gender,
      regionCode,
    };

    mutate(requestData);
  };

  const handleCheckNickname = () => {
    const nickName = getValues('nickname');
    if (!nickName) return;

    checkNickname(nickName, {
      onSuccess: (data) => {
        if (data.duplicated) {
          setDuplicateSuccess(false);
          setDuplicateMessage('이미 사용 중인 닉네임입니다.');
        } else {
          setDuplicateSuccess(true);
          setDuplicateMessage('사용가능한 닉네임입니다');
        }
      },
      onError: () => {
        setDuplicateSuccess(false);
        setDuplicateMessage('이미 사용 중인 닉네임입니다.');
      },
    });
  };

  const formatBirthDate = (input: string) => {
    const raw = input.replace(/\D/g, '').slice(0, 8);
    if (raw.length < 4) return raw;
    if (raw.length < 6) return `${raw.slice(0, 4)} / ${raw.slice(4)}`;
    return `${raw.slice(0, 4)} / ${raw.slice(4, 6)} / ${raw.slice(6)}`;
  };

  const normalizeBirthDate = (formatted: string) => {
    const raw = formatted.replace(/\D/g, '').slice(0, 8);
    if (raw.length === 8) {
      return `${raw.slice(0, 4)}/${raw.slice(4, 6)}/${raw.slice(6, 8)}`;
    }
    return '';
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center"
    >
      <div
        className={`flex flex-col items-start gap-[30px] ${
          isMobile ? 'w-full max-w-[393px] px-4' : 'w-full max-w-[424px]'
        }`}
      >
        <div className="text-gray-900 font-T01-B">회원가입하기</div>

        <div className="relative w-full">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                inputtitle="닉네임"
                placeholder="닉네임을 입력하세요"
                className={`h-[68px] w-full pr-[84px] font-B02-M ${
                  errors.nickname ? 'border-warning' : ''
                }`}
                undertext={
                  errors.nickname?.message
                    ? errors.nickname.message
                    : duplicateMessage || '2~8자 이내의 한글, 영문, 숫자'
                }
                undertextClassName={
                  errors.nickname?.message
                    ? 'text-warning'
                    : duplicateSuccess === true
                      ? 'text-success'
                      : duplicateSuccess === false
                        ? 'text-warning'
                        : 'text-gray-500'
                }
                minLength={1}
                maxLength={8}
              />
            )}
          />
          <button
            type="button"
            onClick={handleCheckNickname}
            className="absolute right-4 top-[52%] h-[38px] -translate-y-1/2 cursor-pointer rounded-[10px] bg-gray-400 px-[10px] py-2 text-white font-B03-M"
          >
            중복확인
          </button>
        </div>

        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value, ...rest } }) => {
            const handleInputChange = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const formatted = formatBirthDate(e.target.value);
              const normalized = normalizeBirthDate(formatted);
              setDisplayBirthDate(formatted);
              onChange(normalized);
            };

            return (
              <Input
                {...rest}
                value={displayBirthDate}
                onChange={handleInputChange}
                inputtitle="생년월일"
                placeholder="YYYY / MM / DD"
                inputMode="numeric"
                maxLength={14}
                className={`h-[68px] w-full font-B02-M ${
                  errors.date ? 'border-warning' : ''
                }`}
                undertext={errors.date?.message}
                undertextClassName={errors.date ? 'text-warning' : ''}
              />
            );
          }}
        />

        <div className="flex w-full flex-col gap-2">
          <span className="text-gray-600 font-B01-M">성별</span>
          <div className="flex flex-row gap-3">
            {genderOptions.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedGender(value)}
                className={`flex h-[68px] w-full cursor-pointer items-center justify-center rounded-2xl px-5 py-6 ${
                  selectedGender === value
                    ? 'bg-purple-150 text-purple-500 font-B02-SB'
                    : 'bg-gray-100 text-gray-400 font-B02-M'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AddressInput onClick={() => setIsModal(true)} address={address} />
      </div>

      <div
        className={`${
          isMobile
            ? 'mt-[40px] w-full max-w-[393px] px-4 pb-10'
            : 'mt-[40px] w-full max-w-[424px]'
        }`}
      >
        <Button
          text="두드림 시작하기"
          type="submit"
          color="primary"
          className="h-[60px] w-full font-T05-SB"
        />
      </div>
      {isModal && (
        <AddressModal
          onClose={(selectedAddress?: string, selectedRegionCode?: string) => {
            if (selectedAddress && selectedRegionCode) {
              setAddress(selectedAddress);
              setRegionCode(selectedRegionCode);
              setIsModal(false);
            }
            setIsModal(false);
          }}
        />
      )}
    </form>
  );
};

export default Signup2;
