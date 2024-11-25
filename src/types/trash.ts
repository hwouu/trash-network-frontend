export interface TrashBin {
  deviceId: string;
  location: string;
  capacity: number;
  temperature: number;
  lastUpdated: string;
  batteryLevel: number;
  status: 'normal' | 'warning' | 'full' | 'error';
  flameDetected: boolean;  // isFire 대신 flameDetected 사용
}