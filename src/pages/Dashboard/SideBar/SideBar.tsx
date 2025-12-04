import {
    User,
    UserPlus,
    List,
    SafeArrowLeft
} from 'iconoir-react';
import { Avatar, Group, Stack, Text, ActionIcon, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import classes from './SideBar.module.css';
import EmployeeModal from '../modal/EmployeeModal';
import { useEmployees } from '../../../context/EmployeeContext';

interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

interface SideBarProps {
    selectedEmployees: Set<string>;
    onToggleEmployee: (employeeName: string) => void;
    onClearFilters: () => void;
}

const primaryColor = '#A39787';

function EmployeeListItem({ employee, isSelected, onToggle }: { employee: Employee, isSelected: boolean, onToggle: () => void }) {
    return (
        <div 
            className={`${classes.listItemContainer} ${isSelected ? classes.selected : ''}`}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
        >
            <Group wrap="nowrap" align="center" className={classes.listItem}>
                
                <Avatar radius="xl" size="md" color="gray.2" className={classes.avatar}>
                    <User width={20} color="#666" />
                </Avatar>

                <Stack gap={0} style={{ flexGrow: 1 }}>
                    <Text className={classes.nameText}>
                        {employee.name}
                    </Text>
                    
                    <Text className={classes.roleText}>
                        {employee.role}
                    </Text>

                    <div className={classes.companyTagWrapper}>
                        <Text className={classes.companyTag}>
                            {employee.company}
                        </Text>
                    </div>
                </Stack>

                <div className={`${classes.checkbox} ${isSelected ? classes.checkboxChecked : ''}`}>
                    {isSelected && <span>✓</span>}
                </div>
            </Group>
        </div>
    );
}

export function SideBar({ selectedEmployees, onToggleEmployee, onClearFilters }: SideBarProps) {
    const { employees, addEmployee } = useEmployees();
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

    useEffect(() => {
        setCollapsed(isMobile);
    }, [isMobile]);

    const toggleCollapsed = () => setCollapsed(v => !v);

    const hasFilters = selectedEmployees.size > 0;

    return (
        <div className={`${classes.sidebarContainer} ${collapsed ? classes.collapsed : ''}`}>
            <Group justify="space-between" p="md" className={classes.listHeader}>
                <Group gap="md" className={classes.headerLeft}>
                    <ActionIcon 
                        variant="transparent" 
                        aria-label="Adicionar Funcionário"
                        onClick={openModal}
                    >
                        <UserPlus width={20} color={primaryColor} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" aria-label="Visualizar" >
                        <List width={20} color={primaryColor} />
                    </ActionIcon>
                </Group>
                <ActionIcon variant="transparent" aria-label={collapsed ? 'Expandir Sidebar' : 'Minimizar Sidebar'} onClick={toggleCollapsed}>
                    <SafeArrowLeft width={20} color={primaryColor} style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms ease' }} />
                </ActionIcon>
            </Group>

            {!collapsed && hasFilters && (
                <div className={classes.filterInfo}>
                    <Text size="sm" fw={600} style={{ color: primaryColor, marginBottom: '8px' }}>
                        Filtrados: {selectedEmployees.size}
                    </Text>
                    <Button
                        size="xs"
                        variant="default"
                        onClick={onClearFilters}
                        style={{ 
                            borderColor: primaryColor, 
                            color: primaryColor,
                            width: '100%'
                        }}
                    >
                        Limpar Filtros
                    </Button>
                </div>
            )}

            <div className={classes.employeeList}>
                {employees.map((employee) => (
                    <EmployeeListItem 
                        key={employee.name} 
                        employee={employee}
                        isSelected={selectedEmployees.has(employee.name)}
                        onToggle={() => onToggleEmployee(employee.name)}
                    />
                ))}
            </div>

            {/* Modal de cadastro de funcionário */}
            <EmployeeModal
                opened={openedModal}
                onClose={closeModal}
                onSubmit={(values) => {
                    console.log("✅ Dados do funcionário recebidos:", values)
                    // Map form data to Employee interface
                    const newEmployee: Employee = {
                        name: values.nome,
                        role: values.funcao,
                        company: values.departamento || 'N/A',
                        companyColor: '#EBE7E1'
                    };
                    // Add employee to context state
                    addEmployee(newEmployee);
                    closeModal();
                    console.log("✅ Funcionário adicionado com sucesso!")
                }}
            />
        </div>
    );
}