import {
    Search,
    SkipPrev,
    SkipNext,
    PasteClipboard,
    ViewGrid
} from 'iconoir-react';
import { Button, ActionIcon, Group, Drawer, Stack, Menu, MultiSelect, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderDash.module.css';
import Anu from '../../../assets/ANU - Apresentação Identidade Visual 2.png';
import type { ViewType } from '../DashboardPage';

type Option = { value: string; label: string };

interface HeaderDashProps {
    onPrevWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
    viewType: ViewType;
    onViewChange: (view: ViewType) => void;
    categoryOptions?: Option[];
    companyOptions?: Option[];
    selectedCompanies?: Set<string>;
    onCompaniesChange?: (values: string[]) => void;
    onClearTaskFilters?: () => void;
}

export function HeaderDash({ onPrevWeek, onNextWeek, onToday, viewType, onViewChange,
    categoryOptions = [], companyOptions = [], selectedCategories, selectedCompanies,
    onCategoriesChange, onCompaniesChange, onClearTaskFilters
}: HeaderDashProps) {
    const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);
    const iconColor = '#A39787';

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                {/* Lado Esquerdo: Logo */}
                <img
                    src={Anu}
                    alt="Logo"
                    width={107}
                    className={classes.logo}
                />

                {/* VISÃO DESKTOP: Controles visíveis apenas em telas 'sm' (small) ou maiores */}
                <Group gap="xs" visibleFrom="sm" className={classes.controls}>
                    {/* Navegação (Setas) */}
                    <Group gap={4} style={{ marginRight: '1rem' }}>
                        <ActionIcon 
                            variant="transparent" 
                            size="lg" 
                            aria-label="Anterior"
                            onClick={onPrevWeek}
                        >
                            <SkipPrev color={iconColor} strokeWidth={1.5} width={24} />
                        </ActionIcon>
                        <ActionIcon 
                            variant="transparent" 
                            size="lg" 
                            aria-label="Próximo"
                            onClick={onNextWeek}
                        >
                            <SkipNext color={iconColor} strokeWidth={1.5} width={24} />
                        </ActionIcon>
                    </Group>

                    {/* Botão Filtros */}
                    <Button
                        variant="default"
                        leftSection={<PasteClipboard width={18} color={iconColor} strokeWidth={1.5} />}
                        className={classes.customButton}
                        onClick={openFilters}
                    >
                        Filtros
                    </Button>

                    {/* Botão Hoje */}
                    <Button
                        variant="default"
                        className={classes.customButton}
                        onClick={onToday}
                    >
                        Hoje
                    </Button>

                    {/* Menu de Visualizações */}
                    <Menu>
                        <Menu.Target>
                            <Button
                                variant="default"
                                leftSection={<ViewGrid width={18} color={iconColor} strokeWidth={1.5} />}
                                className={classes.customButton}
                                rightSection={<span style={{ fontSize: '12px' }}>▼</span>}
                            >
                                {viewType === 'week' ? 'Semana' : viewType === 'month' ? 'Mês' : 'Ano'}
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item 
                                onClick={() => onViewChange('week')}
                                style={{ 
                                    backgroundColor: viewType === 'week' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'week' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'week' ? '600' : '500'
                                }}
                            >
                                Semana
                            </Menu.Item>
                            <Menu.Item 
                                onClick={() => onViewChange('month')}
                                style={{ 
                                    backgroundColor: viewType === 'month' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'month' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'month' ? '600' : '500'
                                }}
                            >
                                Mês
                            </Menu.Item>
                            <Menu.Item 
                                onClick={() => onViewChange('year')}
                                style={{ 
                                    backgroundColor: viewType === 'year' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'year' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'year' ? '600' : '500'
                                }}
                            >
                                Ano
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Botão de Busca */}
                    <ActionIcon
                        variant="default"
                        size="input-sm"
                        className={classes.searchButton}
                        aria-label="Buscar"
                    >
                        <Search width={18} color={iconColor} strokeWidth={1.5} />
                    </ActionIcon>
                </Group>

                {/* VISÃO MOBILE: Menu Hamburguer com todos os controles */}
                <Group gap={8} hiddenFrom="sm" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Navegação (Setas) */}
                    <ActionIcon 
                        variant="transparent" 
                        size="md" 
                        aria-label="Anterior"
                        onClick={onPrevWeek}
                    >
                        <SkipPrev color={iconColor} strokeWidth={1.5} width={20} />
                    </ActionIcon>
                    <ActionIcon 
                        variant="transparent" 
                        size="md" 
                        aria-label="Próximo"
                        onClick={onNextWeek}
                    >
                        <SkipNext color={iconColor} strokeWidth={1.5} width={20} />
                    </ActionIcon>

                    {/* Botão Filtros */}
                    <ActionIcon
                        variant="default"
                        size="md"
                        aria-label="Filtros"
                        onClick={openFilters}
                        title="Filtros"
                    >
                        <PasteClipboard width={18} color={iconColor} strokeWidth={1.5} />
                    </ActionIcon>

                    {/* Botão Hoje */}
                    <ActionIcon
                        variant="default"
                        size="md"
                        aria-label="Hoje"
                        onClick={onToday}
                        title="Hoje"
                    >
                        ✓
                    </ActionIcon>

                    {/* Menu de Visualizações */}
                    <Menu>
                        <Menu.Target>
                            <ActionIcon
                                variant="default"
                                size="md"
                                aria-label="Visualizações"
                                title="Mudar visualização"
                            >
                                <ViewGrid width={18} color={iconColor} strokeWidth={1.5} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item 
                                onClick={() => onViewChange('week')}
                                style={{ 
                                    backgroundColor: viewType === 'week' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'week' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'week' ? '600' : '500'
                                }}
                            >
                                Semana
                            </Menu.Item>
                            <Menu.Item 
                                onClick={() => onViewChange('month')}
                                style={{ 
                                    backgroundColor: viewType === 'month' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'month' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'month' ? '600' : '500'
                                }}
                            >
                                Mês
                            </Menu.Item>
                            <Menu.Item 
                                onClick={() => onViewChange('year')}
                                style={{ 
                                    backgroundColor: viewType === 'year' ? '#EBE7E1' : 'transparent',
                                    color: viewType === 'year' ? '#2D2A24' : '#A39787',
                                    fontWeight: viewType === 'year' ? '600' : '500'
                                }}
                            >
                                Ano
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Botão de Busca */}
                    <ActionIcon
                        variant="default"
                        size="md"
                        aria-label="Buscar"
                        title="Buscar"
                    >
                        <Search width={18} color={iconColor} strokeWidth={1.5} />
                    </ActionIcon>
                </Group>

                {/* Drawer de Filtros (abre tanto em desktop quanto em mobile) */}
                <Drawer
                    opened={filtersOpened}
                    onClose={closeFilters}
                    position="right"
                    title="Filtros"
                    padding="md"
                    size="md"
                    classNames={{ title: classes.drawerTitle }}
                >
                    <Stack gap="sm">
                        <Text fw={700}>Empresas</Text>
                        <MultiSelect
                            data={companyOptions}
                            placeholder="Selecione empresas"
                            value={selectedCompanies ? Array.from(selectedCompanies) : []}
                            onChange={(vals) => onCompaniesChange && onCompaniesChange(vals)}
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="default" className={classes.customButton} onClick={() => { onClearTaskFilters && onClearTaskFilters(); closeFilters(); }}>Limpar</Button>
                            <Button style={{ marginLeft: 8 }} onClick={closeFilters}>Aplicar</Button>
                        </div>
                    </Stack>
                </Drawer>
            </div>
        </header>
    );
}