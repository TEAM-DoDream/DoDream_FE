import { RecruitItem } from '@common/RecruitCard';

export interface JobItem {
  id: string;
  companyName: string;
  title: string;
  experienceLevel?: string;
  jobTypeName?: string;
  requiredEducationLevel?: string;
  salary?: string;
  locationName?: string;
  'expiration-date': string;
  deadline: string;
  url: string;
}

export const getHashtags = (job: JobItem): string[] => {
  return [
    job.experienceLevel,
    job.jobTypeName,
    job.requiredEducationLevel,
    job.salary,
    job.locationName,
  ].filter((tag): tag is string => Boolean(tag));
};

export const mapToRecruitItem = (job: JobItem): RecruitItem => {
  return {
    id: Number(job.id),
    company: job.companyName,
    title: job.title,
    hashtags: getHashtags(job),
    endDate: job['expiration-date'],
    deadline: job.deadline,
    url: job.url,
  };
};
