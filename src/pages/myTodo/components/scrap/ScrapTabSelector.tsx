interface Props {
  activeTab: 'job' | 'edu';
  setActiveTab: (tab: 'job' | 'edu') => void;
}

const ScrapTabSelector = ({ activeTab, setActiveTab }: Props) => (
  <div className="mt-6 flex gap-2 border-b border-gray-200">
    {['job', 'edu'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab as 'job' | 'edu')}
        className={`w-[102px] pb-2 font-T05-SB ${
          activeTab === tab
            ? 'border-b-4 border-purple-500 text-purple-500'
            : 'text-gray-300'
        }`}
      >
        {tab === 'job' ? '채용 정보' : '학원 정보'}
      </button>
    ))}
  </div>
);
export default ScrapTabSelector;
