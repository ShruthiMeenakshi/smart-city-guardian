import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Report, mockReports } from '@/lib/mockData';

interface ReportsContextType {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'timestamp' | 'citizenId' | 'status'>) => void;
  updateReport: (id: string, updates: Partial<Omit<Report, 'id' | 'timestamp' | 'citizenId'>>) => void;
  deleteReport: (id: string) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

let reportCounter = mockReports.length + 1;

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(mockReports);

  const addReport = useCallback((partial: Omit<Report, 'id' | 'timestamp' | 'citizenId' | 'status'>) => {
    const newReport: Report = {
      ...partial,
      id: `R${String(reportCounter++).padStart(3, '0')}`,
      timestamp: new Date(),
      citizenId: 'C999',
      status: 'pending',
    };
    setReports((prev) => [newReport, ...prev]);
  }, []);

  const updateReport = useCallback((id: string, updates: Partial<Omit<Report, 'id' | 'timestamp' | 'citizenId'>>) => {
    setReports((prev) => prev.map((r) => (r.id === id && r.citizenId === 'C999' ? { ...r, ...updates } : r)));
  }, []);

  const deleteReport = useCallback((id: string) => {
    setReports((prev) => prev.filter((r) => !(r.id === id && r.citizenId === 'C999')));
  }, []);

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReport, deleteReport }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error('useReports must be used within ReportsProvider');
  return ctx;
}
