import { useQuery } from '@tanstack/react-query';
import { fetchRegions } from '@hook/common/regionApi';
import { ParsedRegionData } from '@type/filter/region';
import { cityOptions, districtMap } from '@utils/data/job/filterOptions';

export const useRegionsQuery = () => {
  return useQuery<ParsedRegionData, Error>({
    queryKey: ['regions'],
    queryFn: fetchRegions,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: {
      cityOptions,
      districtMap,
      regionList: [],
    },
  });
};
