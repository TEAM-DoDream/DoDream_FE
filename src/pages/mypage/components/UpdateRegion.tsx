import { useState } from 'react';
import { useUpdateRegionMutation } from '@hook/mypage/useUpdateRegion';
import AddressModal from '@pages/signup/components/AddressModal';
import { useUserStore } from '@store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';

interface RegionCardProps {
  regionName?: string;
}

const UpdateRegion = ({ regionName }: RegionCardProps) => {
  const [regionModal, setRegionModal] = useState(false);

  const { mutate: updateRegion } = useUpdateRegionMutation();
  const setRegionName = useUserStore((state) => state.setRegionName);
  const queryClient = useQueryClient();

  const handleModalClose = (
    selectedAddress?: string,
    selectedRegionCode?: string
  ) => {
    if (selectedAddress && selectedRegionCode) {
      updateRegion(
        { newRegionCode: selectedRegionCode },
        {
          onSuccess: () => {
            setRegionName(selectedAddress);
            queryClient.invalidateQueries({ queryKey: ['Mypage'] });
            setRegionModal(false);
          },
          onError: () => {
            alert('지역 변경 실패');
          },
        }
      );
    } else {
      setRegionModal(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <span className="text-gray-900 font-B01-B">거주지</span>
          <span className="text-gray-500 font-B01-M">{regionName}</span>
        </div>

        <button
          className="flex items-center rounded-[10px] bg-purple-500 px-[10px] py-2 text-white font-B03-M"
          onClick={() => setRegionModal(true)}
        >
          변경
        </button>
      </div>

      {regionModal && <AddressModal onClose={handleModalClose} />}
    </>
  );
};

export default UpdateRegion;
