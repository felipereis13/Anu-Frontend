import { useState, type ReactNode } from 'react';
import { allocationsData } from '../data/employees';
import { AllocationContext, type Allocation } from './AllocationContextDef';

export function AllocationProvider({ children }: { children: ReactNode }) {
  // Initialize from shared `allocationsData` so all pages start with the same dataset
  const [allocations, setAllocations] = useState<Allocation[]>(() =>
    allocationsData.map((a) => ({ ...a }))
  );

  const addAllocation = (allocation: Allocation) => {
    setAllocations((prev) => [...prev, allocation]);
  };

  return (
    <AllocationContext.Provider value={{ allocations, addAllocation }}>
      {children}
    </AllocationContext.Provider>
  );
}
