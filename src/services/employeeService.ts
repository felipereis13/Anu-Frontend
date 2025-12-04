import api from './api';

export interface Employee {
  _id?: string;
  name: string;
  role: string;
  company: string;
  companyColor: string;
  departamento?: string;
  projeto?: string;
  disponibilidade?: 'Disponível' | 'Indisponível' | 'Parcialmente disponível';
  funcao?: string;
  telefone?: string;
  gerente?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await api.get('/employees');
    return response.data.data;
  },

  async getById(id: string): Promise<Employee> {
    const response = await api.get(`/employees/${id}`);
    return response.data.data;
  },

  async create(employee: Omit<Employee, '_id'>): Promise<Employee> {
    const response = await api.post('/employees', employee);
    return response.data.data;
  },

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/employees/${id}`);
  }
};
