import api from '@hook/api';
import { cityOptions, districtMap } from '@utils/data/job/filterOptions';
import { ParsedRegionData, Region } from '@type/filter/region';

export const fetchRegions = async (): Promise<ParsedRegionData> => {
  try {
    const response = await api.get<{ data: Region[] }>('/v1/region/all');
    const regions = response.data.data;

    const map: Record<string, string[]> = {};
    const cities: string[] = [];

    regions.forEach(({ regionName }) => {
      const parsing = regionName.trim().split(/\s+/);

      if (parsing.length < 2) return;

      const city = parsing[0];
      const district = parsing.slice(1).join(' ');

      if (!cities.includes(city)) {
        cities.push(city);
      }

      if (map[city]) {
        if (!map[city].includes(district)) {
          map[city].push(district);
        }
      } else {
        map[city] = [district];
      }
    });

    return {
      cityOptions: cities,
      districtMap: map,
      regionList: regions,
    };
  } catch (error) {
    console.error('지역 데이터를 가져오는 중 오류가 발생했습니다:', error);

    return {
      cityOptions,
      districtMap,
      regionList: [],
    };
  }
};
