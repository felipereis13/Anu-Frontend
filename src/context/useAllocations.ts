import { useContext } from 'react';
import { AllocationContext } from './AllocationContextDef';

export const useAllocations = () => {
  const context = useContext(AllocationContext);
  if (context === undefined) {
    throw new Error('useAllocations must be used within AllocationProvider');
  }
  return context;
};
