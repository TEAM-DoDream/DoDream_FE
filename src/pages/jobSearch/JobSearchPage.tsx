import { useState } from 'react';
import Filter from '@pages/jobSearch/components/Filter.tsx';
import MagnifyIcon from '@assets/images/job_search.webp';
import RecruitCard from '@common/RecruitCard.tsx';
import CardDetail from '@pages/jobSearch/components/CardDetail.tsx';
import Img from '@assets/images/illustration_1.webp';
import Footer from '@common/Footer.tsx';
import { useRecruitListQuery } from '@hook/useRecruitListQuery.ts';
import Pagination from '@common/Pagination.tsx';
import LoadingSpinner from '@common/LoadingSpinner.tsx';
import { JobItem } from '@utils/data/job/jobMapper.ts';

interface JobListResponse {
  job: JobItem[];
  count: number;
  total: number;
  start: number;
}

const JobSearchPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { data = { job: [], count: 0, total: 0, start: 0 }, isPending } =
    useRecruitListQuery<JobListResponse>(currentPage);

  const totalPages = Math.ceil(Number(data.total || 0) / (data.count || 10));
  const jobs = data.job || [];
  console.log(jobs);

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="bg-purple-100">
        <div className="container mx-auto mb-16 flex flex-col items-start gap-4 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4">
            <img className="h-12 w-12" src={MagnifyIcon} alt="돋보기" />
            <p className="text-gray-500 font-B03-M">일자리 찾기</p>
            <h1 className="text-gray-900 font-T01-B">
              우리 집 근처, 일자리를 찾아보세요
            </h1>
          </div>
          <img
            className="h-auto max-w-xs lg:max-w-sm"
            src={Img}
            alt="일자리 이미지"
          />
        </div>
      </div>

      <div className="container mx-auto -mt-32">
        <Filter />
      </div>

      <div className="container mx-auto mb-4 mt-16 flex text-black font-T03-B">
        <p className="text-purple-500 font-T03-B">{data.total ?? 0}개</p>의
        일자리가 구인 중이에요
      </div>

      <div className="container mx-auto mb-6 px-4 pt-8">
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <RecruitCard
              key={job.id}
              item={{
                id: Number(job.id),
                company: job.companyName,
                title: job.title,
                hashtags: [
                  job.experienceLevel,
                  job.jobTypeName,
                  job.requiredEducationLevel,
                  job.salary,
                  job.locationName,
                ].filter((tag): tag is string => Boolean(tag)),
                endDate: job['expiration-date'],
                deadline: job.deadline,
                url: job.url,
              }}
              onClick={() => setSelectedCardId(job.id)}
            />
          ))}
        </div>

        <div className="mx-auto mb-[80px] mt-[30px] w-fit">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      <Footer />

      {selectedCardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <CardDetail
            id={selectedCardId}
            onClose={() => setSelectedCardId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
