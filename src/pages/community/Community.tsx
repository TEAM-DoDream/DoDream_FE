import CommunityRightSide from './components/CommunityRightSide';
import CommunityLeftSide from './components/CommunityLeftSide';

const Community = () => {
  return (
    <div className="flex h-full w-full gap-[22px] bg-gray-50 px-[120px]">
      <div className="sticky top-0 h-fit w-[384px] flex-shrink-0">
        <CommunityLeftSide />
      </div>

      <div className="flex-1">
        <CommunityRightSide />
      </div>
    </div>
  );
};

export default Community;
