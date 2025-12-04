import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { employeeService } from '../services/employeeService';

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
}

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, '_id'>) => Promise<void>;
    updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;
    refreshEmployees: () => Promise<void>;
    loading: boolean;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const refreshEmployees = async () => {
        // Only fetch if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        
        try {
            setLoading(true);
            const data = await employeeService.getAll();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshEmployees();
    }, []);

    const addEmployee = async (employee: Omit<Employee, '_id'>) => {
        try {
            const newEmployee = await employeeService.create(employee);
            setEmployees((prev) => [...prev, newEmployee]);
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    };

    const updateEmployee = async (id: string, employee: Partial<Employee>) => {
        try {
            const updated = await employeeService.update(id, employee);
            setEmployees((prev) => 
                prev.map((emp) => (emp._id === id ? updated : emp))
            );
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            await employeeService.delete(id);
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    };

    return (
        <EmployeeContext.Provider value={{ 
            employees, 
            addEmployee, 
            updateEmployee, 
            deleteEmployee,
            refreshEmployees,
            loading 
        }}>
            {children}
        </EmployeeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within EmployeeProvider');
    }
    return context;
}
