import { gpMappingData, GpMappingData } from './gpMappingData';
import { routePlanData, RoutePlanData } from './routePlanData';
import { sanitationWorkerData, driverData, SanitationWorkerData, DriverData } from './workerDetailsData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';
import { collectionScheduleData, CollectionScheduleItem } from './collectionScheduleData';
import { steeringCommitteeData } from './steeringCommitteeData';

export {
  gpMappingData,
  routePlanData,
  sanitationWorkerData,
  driverData,
  wasteGenerationData,
  collectionScheduleData,
  steeringCommitteeData
};

export type {
  GpMappingData,
  RoutePlanData,
  SanitationWorkerData,
  DriverData,
  WasteGenerationData,
  CollectionScheduleItem
};

export interface JajpurDistrictData {
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
    routes: RoutePlanData[];
    sanitationWorkers: SanitationWorkerData[];
    drivers: DriverData[];
    wasteGeneration: WasteGenerationData[];
    collectionSchedules: CollectionScheduleItem[];
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

const totalHouseholds = wasteGenerationData.reduce((sum, item) => sum + item.totalHouseholds, 0);
const totalWasteKg = wasteGenerationData.reduce((sum, item) => sum + item.totalWasteKg, 0);
const uniqueBlocks = [...new Set(gpMappingData.map(item => item.block))];

export const jajpurDistrictData: JajpurDistrictData = {
  district: 'Jajpur',
  blocks: uniqueBlocks,
  stats: {
    totalGps: gpMappingData.length,
    totalHouseholds: totalHouseholds,
    totalWasteKg: parseFloat(totalWasteKg.toFixed(2)),
    totalRoutes: routePlanData.length,
    totalSanitationWorkers: sanitationWorkerData.length,
    totalDrivers: driverData.length,
  },
  data: {
    gpMappings: gpMappingData,
    routes: routePlanData,
    sanitationWorkers: sanitationWorkerData,
    drivers: driverData,
    wasteGeneration: wasteGenerationData,
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
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().trim() === cleanName);
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const cleanBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === cleanBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const workers = sanitationWorkerData.filter(w => w.block.toLowerCase().trim() === cleanBlock);
    const drivers = driverData.filter(d => d.block.toLowerCase().trim() === cleanBlock);
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const routes = routePlanData.filter(r => 
      r.startingGp.toLowerCase().trim() === cleanBlock || // Fallback for block matching
      gpNames.includes(r.startingGp.toLowerCase().trim())
    );
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === cleanBlock);
    return { gps, workers, drivers, waste, routes, schedules };
  }
};
