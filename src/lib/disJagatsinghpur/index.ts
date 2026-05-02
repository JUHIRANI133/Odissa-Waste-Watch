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

export interface JagatsinghpurDistrictData {
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

export const jagatsinghpurDistrictData: JagatsinghpurDistrictData = {
  district: 'Jagatsinghpur',
  blocks: ['Jagatsinghpur', 'Kujanga'],
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
  },
  getGpDetails: (gpName: string) => {
    const name = gpName.toLowerCase();
    const mapping = gpMappingData.find(m => m.gpName.toLowerCase() === name);
    const waste = wasteGenerationData.find(w => w.gpName.toLowerCase() === name);
    const routes = routePlanData.filter(r => 
      r.startingGp.toLowerCase() === name || 
      (Array.isArray(r.intermediateGps) && r.intermediateGps.some(igp => (typeof igp === 'string' ? igp : igp).toLowerCase() === name)) ||
      r.finalGp.toLowerCase() === name
    );
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().includes(name));
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const targetBlock = blockName.toLowerCase();
    const gps = gpMappingData.filter(m => m.block.toLowerCase() === targetBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase()));
    const routes = routePlanData.filter(r => {
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase());
      const isFinalMatch = gpNames.includes(r.finalGp.toLowerCase());
      return isStartMatch || isFinalMatch || r.routeName.toLowerCase().includes(targetBlock);
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase() === targetBlock || (targetBlock === 'kujanga' && s.block.toLowerCase() === 'kujang'));
    return { gps, waste, routes, schedules };
  }
};
