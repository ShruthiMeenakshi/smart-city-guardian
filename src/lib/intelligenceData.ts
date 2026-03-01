// Intelligence Hub mock data

export interface Hotspot {
  id: string;
  location: string;
  wardId: number;
  riskScore: number;
  predictedDate: string;
  wasteType: string;
  trend: 'rising' | 'falling' | 'stable';
  lat: number;
  lng: number;
}

export interface DigitalTwinNode {
  id: string;
  zone: string;
  fillLevel: number;
  capacity: number;
  lastCollected: string;
  nextCollection: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface CarbonMetric {
  month: string;
  baseline: number;
  actual: number;
  saved: number;
}

export interface RecyclingStream {
  wasteType: string;
  volumeKg: number;
  revenuePerKg: number;
  totalRevenue: number;
  trend: number;
  buyers: number;
}

export interface CitizenCredit {
  rank: number;
  citizenId: string;
  name: string;
  ward: number;
  ecoPoints: number;
  reportsSubmitted: number;
  recyclingKg: number;
  badge: 'bronze' | 'silver' | 'gold' | 'platinum';
  streak: number;
}

export const mockHotspots: Hotspot[] = [
  { id: 'H1', location: 'Anna Nagar Market', wardId: 12, riskScore: 94, predictedDate: '2026-03-02', wasteType: 'Mixed', trend: 'rising', lat: 9.9121, lng: 78.1087 },
  { id: 'H2', location: 'Periyar Bus Stand East', wardId: 5, riskScore: 91, predictedDate: '2026-03-01', wasteType: 'Organic', trend: 'rising', lat: 9.9167, lng: 78.1167 },
  { id: 'H3', location: 'Thiruparankundram School Zone', wardId: 3, riskScore: 87, predictedDate: '2026-03-03', wasteType: 'Hazardous', trend: 'stable', lat: 9.8876, lng: 78.0655 },
  { id: 'H4', location: 'KK Nagar Drain Canal', wardId: 7, riskScore: 72, predictedDate: '2026-03-04', wasteType: 'Plastic', trend: 'falling', lat: 9.9252, lng: 78.1198 },
  { id: 'H5', location: 'Tallakulam Junction', wardId: 9, riskScore: 68, predictedDate: '2026-03-05', wasteType: 'Construction', trend: 'stable', lat: 9.9300, lng: 78.1250 },
  { id: 'H6', location: 'Pasumalai Hillside', wardId: 15, riskScore: 55, predictedDate: '2026-03-06', wasteType: 'E-Waste', trend: 'falling', lat: 9.8950, lng: 78.0900 },
];

export const mockDigitalTwin: DigitalTwinNode[] = [
  { id: 'BIN-001', zone: 'Anna Nagar Sector A', fillLevel: 92, capacity: 500, lastCollected: '6h ago', nextCollection: '2h', status: 'critical' },
  { id: 'BIN-002', zone: 'Periyar Main Road', fillLevel: 78, capacity: 750, lastCollected: '3h ago', nextCollection: '5h', status: 'warning' },
  { id: 'BIN-003', zone: 'Meenakshi Temple West', fillLevel: 45, capacity: 500, lastCollected: '1h ago', nextCollection: '12h', status: 'normal' },
  { id: 'BIN-004', zone: 'Teppakulam Gardens', fillLevel: 31, capacity: 600, lastCollected: '2h ago', nextCollection: '14h', status: 'normal' },
  { id: 'BIN-005', zone: 'KK Nagar Junction', fillLevel: 85, capacity: 400, lastCollected: '8h ago', nextCollection: '1h', status: 'critical' },
  { id: 'BIN-006', zone: 'Thiruparankundram East', fillLevel: 67, capacity: 550, lastCollected: '4h ago', nextCollection: '7h', status: 'warning' },
];

export const mockCarbonMetrics: CarbonMetric[] = [
  { month: 'Oct', baseline: 420, actual: 380, saved: 40 },
  { month: 'Nov', baseline: 445, actual: 370, saved: 75 },
  { month: 'Dec', baseline: 460, actual: 350, saved: 110 },
  { month: 'Jan', baseline: 480, actual: 330, saved: 150 },
  { month: 'Feb', baseline: 500, actual: 310, saved: 190 },
  { month: 'Mar', baseline: 510, actual: 290, saved: 220 },
];

export const mockRecyclingStreams: RecyclingStream[] = [
  { wasteType: 'Plastic PET', volumeKg: 12400, revenuePerKg: 22, totalRevenue: 272800, trend: 15, buyers: 8 },
  { wasteType: 'E-Waste Components', volumeKg: 890, revenuePerKg: 310, totalRevenue: 275900, trend: 22, buyers: 3 },
  { wasteType: 'Organic Compost', volumeKg: 34500, revenuePerKg: 8, totalRevenue: 276000, trend: 8, buyers: 15 },
  { wasteType: 'Paper & Cardboard', volumeKg: 8700, revenuePerKg: 14, totalRevenue: 121800, trend: -3, buyers: 6 },
  { wasteType: 'Metal Scrap', volumeKg: 2100, revenuePerKg: 45, totalRevenue: 94500, trend: 12, buyers: 4 },
];

export const mockCitizenCredits: CitizenCredit[] = [
  { rank: 1, citizenId: 'C101', name: 'Priya Shankar', ward: 1, ecoPoints: 4850, reportsSubmitted: 67, recyclingKg: 234, badge: 'platinum', streak: 45 },
  { rank: 2, citizenId: 'C205', name: 'Arjun Venkatesh', ward: 3, ecoPoints: 3920, reportsSubmitted: 52, recyclingKg: 189, badge: 'gold', streak: 32 },
  { rank: 3, citizenId: 'C118', name: 'Lakshmi Devi', ward: 7, ecoPoints: 3450, reportsSubmitted: 48, recyclingKg: 156, badge: 'gold', streak: 28 },
  { rank: 4, citizenId: 'C302', name: 'Karthik Rajan', ward: 12, ecoPoints: 2890, reportsSubmitted: 39, recyclingKg: 121, badge: 'silver', streak: 19 },
  { rank: 5, citizenId: 'C410', name: 'Meena Sundaram', ward: 5, ecoPoints: 2340, reportsSubmitted: 31, recyclingKg: 98, badge: 'silver', streak: 14 },
  { rank: 6, citizenId: 'C225', name: 'Raj Kumar', ward: 9, ecoPoints: 1780, reportsSubmitted: 24, recyclingKg: 72, badge: 'bronze', streak: 8 },
  { rank: 7, citizenId: 'C331', name: 'Sathya Priya', ward: 2, ecoPoints: 1450, reportsSubmitted: 19, recyclingKg: 58, badge: 'bronze', streak: 5 },
  { rank: 8, citizenId: 'C142', name: 'Ganesh Mohan', ward: 15, ecoPoints: 980, reportsSubmitted: 12, recyclingKg: 35, badge: 'bronze', streak: 3 },
];

export const badgeColors: Record<string, string> = {
  bronze: 'bg-amber-700/20 text-amber-600 dark:text-amber-400',
  silver: 'bg-slate-400/20 text-slate-600 dark:text-slate-300',
  gold: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  platinum: 'bg-primary/20 text-primary',
};
