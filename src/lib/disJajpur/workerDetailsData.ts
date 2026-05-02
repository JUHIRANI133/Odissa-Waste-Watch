export interface SanitationWorkerData {
  id: number;
  block: string;
  name: string;
  contact: string;
  activity: string;
}

export interface DriverData {
  id: number;
  block: string;
  name: string;
  contact: string;
  vehicleType: string;
}

export const sanitationWorkerData: SanitationWorkerData[] = [];
export const driverData: DriverData[] = [];
