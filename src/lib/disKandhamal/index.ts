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

export interface KandhamalDistrictData {
  district: string;
  blocks: string[];
  data: {
    gpMappings: GpMappingData[];
    wasteGeneration: WasteGenerationData[];
    routes: RoutePlanData[];
    collectionSchedules: CollectionScheduleItem[];
    steeringCommitteeData: any;
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

export const kandhamalDistrictData: KandhamalDistrictData = {
  district: 'Kandhamal',
  blocks: ['BALLIGUDA', 'Phulbani', 'G.UDAYAGIRI'],
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
    steeringCommitteeData: steeringCommitteeData
  },
  getGpDetails: (gpName: string) => {
    const name = gpName.toLowerCase().trim();
    const mapping = gpMappingData.find(m => m.gpName.toLowerCase().trim() === name);
    const waste = wasteGenerationData.find(w => w.gpName.toLowerCase().trim() === name);
    const routes = routePlanData.filter(r => 
      r.startingGp.toLowerCase().trim() === name || 
      (r.intermediateGps || []).some(igp => igp.toLowerCase().trim() === name) ||
      r.finalGp.toLowerCase().trim() === name
    );
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().trim().includes(name));
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const targetBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === targetBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const routes = routePlanData.filter(r => {
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      const isFinalMatch = gpNames.includes(r.finalGp.toLowerCase().trim());
      return isStartMatch || isFinalMatch;
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === targetBlock);
    return { gps, waste, routes, schedules };
  }
};
