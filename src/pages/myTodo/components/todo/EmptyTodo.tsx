import Button from '@common/Button.tsx';
import WarningImg from '@assets/images/warning.webp';

interface Props {
  onNavigate: () => void;
}

const EmptyTodo = ({ onNavigate }: Props) => (
  <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
    <h2 className="text-gray-900 font-T02-B">담은 직업이 아직 없어요!</h2>
    <p className="text-center text-gray-500 font-B02-M">
      할일 목록을 이용하시려면,
      <br />
      우선 관심 직업 1개를 담아주세요
    </p>
    <img src={WarningImg} alt="스크랩 비어 있음" className="h-32 w-32" />
    <Button
      text={'직업 담으러 가기'}
      className="h-[62px] w-[242px] font-T05-SB"
      onClick={onNavigate}
    />
  </div>
);
export default EmptyTodo;
