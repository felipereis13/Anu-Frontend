// MainSchedule.tsx
import { Group, Text, Box, Divider } from '@mantine/core';
import classes from './MainSchedule.module.css';
import { employeesData } from '../../../data/employees';
import { tasksData, categoryLabels } from '../../../data/employees'; // Importar type Task

// Dados da semana
const weekDays = [
    { day: "SEG", date: 6 },
    { day: "TER", date: 7 },
    { day: "QUA", date: 8 },
    { day: "QUI", date: 9 },
    { day: "SEX", date: 10 },
    { day: "SÁB", date: 11 },
];

// --- CABEÇALHO ---
function ScheduleHeader() {
    return (
        <Group className={classes.headerContainer} wrap="nowrap">
            <Text className={classes.monthLabel}>
                OUT
            </Text>
            <div className={classes.daysContainer}>
                {weekDays.map((item) => (
                    <Box key={item.date} className={classes.dayColumn}>
                        <Text className={classes.dayText}>
                            {item.day}
                        </Text>
                        <Text className={classes.dateText}>
                            {item.date}
                        </Text>
                    </Box>
                ))}
            </div>
        </Group>
    );
}

// --- COMPONENTE DE TAREFA ---
function TaskItem({ task }: { task: any }) {
    // Encontrar a linha do funcionário
    const employeeIndex = employeesData.findIndex(emp => emp.name === task.employeeName);
    if (employeeIndex === -1) return null;

    // Calcular posição e largura baseada nas datas
    const startDayIndex = weekDays.findIndex(day => day.date === task.startDate);
    const endDayIndex = weekDays.findIndex(day => day.date === task.endDate);
    
    if (startDayIndex === -1 || endDayIndex === -1) return null;

    const left = `calc(${(startDayIndex / weekDays.length) * 100}% + 2px)`;
    const width = `calc(${((endDayIndex - startDayIndex + 1) / weekDays.length) * 100}% - 4px)`;
    const top = `calc(${employeeIndex * 100}px + 20px)`; // 20px de margem top

    return (
        <Box
            className={classes.taskContainer}
            style={{
                left,
                width,
                top,
                backgroundColor: task.color,
            }}
        >
            <div className={classes.taskContent}>
                <Text className={classes.taskTitle}>
                    {task.title}
                </Text>
                <Text className={classes.taskCompany}>
                    {task.company}
                </Text>
            </div>
            <Text className={classes.taskCategory}>
                {categoryLabels[task.category]}
            </Text>
        </Box>
    );
}

// --- GRADE COM TAREFAS ---
function ScheduleGrid() {
    return (
        <div className={classes.gridContainer}>
            
            {/* Células do grid */}
            {employeesData.map((_, rowIndex) => (
                weekDays.map((_, colIndex) => (
                    <div 
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={classes.gridCell}
                        style={{
                            gridColumn: colIndex + 1,
                            gridRow: rowIndex + 1
                        }}
                    />
                ))
            ))}

            {/* Linhas Horizontais */}
            {employeesData.map((_, index) => (
                <Divider 
                    key={`row-${index}`} 
                    className={classes.employeeRowDivider}
                    style={{ gridRow: index + 1 }}
                />
            ))}

            {/* Linhas Verticais */}
            {weekDays.map((_, index) => (
                <Divider 
                    key={`col-${index}`} 
                    className={classes.dayColumnDivider}
                    style={{ gridColumn: index + 1 }}
                    orientation="vertical" 
                />
            ))}

            {/* Tarefas */}
            {tasksData.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
            
        </div>
    );
}

// --- COMPONENTE PRINCIPAL ---
export function MainSchedule() {
    return (
        <div className={classes.mainScheduleContainer}>
            <ScheduleHeader /> 
            <ScheduleGrid />
        </div>
    );
}