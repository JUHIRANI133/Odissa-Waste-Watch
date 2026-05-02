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

export interface GanjamDistrictData {
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

export const ganjamDistrictData: GanjamDistrictData = {
  district: 'Ganjam',
  blocks: ['Aska', 'Belaguntha', 'Bhanjanagar', 'Buguda', 'Chikiti', 'Digapahandi', 'Hinjilicut', 'Khallikote', 'Polosara', 'Sanakhemundi', 'Sheragada', 'Surada', 'Kukudakhandi', 'Chatrapur', 'Rangeilunda', 'Purushottampur', 'Ganjam', 'Kabisuryanagar', 'Beguniapada'],
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
      r.intermediateGps.some(igp => (typeof igp === 'string' ? igp : igp.name).toLowerCase() === name) ||
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
      const blockInitial = blockName.substring(0, 3).toLowerCase();
      const routePrefix = r.routeId.substring(1, 4).toLowerCase();
      const isStartMatch = gpNames.includes(r.startingGp.toLowerCase());
      const isBlockMatch = routePrefix === blockInitial || (blockName.toLowerCase() === 'ganjam' && routePrefix === 'gan');
      return isStartMatch || isBlockMatch;
    });
    const schedules = collectionScheduleData.filter(s => s.block.toLowerCase() === targetBlock);
    return { gps, waste, routes, schedules };
  }
};