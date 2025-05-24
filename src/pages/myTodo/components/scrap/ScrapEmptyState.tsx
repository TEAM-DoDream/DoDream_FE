import Button from '@common/Button.tsx';
import WarningImg from '@assets/images/warning.webp';

interface Props {
  type: 'job' | 'edu';
  onNavigate: () => void;
}

const ScrapEmptyState = ({ type, onNavigate }: Props) => (
  <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
    <img src={WarningImg} alt="스크랩 비어 있음" className="h-32 w-32" />
    <h2 className="text-gray-900 font-T02-B">
      스크랩한 {type === 'job' ? '채용' : '학원'} 정보가 아직 없어요!
    </h2>
    <p className="text-center text-gray-500 font-B02-M">
      관심있는 직업에 필요한 {type === 'job' ? '채용' : '학원'} 정보를
      <br />
      차근차근 탐색한 후에 스크랩을 해보세요!
    </p>
    <Button
      text={`${type === 'job' ? '채용' : '학원'} 정보 둘러보기`}
      className="h-[62px] w-[242px] font-T05-SB"
      onClick={onNavigate}
    />
  </div>
);
export default ScrapEmptyState;
