import { createContext } from 'react';

export interface Allocation {
  id: string;
  employeeName: string;
  company: string;
  title?: string;
  startDate: string;
  endDate: string;
  color: string;
  cargaHorariaSemanal?: number; // Weekly hours for this allocation
}

interface AllocationContextType {
  allocations: Allocation[];
  addAllocation: (allocation: Allocation) => void;
  removeAllocation: (id: string) => void;
}

export const AllocationContext = createContext<AllocationContextType | undefined>(undefined);
