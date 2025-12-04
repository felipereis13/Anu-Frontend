import { createContext } from 'react';

export interface Allocation {
  id: string;
  employeeName: string;
  company: string;
  title?: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface AllocationContextType {
  allocations: Allocation[];
  addAllocation: (allocation: Allocation) => void;
  removeAllocation: (id: string) => void;
}

export const AllocationContext = createContext<AllocationContextType | undefined>(undefined);
