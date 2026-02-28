// Mock data for the MUIG platform

export interface Report {
  id: string;
  location: string;
  ward: number;
  lat: number;
  lng: number;
  severity: number;
  wasteType: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved';
  description: string;
  timestamp: Date;
  imageUrl?: string;
  citizenId: string;
  illegalDumping: boolean;
}

export interface Ward {
  id: number;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  avgResolutionTime: number;
  totalReports: number;
  resolvedReports: number;
  population: number;
  participationRate: number;
  recurrenceRate: number;
}

export interface Prediction {
  id: string;
  wardId: number;
  location: string;
  overflowProbability: number;
  estimatedTimeToOverflow: number;
  lat: number;
  lng: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const mockReports: Report[] = [
  { id: 'R001', location: 'Thiruparankundram Main Rd', ward: 3, lat: 9.8876, lng: 78.0655, severity: 5, wasteType: 'Mixed Hazardous', status: 'pending', description: 'Large illegal dump near school zone', timestamp: new Date('2026-02-28T08:30:00'), citizenId: 'C101', illegalDumping: true },
  { id: 'R002', location: 'KK Nagar Junction', ward: 7, lat: 9.9252, lng: 78.1198, severity: 4, wasteType: 'Organic', status: 'assigned', description: 'Overflowing bins near market area', timestamp: new Date('2026-02-28T07:15:00'), citizenId: 'C102', illegalDumping: false },
  { id: 'R003', location: 'Anna Nagar 2nd Street', ward: 12, lat: 9.9121, lng: 78.1087, severity: 3, wasteType: 'Plastic', status: 'in-progress', description: 'Plastic waste accumulation along drain', timestamp: new Date('2026-02-27T16:45:00'), citizenId: 'C103', illegalDumping: false },
  { id: 'R004', location: 'Meenakshi Temple Area', ward: 1, lat: 9.9195, lng: 78.1193, severity: 2, wasteType: 'Paper', status: 'resolved', description: 'Paper waste near tourist area', timestamp: new Date('2026-02-27T11:20:00'), citizenId: 'C104', illegalDumping: false },
  { id: 'R005', location: 'Periyar Bus Stand', ward: 5, lat: 9.9167, lng: 78.1167, severity: 5, wasteType: 'E-Waste', status: 'pending', description: 'Electronic waste dumped illegally', timestamp: new Date('2026-02-28T06:00:00'), citizenId: 'C105', illegalDumping: true },
  { id: 'R006', location: 'Tallakulam Main Road', ward: 9, lat: 9.9300, lng: 78.1250, severity: 3, wasteType: 'Construction', status: 'assigned', description: 'Construction debris blocking footpath', timestamp: new Date('2026-02-27T14:30:00'), citizenId: 'C106', illegalDumping: false },
  { id: 'R007', location: 'Pasumalai Hill Base', ward: 15, lat: 9.8950, lng: 78.0900, severity: 4, wasteType: 'Mixed', status: 'pending', description: 'Mixed waste pile near residential area', timestamp: new Date('2026-02-28T09:10:00'), citizenId: 'C107', illegalDumping: true },
  { id: 'R008', location: 'Teppakulam Area', ward: 2, lat: 9.9210, lng: 78.1180, severity: 1, wasteType: 'Organic', status: 'resolved', description: 'Minor organic waste near park', timestamp: new Date('2026-02-26T17:00:00'), citizenId: 'C108', illegalDumping: false },
];

export const mockWards: Ward[] = [
  { id: 1, name: 'Meenakshi Ward', score: 92, trend: 'up', avgResolutionTime: 2.1, totalReports: 45, resolvedReports: 42, population: 15200, participationRate: 78, recurrenceRate: 5 },
  { id: 2, name: 'Teppakulam Ward', score: 88, trend: 'up', avgResolutionTime: 2.8, totalReports: 38, resolvedReports: 34, population: 12800, participationRate: 72, recurrenceRate: 8 },
  { id: 3, name: 'Thiruparankundram Ward', score: 61, trend: 'down', avgResolutionTime: 5.2, totalReports: 67, resolvedReports: 41, population: 18500, participationRate: 45, recurrenceRate: 22 },
  { id: 5, name: 'Periyar Ward', score: 54, trend: 'down', avgResolutionTime: 6.1, totalReports: 72, resolvedReports: 39, population: 21000, participationRate: 38, recurrenceRate: 28 },
  { id: 7, name: 'KK Nagar Ward', score: 75, trend: 'stable', avgResolutionTime: 3.5, totalReports: 55, resolvedReports: 42, population: 16700, participationRate: 62, recurrenceRate: 12 },
  { id: 9, name: 'Tallakulam Ward', score: 70, trend: 'up', avgResolutionTime: 4.0, totalReports: 48, resolvedReports: 34, population: 14300, participationRate: 55, recurrenceRate: 15 },
  { id: 12, name: 'Anna Nagar Ward', score: 45, trend: 'down', avgResolutionTime: 7.3, totalReports: 89, resolvedReports: 40, population: 22100, participationRate: 32, recurrenceRate: 35 },
  { id: 15, name: 'Pasumalai Ward', score: 67, trend: 'stable', avgResolutionTime: 4.5, totalReports: 52, resolvedReports: 35, population: 11900, participationRate: 58, recurrenceRate: 18 },
];

export const mockPredictions: Prediction[] = [
  { id: 'P001', wardId: 3, location: 'Thiruparankundram Main Rd', overflowProbability: 89, estimatedTimeToOverflow: 4, lat: 9.8876, lng: 78.0655 },
  { id: 'P002', wardId: 12, location: 'Anna Nagar Market', overflowProbability: 76, estimatedTimeToOverflow: 8, lat: 9.9121, lng: 78.1087 },
  { id: 'P003', wardId: 5, location: 'Periyar Bus Stand', overflowProbability: 92, estimatedTimeToOverflow: 2, lat: 9.9167, lng: 78.1167 },
  { id: 'P004', wardId: 7, location: 'KK Nagar Junction', overflowProbability: 65, estimatedTimeToOverflow: 12, lat: 9.9252, lng: 78.1198 },
];

export const weeklyTrend = [
  { day: 'Mon', reports: 23, resolved: 18 },
  { day: 'Tue', reports: 31, resolved: 25 },
  { day: 'Wed', reports: 28, resolved: 22 },
  { day: 'Thu', reports: 35, resolved: 30 },
  { day: 'Fri', reports: 42, resolved: 28 },
  { day: 'Sat', reports: 19, resolved: 16 },
  { day: 'Sun', reports: 12, resolved: 10 },
];

export const wasteDistribution = [
  { type: 'Organic', value: 35, color: 'hsl(160, 84%, 39%)' },
  { type: 'Plastic', value: 25, color: 'hsl(187, 94%, 43%)' },
  { type: 'E-Waste', value: 12, color: 'hsl(38, 92%, 50%)' },
  { type: 'Construction', value: 15, color: 'hsl(215, 20%, 55%)' },
  { type: 'Hazardous', value: 8, color: 'hsl(0, 72%, 51%)' },
  { type: 'Paper', value: 5, color: 'hsl(217, 91%, 60%)' },
];

export const recyclingAdvisory = [
  { wasteType: 'Plastic', method: 'Mechanical recycling & pelletization', revenuePerKg: 18, impactReduction: '72%', employment: 45, localReuse: 'Road construction aggregate, furniture material' },
  { wasteType: 'Organic', method: 'Composting & biogas generation', revenuePerKg: 8, impactReduction: '85%', employment: 120, localReuse: 'Agricultural fertilizer, community gardens' },
  { wasteType: 'E-Waste', method: 'Component extraction & refurbishment', revenuePerKg: 250, impactReduction: '90%', employment: 30, localReuse: 'Refurbished electronics for schools' },
  { wasteType: 'Paper', method: 'Pulping & de-inking', revenuePerKg: 12, impactReduction: '65%', employment: 55, localReuse: 'Handmade paper products, packaging' },
  { wasteType: 'Construction', method: 'Crushing & aggregate production', revenuePerKg: 5, impactReduction: '45%', employment: 35, localReuse: 'Fill material, brick manufacturing' },
];

export const severityColors: Record<number, string> = {
  1: 'bg-severity-1',
  2: 'bg-severity-2',
  3: 'bg-severity-3',
  4: 'bg-severity-4',
  5: 'bg-severity-5',
};

export const severityLabels: Record<number, string> = {
  1: 'Low',
  2: 'Moderate',
  3: 'Elevated',
  4: 'High',
  5: 'Critical',
};
