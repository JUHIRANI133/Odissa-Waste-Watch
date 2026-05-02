import { steeringCommitteeData } from './steeringCommitteeData';
import { gpMappingData, GpMappingData } from './gpMappingData';
import { wasteGenerationData, WasteGenerationData } from './wasteGenerationData';
import { routePlanData, RoutePlanData } from './routePlanData';
import { collectionScheduleData, CollectionScheduleItem } from './collectionScheduleData';
import { sanitationWorkerData, driverData, SanitationWorkerData, DriverData } from './workerDetailsData';

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
  CollectionScheduleItem,
  SanitationWorkerData,
  DriverData
};

export interface JharsugudaDistrictData {
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
    sanitationWorkers: SanitationWorkerData[];
    drivers: DriverData[];
    steeringCommitteeData: any;
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

const totalHouseholds = wasteGenerationData.reduce((sum, item) => sum + item.totalHouseholds, 0);
const totalWasteKg = wasteGenerationData.reduce((sum, item) => sum + item.totalWasteKg, 0);
const uniqueBlocks = [...new Set(gpMappingData.map(item => item.block))];

export const jharsugudaDistrictData: JharsugudaDistrictData = {
  district: 'Jharsuguda',
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
    wasteGeneration: wasteGenerationData,
    routes: routePlanData,
    collectionSchedules: collectionScheduleData,
    sanitationWorkers: sanitationWorkerData,
    drivers: driverData,
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
      // Find routes assigned to this block (using prefix or direct name if available)
      const blockInitial = targetBlock.substring(0, 3).toLowerCase();
      const routePrefix = r.routeId.substring(1, 4).toLowerCase();
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      const isBlockMatch = routePrefix === blockInitial || (targetBlock === 'jharsuguda' && routePrefix === 'jha');
      return isStartMatch || isBlockMatch;
    });

    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === targetBlock);
    const workers = sanitationWorkerData.filter(w => w.block.toLowerCase().trim() === targetBlock);
    const drivers = driverData.filter(d => d.block.toLowerCase().trim() === targetBlock);
    
    return { gps, waste, routes, schedules, workers, drivers };
  }
};
