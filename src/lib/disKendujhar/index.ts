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

export interface KendujharDistrictData {
  district: string;
  blocks: string[];
  stats: {
    totalGps: number;
    totalHouseholds: number;
    totalWasteKg: number;
    totalRoutes: number;
    totalSanitationWorkers: number;
    totalDrivers: number;
  };
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

const totalHouseholds = 93339;
const totalWasteKg = 183159;
const uniqueBlocks = ['Anandapur', 'Champua', 'Joda', 'Kendujhar Sadar'];

export const kendujharDistrictData: KendujharDistrictData = {
  district: 'Kendujhar',
  blocks: uniqueBlocks,
  stats: {
    totalGps: 84,
    totalHouseholds: totalHouseholds,
    totalWasteKg: totalWasteKg,
    totalRoutes: routePlanData.length,
    totalSanitationWorkers: routePlanData.reduce((acc, curr) => acc + curr.workers.length, 0),
    totalDrivers: routePlanData.length,
  },
  data: {
    gpMappings: gpMappingData,
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
    steeringCommitteeData: steeringCommitteeData
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
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().trim() === cleanName);
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const cleanBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === cleanBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === cleanBlock);
    const routes = routePlanData.filter(r => {
      // Find routes that either explicitly have a matching block prefix or contain one of the block's GPs
      const routePrefix = r.routeId.substring(1, 4).toLowerCase();
      const blockInitial = cleanBlock.substring(0, 3).toLowerCase();
      const isBlockMatch = routePrefix === blockInitial || (cleanBlock === 'kendujhar sadar' && routePrefix === 'ken');
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      const isFinalMatch = r.finalGp && gpNames.includes(r.finalGp.toLowerCase().trim());
      return isBlockMatch || isStartMatch || isFinalMatch;
    });
    return { gps, waste, routes, schedules };
  }
};