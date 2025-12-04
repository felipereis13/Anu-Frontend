
export interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

export const employeesData: Employee[] = [];

export interface Allocation {
    id: string;
    employeeName: string;
    company: string;
    title?: string; 
    startDate: string; 
    endDate: string;   
    color: string;
}

export const allocationsData: Allocation[] = [];