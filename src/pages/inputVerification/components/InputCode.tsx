import { useVerifyMutation } from "@hook/signup/useVerifyMutation";
import { useNavigate } from "react-router-dom";

interface InputCodeProps {
  value: string;
  onChange: (value: string) => void;
  email: string;
}

const InputCode = ({ value, onChange, email }: InputCodeProps) => {
  const navigate = useNavigate();
  const { mutate: verify } = useVerifyMutation();
  const handleResend = () => {
    verify({
      email: email,
      type: 'FIND_ID',
    }, {
      onSuccess: () => {
        alert('인증번호가 다시 발송되었습니다.');
        navigate('/verification', { state: { email: email } });
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className="relative min-h-[72px] w-[424px]">
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        className="w-full rounded-[16px] border border-gray-300 px-[20px] py-[24px] pl-4 text-gray-700 font-B02-M placeholder:text-gray-400 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[10px] bg-gray-400 px-[10px] py-[8px] text-white font-B03-M"
        onClick={handleResend}
      >
        다시 받기
      </button>
    </div>
  );
};

export default InputCode;
