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

export interface NuapadaDistrictData {
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

export const nuapadaDistrictData: NuapadaDistrictData = {
  district: 'Nuapada',
  blocks: ['Nuapada', 'Komna', 'Khariar', 'Sinapali', 'Boden'],
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
    const schedule = collectionScheduleData.find(s => s.gpName.toLowerCase().trim() === cleanName);
    return { mapping, waste, routes, schedule };
  },
  getBlockDetails: (blockName: string) => {
    const cleanBlock = blockName.toLowerCase().trim();
    const gps = gpMappingData.filter(m => m.block.toLowerCase().trim() === cleanBlock);
    const gpNames = gps.map(g => g.gpName.toLowerCase().trim());
    const waste = wasteGenerationData.filter(w => gpNames.includes(w.gpName.toLowerCase().trim()));
    const routes = routePlanData.filter(r => {
      const routePrefix = r.routeId.substring(1, 4).toLowerCase();
      const blockInitial = cleanBlock.substring(0, 3).toLowerCase();
      const isBlockMatch = routePrefix === blockInitial || (cleanBlock === 'nuapada' && routePrefix === 'nua');
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase().trim());
      return isBlockMatch || isStartMatch;
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase().trim() === cleanBlock);
    return { gps, waste, routes, schedules };
  }
};
