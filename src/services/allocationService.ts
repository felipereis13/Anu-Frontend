import api from './api';

export interface Allocation {
  _id?: string;
  employeeName: string;
  company: string;
  title?: string;
  startDate: string;
  endDate: string;
  color: string;
  cargaHorariaSemanal?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const allocationService = {
  async getAll(): Promise<Allocation[]> {
    const response = await api.get('/allocations');
    return response.data.data;
  },

  async getByEmployee(employeeName: string): Promise<Allocation[]> {
    const response = await api.get(`/allocations/employee/${employeeName}`);
    return response.data.data;
  },

  async create(allocation: Omit<Allocation, '_id'>): Promise<Allocation> {
    const response = await api.post('/allocations', allocation);
    return response.data.data;
  },

  async update(id: string, allocation: Partial<Allocation>): Promise<Allocation> {
    const response = await api.put(`/allocations/${id}`, allocation);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/allocations/${id}`);
  },

  async deleteByEmployee(employeeName: string): Promise<void> {
    await api.delete(`/allocations/employee/${employeeName}`);
  }
};
