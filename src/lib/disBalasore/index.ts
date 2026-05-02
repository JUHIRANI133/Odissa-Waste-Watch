import { steeringCommitteeData } from './steeringCommitteeData';
import { gpMappingData, GpMappingData } from './gpMappingData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';

export {
  steeringCommitteeData,
  gpMappingData,
  wasteGenerationData
};

export const collectionScheduleData: any[] = [];
export const routePlanData: any[] = [];

export type {
  GpMappingData,
  WasteGenerationData
};

export interface BalasoreDistrictData {
  district: string;
  blocks: string[];
  data: {
    gpMappings: GpMappingData[];
    wasteGeneration: WasteGenerationData[];
    routes: any[];
    collectionSchedules: any[];
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

export const balasoreDistrictData: BalasoreDistrictData = {
  district: 'Balasore',
  blocks: ['Balasore Sadar', 'Jaleswar', 'Nilgiri', 'Soro', 'Remuna'],
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: [],
    collectionSchedules: [],
  },
  getGpDetails: (gpName: string) => {
    const mapping = gpMappingData.find(m => m.gpName.toLowerCase() === gpName.toLowerCase());
    const waste = wasteGenerationData.find(w => w.gpName.toLowerCase() === gpName.toLowerCase());
    return { mapping, waste, routes: [], schedule: null };
  },
  getBlockDetails: (blockName: string) => {
    const gps = gpMappingData.filter(m => m.block.toLowerCase() === blockName.toLowerCase());
    const gpNames = gps.map(g => g.gpName.toLowerCase());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase()));
    return { gps, waste, routes: [], schedules: [] };
  }
};
