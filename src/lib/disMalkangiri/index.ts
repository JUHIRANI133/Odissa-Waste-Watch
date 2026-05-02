import { steeringCommitteeData } from './steeringCommitteeData';
import { gpMappingData, GpMappingData } from './gpMappingData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';
import { routePlanData, RoutePlanData } from './routePlanData';
import { collectionScheduleData, CollectionScheduleItem } from './collectionScheduleData';

export {
  steeringCommitteeData,
  gpMappingData,
  wasteGenerationData,
  routePlanData,
  collectionScheduleData
};

export type {
  GpMappingData,
  WasteGenerationData,
  RoutePlanData,
  CollectionScheduleItem
};

export interface MalkangiriDistrictData {
  district: string;
  blocks: string[];
  data: {
    gpMappings: GpMappingData[];
    wasteGeneration: WasteGenerationData[];
    routes: RoutePlanData[];
    collectionSchedules: CollectionScheduleItem[];
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

export const malkangiriDistrictData: MalkangiriDistrictData = {
  district: 'Malkangiri',
  blocks: [],
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
  },
  getGpDetails: (gpName: string) => {
    return { mapping: null, waste: null, routes: [], schedule: null };
  },
  getBlockDetails: (blockName: string) => {
    return { gps: [], waste: [], routes: [], schedules: [] };
  }
};
