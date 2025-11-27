import {
    User,
    UserPlus,
    List,
    SafeArrowLeft
} from 'iconoir-react';
import { Avatar, Group, Stack, Text, ActionIcon } from '@mantine/core';
import classes from './SideBar.module.css';
import { employeesData  } from '../../../data/employees';

// 1. Definição da Interface
interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

const primaryColor = '#A39787';

// --- COMPONENTE DO ITEM DA LISTA ---
function EmployeeListItem({ employee }: { employee: Employee }) {
    return (
        <div className={classes.listItemContainer}>
            <Group wrap="nowrap" align="center" className={classes.listItem}>
                
                {/* Avatar */}
                <Avatar radius="xl" size="md" color="gray.2" className={classes.avatar}>
                    <User width={20} color="#666" />
                </Avatar>

                {/* Nome, Cargo e Empresa */}
                <Stack gap={0} style={{ flexGrow: 1 }}>
                    {/* Nome */}
                    <Text className={classes.nameText}>
                        {employee.name}
                    </Text>
                    
                    {/* Cargo */}
                    <Text className={classes.roleText}>
                        {employee.role}
                    </Text>

                    {/* Tag da Empresa */}
                    <div className={classes.companyTagWrapper}>
                        <Text className={classes.companyTag}>
                            {employee.company}
                        </Text>
                    </div>
                </Stack>
            </Group>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL (SIDEBAR) ---
export function SideBar() {
    return (
        <div className={classes.sidebarContainer}>
            {/* --- HEADER DA LISTA --- */}
            <Group justify="space-between" p="md" className={classes.listHeader}>
                <Group gap="md">
                    <ActionIcon variant="transparent" aria-label="Adicionar Grupo">
                        <UserPlus width={20} color={primaryColor} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" aria-label="Visualizar">
                        <List width={20} color={primaryColor} />
                    </ActionIcon>
                </Group>
                <ActionIcon variant="transparent" aria-label="Alternar Sidebar">
                    <SafeArrowLeft width={20} color={primaryColor} />
                </ActionIcon>
            </Group>

            {/* --- LISTA DE FUNCIONÁRIOS --- */}
            <div className={classes.employeeList}>
                {employeesData.map((employee, index) => (
                    <EmployeeListItem key={index} employee={employee} />
                ))}
            </div>
        </div>
    );
}