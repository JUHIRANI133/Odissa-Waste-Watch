import { gpMappingData, GpMappingData } from './gpMappingData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';
import { steeringCommitteeData } from './steeringCommitteeData';
import { routePlanData, RoutePlanData } from './routePlanData';
import { collectionScheduleData, CollectionScheduleItem } from './collectionScheduleData';

export {
  gpMappingData,
  wasteGenerationData,
  steeringCommitteeData,
  routePlanData,
  collectionScheduleData
};

export type {
  GpMappingData,
  WasteGenerationData,
  RoutePlanData,
  CollectionScheduleItem
};

export interface SonepurDistrictData {
  district: string;
  blocks: string[];
  stats: {
    totalGps: number;
    totalHouseholds: number;
    totalWasteKg: number;
    totalRoutes: number;
  };
  data: {
    gpMappings: GpMappingData[];
    wasteGeneration: WasteGenerationData[];
    routes: RoutePlanData[];
    collectionSchedules: CollectionScheduleItem[];
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

const totalHouseholds = wasteGenerationData.reduce((sum, item) => sum + item.totalHouseholds, 0);
const totalWasteKg = wasteGenerationData.reduce((sum, item) => sum + item.totalWasteKg, 0);
const uniqueBlocks = [...new Set(gpMappingData.map(item => item.block))];

export const sonepurDistrictData: SonepurDistrictData = {
  district: 'Sonepur',
  blocks: uniqueBlocks,
  stats: {
    totalGps: gpMappingData.length,
    totalHouseholds: totalHouseholds,
    totalWasteKg: parseFloat(totalWasteKg.toFixed(2)),
    totalRoutes: routePlanData.length,
  },
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
    const cleanBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === cleanBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const routes = routePlanData.filter(r => {
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      const isFinalMatch = r.finalGp && gpNames.includes(r.finalGp.toLowerCase().trim());
      return isStartMatch || isFinalMatch;
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === cleanBlock);
    return { gps, waste, routes, schedules };
  }
};
