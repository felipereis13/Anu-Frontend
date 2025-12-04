import { useState, useEffect } from 'react';
import {Container,Text,ScrollArea,Table,TextInput,UnstyledButton,Group,Center,Pagination,MultiSelect,Button,Modal,Paper, ThemeIcon, Badge } from '@mantine/core';
import {IconChevronDown,IconChevronUp,IconSearch,IconSelector,IconX,IconDownload,IconPlus,IconUserCircle, IconBuildingCommunity, IconPhone, IconUsers, IconTag, IconBriefcase, } from '@tabler/icons-react';
import classes from './Funcionario.module.css';
import { Nav } from '../../Components/Nav/Nav';
import EmployeeModal from '../Dashboard/modal/EmployeeModal';
import EmployeeAllocationDrawer from '../Dashboard/modal/EmployeeAllocationDrawer';
import { useEmployees } from '../../context/EmployeeContext';
import { useAllocations } from '../../context/useAllocations';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { HeaderSearch } from '../../Components/search/Search';
import { getCompanyColor } from '../../utils/colors';

interface RowData {
  name: string;
  departamento: string;
  projeto: string;
  disponibilidade: string;
  company: string;
  funcao: string;
  tags: string;
  telefone: string;
  gerente: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(
  data: RowData[],
  search: string,
  filtroDepartamentos: string[],
  filtroDisponibilidades: string[],
  filtroFuncoes: string[],
  filtroEmpresas: string[],
  filtroProjetos: string[],
  filtroGerentes: string[]
) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    const matchesSearch = Object.keys(item).some((key) =>
      String(item[key as keyof RowData]).toLowerCase().includes(query)
    );

    const matchesDepartamento =
      filtroDepartamentos.length > 0 ? filtroDepartamentos.includes(item.departamento) : true;

    const matchesDisponibilidade =
      filtroDisponibilidades.length > 0 ? filtroDisponibilidades.includes(item.disponibilidade) : true;

    const matchesFuncao = filtroFuncoes.length > 0 ? filtroFuncoes.includes(item.funcao) : true;

    const matchesEmpresa = filtroEmpresas.length > 0 ? filtroEmpresas.includes(item.company) : true;

    const matchesProjeto = filtroProjetos.length > 0 ? filtroProjetos.includes(item.projeto) : true;

    const matchesGerente = filtroGerentes.length > 0 ? filtroGerentes.includes(item.gerente) : true;

    return (
      matchesSearch &&
      matchesDepartamento &&
      matchesDisponibilidade &&
      matchesFuncao &&
      matchesEmpresa &&
      matchesProjeto &&
      matchesGerente
    );
  });
}

function sortData(
  data: RowData[],
  payload: {
    sortBy: keyof RowData | null;
    reversed: boolean;
    search: string;
    filtroDepartamentos: string[];
    filtroDisponibilidades: string[];
    filtroFuncoes: string[];
    filtroEmpresas: string[];
    filtroProjetos: string[];
    filtroGerentes: string[];
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(
      data,
      payload.search,
      payload.filtroDepartamentos,
      payload.filtroDisponibilidades,
      payload.filtroFuncoes,
      payload.filtroEmpresas,
      payload.filtroProjetos,
      payload.filtroGerentes
    );
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy]!.localeCompare(a[sortBy]!);
      }
      return a[sortBy]!.localeCompare(b[sortBy]!);
    }),
    payload.search,
    payload.filtroDepartamentos,
    payload.filtroDisponibilidades,
    payload.filtroFuncoes,
    payload.filtroEmpresas,
    payload.filtroProjetos,
    payload.filtroGerentes
  );
}

export function Funcionario() {
  const { employees, addEmployee } = useEmployees();
  const { allocations, addAllocation, removeAllocation } = useAllocations();
  
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [activePage, setPage] = useState(1);

  const [filtroDepartamentos, setFiltroDepartamentos] = useState<string[]>([]);
  const [filtroDisponibilidades, setFiltroDisponibilidades] = useState<string[]>([]);
  const [filtroFuncoes, setFiltroFuncoes] = useState<string[]>([]);
  const [filtroEmpresas, setFiltroEmpresas] = useState<string[]>([]);
  const [filtroProjetos, setFiltroProjetos] = useState<string[]>([]);
  const [filtroGerentes, setFiltroGerentes] = useState<string[]>([]);

  const [selectedUser, setSelectedUser] = useState<RowData | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [allocationDrawerOpened, { open: openAllocationDrawer, close: closeAllocationDrawer }] = useDisclosure(false);

  // Lista de empresas disponíveis para alocação
  const empresasDisponiveis = [
    { value: 'Petrobras', label: 'Petrobras' },
    { value: 'Vale', label: 'Vale' },
    { value: 'Banco do Brasil', label: 'Banco do Brasil' },
    { value: 'Itaú', label: 'Itaú' },
    { value: 'Bradesco', label: 'Bradesco' },
    { value: 'Embraer', label: 'Embraer' },
    { value: 'JBS', label: 'JBS' },
    { value: 'Ambev', label: 'Ambev' },
    { value: 'Natura', label: 'Natura' },
    { value: 'Magazine Luiza', label: 'Magazine Luiza' },
    { value: 'Globo', label: 'Globo' },
    { value: 'Rede D\'Or', label: 'Rede D\'Or' },
    { value: 'Suzano', label: 'Suzano' },
    { value: 'Gerdau', label: 'Gerdau' },
    { value: 'Localiza', label: 'Localiza' },
    { value: 'Anatel', label: 'Anatel' },
  ];

  // Convert employees from context to RowData format
  useEffect(() => {
    const data = employees.map(emp => {
      const employeeAllocations = allocations.filter(a => a.employeeName === emp.name);
      const totalHoras = employeeAllocations.reduce((sum, a) => sum + (a.cargaHorariaSemanal || 0), 0);
      const disponibilidade = totalHoras >= 40 ? 'Indisponível' : 'Disponível';
      const projeto = employeeAllocations.length > 0 
        ? employeeAllocations.map(a => a.company).join(', ')
        : 'N/A';

      return {
        name: emp.name,
        departamento: emp.departamento || emp.company,
        projeto: projeto,
        disponibilidade: disponibilidade,
        company: emp.company,
        funcao: emp.funcao || emp.role,
        tags: emp.tags?.join(', ') || 'N/A',
        telefone: emp.telefone || 'N/A',
        gerente: emp.gerente || 'N/A',
      };
    });

    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search,
        filtroDepartamentos,
        filtroDisponibilidades,
        filtroFuncoes,
        filtroEmpresas,
        filtroProjetos,
        filtroGerentes,
      })
    );
  }, [employees, allocations, sortBy, reverseSortDirection, search, filtroDepartamentos, filtroDisponibilidades, filtroFuncoes, filtroEmpresas, filtroProjetos, filtroGerentes]);

  const itemsPerPage = 10;

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setPage(1);
  };

  const limparFiltros = () => {
    setSearch('');
    setFiltroDepartamentos([]);
    setFiltroDisponibilidades([]);
    setFiltroFuncoes([]);
    setFiltroEmpresas([]);
    setFiltroProjetos([]);
    setFiltroGerentes([]);
    setPage(1);
  };

  function convertToCSV(data: RowData[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]) as (keyof RowData)[];

    const displayHeaders: { [key in keyof RowData]: string } = {
      name: 'Nome',
      departamento: 'Departamento',
      projeto: 'Projeto',
      disponibilidade: 'Disponibilidade',
      company: 'Empresa',
      funcao: 'Função',
      tags: 'Tags',
      telefone: 'Telefone',
      gerente: 'Gerente',
    };

    const headerRow = headers.map((key) => `"${displayHeaders[key]}"`).join(';');

    const dataRows = data.map((row) =>
      headers
        .map((key) => {
          let value = String(row[key]);
          value = value.replace(/"/g, '""');
          return `"${value}"`;
        })
        .join(';')
    );

    return [headerRow, ...dataRows].join('\n');
  }

  const handleExport = () => {
    if (sortedData.length === 0) {
      alert('Não há dados para exportar.');
      return;
    }

    const csvString = convertToCSV(sortedData);

    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvString], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'funcionarios_exportacao.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddEmployee = () => {
    setOpenNewModal(true);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const rows = paginatedData.map((row) => (
    <Table.Tr
      key={row.name}
      onClick={() => {
        setSelectedUser(row);
        setModalOpened(true);
      }}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.departamento}</Table.Td>
      <Table.Td>{row.projeto}</Table.Td>
      <Table.Td>{row.disponibilidade}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>{row.funcao}</Table.Td>
      <Table.Td>{row.gerente}</Table.Td>
      <Table.Td>{row.telefone}</Table.Td>
      <Table.Td>{row.tags}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.wrapper}>
      <Nav />
      <HeaderSearch />
      <Container fluid className={classes.Container} style={{ marginLeft: '80px' }}>
        <main className={classes['funcionario-container']}>
          <section className={classes['funcionario-content']}>
            <div className={classes.filterBar}>
              <Group mb="md" justify="space-between">
                <Group style={{ flexGrow: 1 }}>
                  <TextInput
                    placeholder="Buscar informações"
                    leftSection={<IconSearch size={16} stroke={1.5} />}
                    value={search}
                    onChange={handleSearchChange}
                    style={{ flex: 1 }}
                  />
                </Group>

                <Group align="flex-end" style={{ flexShrink: 0 }}>
                  <Button
                    leftSection={<IconDownload size={14} />}
                    variant="outline"
                    color="#4b414e"
                    onClick={handleExport}
                  >
                    Exportar
                  </Button>

                  <Button
                    leftSection={<IconX size={14} />}
                    color="gray"
                    variant="light"
                    onClick={limparFiltros}
                  >
                    Limpar Filtros
                  </Button>

                  <Button
                    leftSection={<IconPlus size={14} />}
                    color="#e26128"
                    onClick={handleAddEmployee}
                  >
                    Novo Funcionário
                  </Button>
                </Group>
              </Group>

              <Group grow mt="sm">
                <MultiSelect
                  label="Departamento"
                  placeholder="Selecione"
                  data={[...new Set(sortedData.map((i) => i.departamento))]}
                  value={filtroDepartamentos}
                  onChange={(value) => {
                    setFiltroDepartamentos(value);
                    setPage(1);
                  }}
                  clearable
                />

                  <MultiSelect
                  label="Disponibilidade"
                  placeholder="Selecione"
                  data={['Disponível', 'Indisponível']}
                  value={filtroDisponibilidades}
                  onChange={(value) => {
                    setFiltroDisponibilidades(value);
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Função"
                  placeholder="Selecione"
                  data={[...new Set(sortedData.map((i) => i.funcao))]}
                  value={filtroFuncoes}
                  onChange={(value) => {
                    setFiltroFuncoes(value);
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Empresa"
                  placeholder="Selecione"
                  data={[...new Set(sortedData.map((i) => i.company))]}
                  value={filtroEmpresas}
                  onChange={(value) => {
                    setFiltroEmpresas(value);
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Projeto"
                  placeholder="Selecione"
                  data={[...new Set(sortedData.map((i) => i.projeto))]}
                  value={filtroProjetos}
                  onChange={(value) => {
                    setFiltroProjetos(value);
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Gerente"
                  placeholder="Selecione"
                  data={[...new Set(sortedData.map((i) => i.gerente))]}
                  value={filtroGerentes}
                  onChange={(value) => {
                    setFiltroGerentes(value);
                    setPage(1);
                  }}
                  clearable
                />
              </Group>
            </div>

            <ScrollArea className={classes.tableArea}>
              <Table horizontalSpacing="md" verticalSpacing="xs" miw={900}>
                <Table.Thead>
                  <Table.Tr>
                    <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>
                      Nome
                    </Th>
                    <Th sorted={sortBy === 'departamento'} reversed={reverseSortDirection} onSort={() => setSorting('departamento')}>
                      Departamento
                    </Th>
                    <Th sorted={sortBy === 'projeto'} reversed={reverseSortDirection} onSort={() => setSorting('projeto')}>
                      Projeto
                    </Th>
                    <Th sorted={sortBy === 'disponibilidade'} reversed={reverseSortDirection} onSort={() => setSorting('disponibilidade')}>
                      Disponibilidade
                    </Th>
                    <Th sorted={sortBy === 'company'} reversed={reverseSortDirection} onSort={() => setSorting('company')}>
                      Empresa
                    </Th>
                    <Th sorted={sortBy === 'funcao'} reversed={reverseSortDirection} onSort={() => setSorting('funcao')}>
                      Função
                    </Th>
                    <Th sorted={sortBy === 'gerente'} reversed={reverseSortDirection} onSort={() => setSorting('gerente')}>
                      Gerente
                    </Th>
                    <Th sorted={sortBy === 'telefone'} reversed={reverseSortDirection} onSort={() => setSorting('telefone')}>
                      Telefone
                    </Th>
                    <Th sorted={sortBy === 'tags'} reversed={reverseSortDirection} onSort={() => setSorting('tags')}>
                      Tags
                    </Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={9}>
                        <Text fw={500} ta="center">
                          Ops, nenhum funcionário encontrado com esses filtros...
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>

              <Center mt="md">
                <Pagination
                  total={Math.ceil(sortedData.length / itemsPerPage)}
                  value={activePage}
                  onChange={setPage}
                  color="#b6a894"
                  size="sm"
                  radius="md"
                />
              </Center>
            </ScrollArea>
          </section>
        </main>
      </Container>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Detalhes do Funcionário"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        {selectedUser && (
          <Paper p="md" shadow="xs" radius="md">
    
            <Group mb="md" align="center" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <ThemeIcon size={50} radius="xl" color="orange">
                <IconUserCircle style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">
                  {selectedUser.name}
                </Text>
                <Badge
                  color={selectedUser.disponibilidade === 'Disponível' ? 'green' : 'red'}
                  variant="filled"
                >
                  {selectedUser.disponibilidade}
                </Badge>
              </div>
            </Group>

        
            <Text fw={500} mt="sm" c="gray.7">
              Informações Profissionais
            </Text>
            <Group mt="xs" grow>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Departamento
                </Text>
                <Group gap="xs">
                  <IconBuildingCommunity size={16} />
                  <Text fw={500}>{selectedUser.departamento}</Text>
                </Group>
              </Paper>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Função
                </Text>
                <Group gap="xs">
                  <IconBriefcase size={16} />
                  <Text fw={500}>{selectedUser.funcao}</Text>
                </Group>
              </Paper>
            </Group>

            <Group mt="xs" grow>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Empresa
                </Text>
                <Text fw={500}>{selectedUser.company}</Text>
              </Paper>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Horas Disponíveis
                </Text>
                <Text fw={500} c={40 - allocations.filter(a => a.employeeName === selectedUser.name).reduce((sum, a) => sum + (a.cargaHorariaSemanal || 0), 0) <= 0 ? 'red' : 'green'}>
                  {40 - allocations.filter(a => a.employeeName === selectedUser.name).reduce((sum, a) => sum + (a.cargaHorariaSemanal || 0), 0)}h / 40h
                </Text>
              </Paper>
            </Group>

            <Group mt="xs" grow>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Projeto
                </Text>
                <Text fw={500}>
                  {allocations.filter(a => a.employeeName === selectedUser.name).length > 0
                    ? allocations.filter(a => a.employeeName === selectedUser.name).map(a => a.company).join(', ')
                    : selectedUser.projeto}
                </Text>
              </Paper>
            </Group>

      
            <Text fw={500} mt="lg" c="gray.7">
              Gerência Responsável e Contato
            </Text>
            <Group mt="xs" grow>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Gerente
                </Text>
                <Group gap="xs">
                  <IconUsers size={16} />
                  <Text fw={500}>{selectedUser.gerente}</Text>
                </Group>
              </Paper>
              <Paper withBorder p="xs" radius="sm">
                <Text fz="sm" c="dimmed">
                  Telefone
                </Text>
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text fw={500}>{selectedUser.telefone}</Text>
                </Group>
              </Paper>
            </Group>
            <Text fw={500} mt="lg" mb="sm" c="gray.7">
              Habilidades/Tags
            </Text>
            <Group gap="xs">
              <IconTag size={16} />
              {selectedUser.tags.split(',').map((tag) => (
                <Badge key={tag.trim()} variant="light" color="#e26128">
                  {tag.trim()}
                </Badge>
              ))}
            </Group>

            {/* Botão de alocação */}
            <Group justify="flex-end" mt="lg">
              <Button color="#4F46E5" onClick={openAllocationDrawer}>
                Alocar Empresa
              </Button>
            </Group>
          </Paper>
        )}
      </Modal>

      {/* Modal compartilhado para criar novo funcionário (reusa o modal do dashboard) */}
      <EmployeeModal
        opened={openNewModal}
        onClose={() => setOpenNewModal(false)}
        onSubmit={(values) => {
          const newEmployee = {
            name: values.nome,
            role: values.funcao,
            company: values.departamento || 'N/A',
            companyColor: '#EBE7E1',
            departamento: values.departamento,
            funcao: values.funcao,
            telefone: values.telefone,
            gerente: values.gerente,
            tags: values.tags
          };
          addEmployee(newEmployee);
          setOpenNewModal(false);
        }}
      />

      {/* Drawer para alocar empresa a um funcionário */}
      {selectedUser && (
        <EmployeeAllocationDrawer
          opened={allocationDrawerOpened}
          onClose={closeAllocationDrawer}
          empresasDisponiveis={empresasDisponiveis}
          existingAllocations={
            allocations
              .filter(a => a.employeeName === selectedUser.name)
              .map(a => ({
                empresa: a.company,
                dataInicio: a.startDate ? new Date(a.startDate) : null,
                dataFim: a.endDate ? new Date(a.endDate) : null,
                cargaHorariaSemanal: a.cargaHorariaSemanal || "",
              }))
          }
          onSubmit={(alocacoes) => {
            console.log('📦 Dados recebidos do drawer:', alocacoes);
            
            // Remove old allocations for this employee first
            const oldAllocations = allocations.filter(a => a.employeeName === selectedUser.name);
            oldAllocations.forEach(a => removeAllocation(a.id));
            
            // Create new allocations for each company selected
            alocacoes.alocacoes.forEach((aloc) => {
              console.log('💼 Processando alocação:', aloc);
              
              // Only require empresa to be filled
              if (aloc.empresa) {
                const id = `${selectedUser.name}-${aloc.empresa}-${Date.now()}-${Math.random()}`;
                const startDateStr = aloc.dataInicio ? dayjs(aloc.dataInicio).format('YYYY-MM-DD') : '';
                const endDateStr = aloc.dataFim ? dayjs(aloc.dataFim).format('YYYY-MM-DD') : '';
                
                const newAllocation = {
                  id,
                  employeeName: selectedUser.name,
                  company: aloc.empresa,
                  title: `Alocado na ${aloc.empresa}`,
                  startDate: startDateStr,
                  endDate: endDateStr,
                  color: getCompanyColor(aloc.empresa),
                  cargaHorariaSemanal: typeof aloc.cargaHorariaSemanal === 'number' ? aloc.cargaHorariaSemanal : 0,
                };
                console.log('✅ Adicionando alocação:', newAllocation);
                addAllocation(newAllocation);
              } else {
                console.warn('⚠️ Alocação ignorada - empresa não informada:', aloc);
              }
            });
            closeAllocationDrawer();
          }}
        />
      )}
    </div>
  );
}