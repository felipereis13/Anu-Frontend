// src/data/employees.ts

// 1. Definição da Interface (Mover de SideBar.tsx)
// src/data/employees.ts
export interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

export const employeesData: Employee[] = [
    { 
        name: "Rayo Mello", 
        role: "Front-End", 
        company: "ACCENTURE", 
        companyColor: '#EBE7E1' 
    },
    { 
        name: "Ruthe Maria", 
        role: "Brand Marc", 
        company: "Mesa Tech", 
        companyColor: '#EBE7E1' 
    },
    { 
        name: "Bruno Vieira", 
        role: "Developer", 
        company: "Office FTC", 
        companyColor: '#EBE7E1' 
    },
    { 
        name: "Beatriz Fordes", 
        role: "Designer", 
        company: "CESAR", 
        companyColor: '#EBE7E1' 
    },
    { 
        name: "Daniel José", 
        role: "Web. Dev", 
        company: "Tech Solutions", 
        companyColor: '#EBE7E1' 
    },
];

// src/data/tasks.ts
export interface Task {
    id: string;
    employeeName: string;
    title: string;
    category: 'front' | 'back' | 'design' | 'brand' | 'web';
    company: string;
    startDate: number; // Dia do mês (6, 7, 8, etc.)
    endDate: number;   // Dia do mês
    color: string;     // Cor da categoria
}

export const tasksData: Task[] = [
    {
        id: '1',
        employeeName: 'Rayo Mello',
        title: 'Homepage Redesign',
        category: 'front',
        company: 'Google',
        startDate: 6,
        endDate: 8,
        color: '#4F46E5' // Azul
    },
    {
        id: '2',
        employeeName: 'Rayo Mello',
        title: 'API Integration',
        category: 'back',
        company: 'Microsoft',
        startDate: 9,
        endDate: 11,
        color: '#DC2626' // Vermelho
    },
    {
        id: '3',
        employeeName: 'Ruthe Maria',
        title: 'Brand Identity',
        category: 'brand',
        company: 'Nike',
        startDate: 6,
        endDate: 10,
        color: '#059669' // Verde
    },
    {
        id: '4',
        employeeName: 'Bruno Vieira',
        title: 'System Architecture',
        category: 'back',
        company: 'Amazon',
        startDate: 7,
        endDate: 9,
        color: '#DC2626' // Vermelho
    },
    {
        id: '5',
        employeeName: 'Beatriz Fordes',
        title: 'UI/UX Design',
        category: 'design',
        company: 'Apple',
        startDate: 8,
        endDate: 11,
        color: '#7C3AED' // Roxo
    },
    {
        id: '6',
        employeeName: 'Daniel José',
        title: 'E-commerce Platform',
        category: 'web',
        company: 'Shopify',
        startDate: 6,
        endDate: 11,
        color: '#EA580C' // Laranja
    }
];

// Mapeamento de cores para categorias
export const categoryColors = {
    front: '#4F46E5', // Azul
    back: '#DC2626',  // Vermelho
    design: '#7C3AED', // Roxo
    brand: '#059669', // Verde
    web: '#EA580C'    // Laranja
};

// Mapeamento de labels para categorias
export const categoryLabels = {
    front: 'FRONT',
    back: 'BACK',
    design: 'DESIGN',
    brand: 'BRAND',
    web: 'WEB'
};