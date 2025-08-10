export interface Region {
  regionCode: string | null;
  regionName: string;
}

export interface ParsedRegionData {
  cityOptions: string[];
  districtMap: Record<string, string[]>;
  regionList: Region[];
}
