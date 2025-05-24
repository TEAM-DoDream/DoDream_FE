import CustomSortDropdown from '@pages/myTodo/components/scrap/CustomSortDropdown.tsx';

interface Props {
  sortValue: string;
  onSortChange: (v: string) => void;
  regionValue: string;
  onRegionClick: () => void;
}

const SortAndRegionFilter = ({
  sortValue,
  onSortChange,
  regionValue,
  onRegionClick,
}: Props) => (
  <div className="mt-4 flex items-center gap-4">
    <CustomSortDropdown value={sortValue} onChange={onSortChange} />
    <button onClick={onRegionClick} className="text-gray-900 font-B01-M">
      {regionValue}
    </button>
  </div>
);
export default SortAndRegionFilter;
