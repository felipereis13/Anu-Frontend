import { useState, useEffect, type ReactNode } from 'react';
import { allocationService } from '../services/allocationService';
import { AllocationContext, type Allocation } from './AllocationContextDef';
import { getCompanyColor } from '../utils/colors';

export function AllocationProvider({ children }: { children: ReactNode }) {
  const [allocations, setAllocations] = useState<Allocation[]>([]);

  const refreshAllocations = async () => {
    // Only fetch if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    
    try {
      const data = await allocationService.getAll();
      // Map _id to id for compatibility and apply company colors
      const mapped = data.map(a => ({
        id: a._id || '',
        employeeName: a.employeeName,
        company: a.company,
        title: a.title,
        startDate: a.startDate,
        endDate: a.endDate,
        color: getCompanyColor(a.company), // Apply color based on company name
        cargaHorariaSemanal: a.cargaHorariaSemanal
      }));
      setAllocations(mapped);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    }
  };

  useEffect(() => {
    refreshAllocations();
  }, []);

  const addAllocation = async (allocation: Allocation) => {
    try {
      const created = await allocationService.create({
        employeeName: allocation.employeeName,
        company: allocation.company,
        title: allocation.title,
        startDate: allocation.startDate,
        endDate: allocation.endDate,
        color: allocation.color,
        cargaHorariaSemanal: allocation.cargaHorariaSemanal
      });
      
      const newAllocation = {
        id: created._id || '',
        employeeName: created.employeeName,
        company: created.company,
        title: created.title,
        startDate: created.startDate,
        endDate: created.endDate,
        color: getCompanyColor(created.company), // Apply color based on company name
        cargaHorariaSemanal: created.cargaHorariaSemanal
      };
      
      setAllocations((prev) => [...prev, newAllocation]);
    } catch (error) {
      console.error('Error adding allocation:', error);
      throw error;
    }
  };

  const removeAllocation = async (id: string) => {
    try {
      await allocationService.delete(id);
      setAllocations((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Error removing allocation:', error);
      throw error;
    }
  };

  return (
    <AllocationContext.Provider value={{ allocations, addAllocation, removeAllocation }}>
      {children}
    </AllocationContext.Provider>
  );
}
