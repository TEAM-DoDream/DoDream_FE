import Pagination from '@common/Pagination';

interface Props {
  jobs: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
}
// api 연결 이후 jobs 추가
const ScrapListSection = ({ currentPage, onPageChange }: Props) => (
  <>
    <div className="mb-6 grid grid-cols-3 gap-4">
      {/* {jobs.map((job) => <RecruitCard item={job} key={job.id} />)} */}
    </div>
    <div className="mx-auto mb-[80px] mt-[30px] w-fit">
      <Pagination
        totalPages={5}
        currentPage={currentPage}
        setCurrentPage={onPageChange}
      />
    </div>
  </>
);
export default ScrapListSection;
