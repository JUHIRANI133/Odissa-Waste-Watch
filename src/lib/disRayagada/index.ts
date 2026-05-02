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

export interface RayagadaDistrictData {
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

export const rayagadaDistrictData: RayagadaDistrictData = {
  district: 'Rayagada',
  blocks: ['GUDARI', 'Gunupur', 'RAYAGADA SDAR'],
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
  },
  getGpDetails: (gpName: string) => {
    const cleanName = gpName.toLowerCase().trim();
    const mapping = gpMappingData.find(m => m.gpName.toLowerCase().trim() === cleanName);
    const waste = wasteGenerationData.find(w => w.gpName.toLowerCase().trim() === cleanName);
    const routes = routePlanData.filter(r => 
      r.startingGp.toLowerCase().trim() === cleanName || 
      (r.intermediateGps || []).some(igp => igp.toLowerCase().trim() === cleanName) ||
      (r.finalGp && r.finalGp.toLowerCase().trim() === cleanName)
    );
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().trim().includes(cleanName));
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const targetBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === targetBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const routes = routePlanData.filter(r => {
      const blockInitial = targetBlock.substring(0, 3).toLowerCase();
      const routePrefix = r.routeId.substring(1, 4).toLowerCase();
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      const isFinalMatch = r.finalGp && gpNames.includes(r.finalGp.toLowerCase().trim());
      const isBlockPrefixMatch = (targetBlock === 'rayagada sdar' && routePrefix === 'ray') ||
                                 (targetBlock === 'gunupur' && routePrefix === 'gun') ||
                                 (targetBlock === 'gudari' && routePrefix === 'gud');
      return isStartMatch || isFinalMatch || isBlockPrefixMatch;
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === targetBlock);
    return { gps, waste, routes, schedules };
  }
};
