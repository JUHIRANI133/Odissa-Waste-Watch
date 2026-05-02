import { gpMappingData, GpMappingData } from './gpMappingData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';
import { routePlanData, RoutePlanData } from './routePlanData';
import { collectionScheduleData, CollectionScheduleItem } from './collectionScheduleData';

export {
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

export interface BhadrakDistrictData {
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

export const bhadrakDistrictData: BhadrakDistrictData = {
  district: 'Bhadrak',
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
    const mapping = gpMappingData.find(m => m.gpName.toLowerCase() === gpName.toLowerCase());
    const waste = wasteGenerationData.find(w => w.gpName.toLowerCase() === gpName.toLowerCase());
    const routes = routePlanData.filter(r => 
      r.startingGp.toLowerCase() === gpName.toLowerCase() || 
      r.intermediateGps.some(igp => igp.toLowerCase() === gpName.toLowerCase()) ||
      r.finalGp.toLowerCase() === gpName.toLowerCase()
    );
    
    // Improved cluster matching: Look for GP name OR the Route ID within the schedule's cluster name
    const schedule = collectionScheduleData.find(s => 
      s.gpName.toLowerCase().includes(gpName.toLowerCase()) ||
      (routes.length > 0 && s.gpName.toLowerCase().includes(routes[0].routeId.toLowerCase()))
    );
    
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const gps = gpMappingData.filter(m => m.block.toLowerCase() === blockName.toLowerCase());
    const gpNames = gps.map(g => g.gpName.toLowerCase());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase()));
    const routes = routePlanData.filter(r => 
      gpNames.includes(r.startingGp.toLowerCase()) || 
      r.intermediateGps.some(igp => gpNames.includes(igp.toLowerCase())) ||
      blockName.toLowerCase() === 'bhadrak'
    );
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase() === blockName.toLowerCase());
    return { gps, waste, routes, schedules };
  }
};
