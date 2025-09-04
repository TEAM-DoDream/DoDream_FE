export interface JobItem {
  id: number;
  name: string;
}

export const jobs: JobItem[] = [
  { id: 1, name: '요양보호사' },
  { id: 2, name: '간호조무사' },
  { id: 3, name: '보육교사' },
  { id: 4, name: '사회복지사' },
  { id: 5, name: '직업상담사' },
  { id: 6, name: '심리상담사' },
  { id: 7, name: '급식 도우미' },
  { id: 8, name: '사무보조원' },
  { id: 9, name: '회계사무원' },
  { id: 10, name: '수의테크니션' },
  { id: 11, name: '웨딩 헬퍼' },
  { id: 12, name: '미용사 (일반)' },
  { id: 13, name: '미용사 (피부)' },
  { id: 14, name: '미용사 (네일)' },
  { id: 15, name: '미용사 (메이크업)' },
  { id: 16, name: '반려동물미용사' },
  { id: 17, name: '레크리에이션 지도사' },
  { id: 18, name: '바리스타' },
  { id: 19, name: '공인중개사' },
  { id: 20, name: '산후조리사' },
];

export const jobNames: string[] = jobs.map((j) => j.name);

export const findJobIdByName = (name: string): number | null => {
  const found = jobs.find((j) => j.name === name);
  return found ? found.id : null;
};

export default jobNames;
