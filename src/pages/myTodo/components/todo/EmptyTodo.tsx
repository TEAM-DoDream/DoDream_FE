import Button from '@common/Button.tsx';
import WarningImg from '@assets/images/warning.webp';

interface Props {
  onNavigate: () => void;
}

const EmptyTodo = ({ onNavigate }: Props) => (
  <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
    <img src={WarningImg} alt="스크랩 비어 있음" className="h-32 w-32" />
    <h2 className="text-gray-900 font-T02-B">아직 담은 직업 정보가 없어요!</h2>
    <p className="text-center text-gray-500 font-B02-M">
      투두리스트는 관심 있는 직업을 먼저 담은 뒤,
      <br />그 직업에 맞춰 작성하고 관리할 수 있어요!
    </p>
    <Button
      text={'직업 정보 둘러보기'}
      className="h-[62px] w-[242px] font-T05-SB"
      onClick={onNavigate}
    />
  </div>
);
export default EmptyTodo;
