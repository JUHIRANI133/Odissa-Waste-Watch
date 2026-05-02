import { steeringCommitteeData } from './steeringCommitteeData';

export { steeringCommitteeData };

export const baleshwarDistrictData = {
  district: 'Baleshwar',
  blocks: [],
  data: {
    gpMappings: [],
    wasteGeneration: [],
    routes: [],
    collectionSchedules: [],
  },
  getGpDetails: (gpName: string) => ({ mapping: null, waste: null, routes: [], schedule: null }),
  getBlockDetails: (blockName: string) => ({ gps: [], waste: [], routes: [], schedules: [] })
};
