import { useState, useEffect, useRef } from 'react';
import {Container,Text,ScrollArea,Table,TextInput,UnstyledButton,Group,Center,Pagination,MultiSelect,Button,Modal,Paper, ThemeIcon, Badge, } from '@mantine/core';
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

const data: RowData[] = [
  { name: 'Athena Weissnat', departamento: 'TI', projeto: 'Anatel', disponibilidade: 'Disponível', company: 'Tech Solutions', funcao: 'Desenvolvedora', tags: 'React, Node.js', telefone: '(11) 99999-1111', gerente: 'Carlos Lima' },
  { name: 'Liam Kuhlman', departamento: 'Marketing', projeto: 'Google', disponibilidade: 'Indisponível', company: 'Market Experts', funcao: 'Analista de Marketing', tags: 'SEO, Google Ads', telefone: '(11) 98888-2222', gerente: 'Fernanda Souza' },
  { name: 'Olivia Prosacco', departamento: 'Financeiro', projeto: 'Banco do Brasil', disponibilidade: 'Disponível', company: 'Finance Corp', funcao: 'Contadora', tags: 'Excel, SAP', telefone: '(21) 97777-3333', gerente: 'João Pereira' },
  { name: 'Noah Wiza', departamento: 'Recursos Humanos', projeto: 'Ambev', disponibilidade: 'Disponível', company: 'HR Solutions', funcao: 'Recrutador', tags: 'Entrevistas, Onboarding', telefone: '(31) 96666-4444', gerente: 'Patrícia Gomes' },
  { name: 'Ava McGlynn', departamento: 'Vendas', projeto: 'Magazine Luiza', disponibilidade: 'Indisponível', company: 'Sales Pros', funcao: 'Representante de Vendas', tags: 'CRM, Negociação', telefone: '(41) 95555-5555', gerente: 'Rafael Nogueira' },
  { name: 'Elijah Koss', departamento: 'Logística', projeto: 'Correios', disponibilidade: 'Disponível', company: 'LogiTrans', funcao: 'Coordenador de Logística', tags: 'Supply Chain, Transporte', telefone: '(81) 94444-6666', gerente: 'Ana Bezerra' },
  { name: 'Sophia Bogan', departamento: 'Atendimento ao Cliente', projeto: 'Nubank', disponibilidade: 'Disponível', company: 'Client First', funcao: 'Atendente', tags: 'Suporte, CRM', telefone: '(85) 93333-7777', gerente: 'Ricardo Monteiro' },
  { name: 'James Schaden', departamento: 'Desenvolvimento de Produto', projeto: 'iFood', disponibilidade: 'Indisponível', company: 'Product Innovators', funcao: 'Gerente de Produto', tags: 'Agile, UX/UI', telefone: '(71) 92222-8888', gerente: 'Carlos Lima' },
  { name: 'Isabella Kautzer', departamento: 'Design', projeto: '99', disponibilidade: 'Disponível', company: 'Creative Minds', funcao: 'Designer Gráfico', tags: 'Photoshop, Illustrator', telefone: '(11) 91111-9999', gerente: 'Fernanda Souza' },
  { name: 'Benjamin OKon', departamento: 'Jurídico', projeto: 'Petrobras', disponibilidade: 'Disponível', company: 'Legal Experts', funcao: 'Advogado', tags: 'Contratos, Compliance', telefone: '(51) 90000-1234', gerente: 'João Pereira' },
  { name: 'Mia Ziemann', departamento: 'Pesquisa e Desenvolvimento', projeto: 'Embraer', disponibilidade: 'Indisponível', company: 'Innovatech', funcao: 'Cientista de Dados', tags: 'Python, Machine Learning', telefone: '(61) 98888-5678', gerente: 'Patrícia Gomes' },
  { name: 'Lucas Kiehn', departamento: 'Operações', projeto: 'Vale', disponibilidade: 'Disponível', company: 'Ops Solutions', funcao: 'Analista de Operações', tags: 'Processos, Eficiência', telefone: '(31) 97777-6789', gerente: 'Rafael Nogueira' },
  { name: 'Charlotte Blick', departamento: 'Comunicação', projeto: 'Globo', disponibilidade: 'Disponível', company: 'Comms Agency', funcao: 'Especialista em Comunicação', tags: 'Mídias Sociais, Relações Públicas', telefone: '(21) 96666-7890', gerente: 'Ana Bezerra' },
  { name: 'Henry OConnell', departamento: 'Segurança da Informação', projeto: 'Banco Itaú', disponibilidade: 'Indisponível', company: 'SecureTech', funcao: 'Analista de Segurança', tags: 'Firewall, VPN', telefone: '(11) 95555-8901', gerente: 'Ricardo Monteiro' },
  { name: 'Amelia Runte', departamento: 'Qualidade', projeto: 'Braskem', disponibilidade: 'Disponível', company: 'Quality First', funcao: 'Engenheira de Qualidade', tags: 'ISO, Auditoria', telefone: '(81) 94444-9012', gerente: 'Carlos Lima' },
  { name: 'Alexander Witting', departamento: 'Pesquisa de Mercado', projeto: 'Coca-Cola', disponibilidade: 'Disponível', company: 'Market Insights', funcao: 'Pesquisador de Mercado', tags: 'SPSS, Análise de Dados', telefone: '(41) 93333-0123', gerente: 'Fernanda Souza' },
  { name: 'Evelyn Kulas', departamento: 'Sustentabilidade', projeto: 'Natura', disponibilidade: 'Indisponível', company: 'Green Solutions', funcao: 'Coordenadora de Sustentabilidade', tags: 'Meio Ambiente, RSE', telefone: '(85) 92222-1234', gerente: 'João Pereira' },
  { name: 'Daniela McClure', departamento: 'Eventos', projeto: 'Rock in Rio', disponibilidade: 'Disponível', company: 'Event Masters', funcao: 'Organizadora de Eventos', tags: 'Logística, Planejamento', telefone: '(71) 91111-2345', gerente: 'Patrícia Gomes' },
  { name: 'Matthew Gleichner', departamento: 'Inovação', projeto: 'Startup XYZ', disponibilidade: 'Disponível', company: 'Future Tech', funcao: 'Especialista em Inovação', tags: 'Trends, Tecnologia', telefone: '(61) 90000-3456', gerente: 'Rafael Nogueira' },
  { name: 'Harper Kiehn', departamento: 'Treinamento e Desenvolvimento', projeto: 'Universidade ABC', disponibilidade: 'Indisponível', company: 'Learn & Grow', funcao: 'Instrutora', tags: 'Workshops, E-learning', telefone: '(51) 98888-4567', gerente: 'Ana Bezerra' },
  { name: 'Josephine OConnell', departamento: 'Administração', projeto: 'Prefeitura Municipal', disponibilidade: 'Disponível', company: 'Admin Solutions', funcao: 'Assistente Administrativo', tags: 'Organização, Gestão de Documentos', telefone: '(31) 97777-5678', gerente: 'Ricardo Monteiro' },
  { name: 'Samuel Prosacco', departamento: 'Pesquisa Clínica', projeto: 'Hospital XYZ', disponibilidade: 'Disponível', company: 'Health Research', funcao: 'Pesquisador Clínico', tags: 'Ensaios Clínicos, Ética', telefone: '(21) 96666-6789', gerente: 'Carlos Lima' },
  { name: 'Ella Kautzer', departamento: 'Engenharia', projeto: 'Construtora ABC', disponibilidade: 'Indisponível', company: 'BuildTech', funcao: 'Engenheira Civil', tags: 'AutoCAD, Projetos', telefone: '(11) 95555-7890', gerente: 'Fernanda Souza' },
  { name: 'David Schaden', departamento: 'Manutenção', projeto: 'Usina XYZ', disponibilidade: 'Disponível', company: 'MaintainIt', funcao: 'Técnico de Manutenção', tags: 'Reparos, Preventiva', telefone: '(81) 94444-8901', gerente: 'João Pereira' },
  { name: 'Scarlett Ziemann', departamento: 'Pesquisa de Operações', projeto: 'Empresa 123', disponibilidade: 'Disponível', company: 'Ops Research', funcao: 'Analista de Pesquisa Operacional', tags: 'Modelagem, Simulação', telefone: '(41) 93333-9012', gerente: 'Patrícia Gomes' },
  { name: 'Carter Wiza', departamento: 'Desenvolvimento Sustentável', projeto: 'ONG Verde', disponibilidade: 'Indisponível', company: 'Sustainability Co.', funcao: 'Especialista em Desenvolvimento Sustentável', tags: 'Projetos Verdes, RSE', telefone: '(85) 92222-0123', gerente: 'Rafael Nogueira' },
  { name: 'Victoria McGlynn', departamento: 'Comunidade e Relações Públicas', projeto: 'Instituição ABC', disponibilidade: 'Disponível', company: 'Community Connect', funcao: 'Coordenadora de Relações Comunitárias', tags: 'Engajamento, Comunicação', telefone: '(71) 91111-1234', gerente: 'Ana Bezerra' },
  { name: 'Owen Koss', departamento: 'Pesquisa Tecnológica', projeto: 'Laboratório XYZ', disponibilidade: 'Disponível', company: 'Tech Research', funcao: 'Pesquisador Tecnológico', tags: 'Inovação, Desenvolvimento', telefone: '(61) 90000-2345', gerente: 'Ricardo Monteiro' },
  { name: 'Lily Blick', departamento: 'Desenvolvimento Organizacional', projeto: 'Empresa 456', disponibilidade: 'Indisponível', company: 'Org Dev Co.', funcao: 'Consultora de Desenvolvimento Organizacional', tags: 'Mudança, Cultura', telefone: '(51) 98888-3456', gerente: 'Carlos Lima' },
  { name: 'Jack OKon', departamento: 'Relações Internacionais', projeto: 'Corp Global', disponibilidade: 'Disponível', company: 'Global Connect', funcao: 'Analista de Relações Internacionais', tags: 'Negociações, Parcerias', telefone: '(31) 97777-4567', gerente: 'Fernanda Souza' },
  { name: 'Zoey Runte', departamento: 'Comunicação Interna', projeto: 'Empresa 789', disponibilidade: 'Disponível', company: 'Internal Comms', funcao: 'Especialista em Comunicação Interna', tags: 'Engajamento, Mídias Internas', telefone: '(21) 96666-5678', gerente: 'João Pereira' },
];

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

export function Funcionario() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
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

  const { employees, addEmployee } = useEmployees();
  const { addAllocation } = useAllocations();
  const syncedRef = useRef(false);

  // Sync local funcionario `data` entries into global EmployeeContext once
  useEffect(() => {
    if (syncedRef.current) return;
    data.forEach((row) => {
      const exists = employees.some((e) => e.name === row.name);
      if (!exists) {
        addEmployee({
          name: row.name,
          role: row.funcao,
          company: row.company,
          companyColor: '#EBE7E1',
        });
      }
    });
    syncedRef.current = true;
  }, [employees, addEmployee]);

  const itemsPerPage = 10;

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(data, {
        sortBy: field,
        reversed,
        search,
        filtroDepartamentos,
        filtroDisponibilidades,
        filtroFuncoes,
        filtroEmpresas,
        filtroProjetos,
        filtroGerentes,
      })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
        filtroDepartamentos,
        filtroDisponibilidades,
        filtroFuncoes,
        filtroEmpresas,
        filtroProjetos,
        filtroGerentes,
      })
    );
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
    setSortedData(data);
    setPage(1);
  };

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
                  data={[...new Set(data.map((i) => i.departamento))]}
                  value={filtroDepartamentos}
                  onChange={(value) => {
                    setFiltroDepartamentos(value);
                    setSortedData(
                      sortData(data, {
                        sortBy,
                        reversed: reverseSortDirection,
                        search,
                        filtroDepartamentos: value,
                        filtroDisponibilidades,
                        filtroFuncoes,
                        filtroEmpresas,
                        filtroProjetos,
                        filtroGerentes,
                      })
                    );
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
                    setSortedData(
                      sortData(data, {
                        sortBy,
                        reversed: reverseSortDirection,
                        search,
                        filtroDepartamentos,
                        filtroDisponibilidades: value,
                        filtroFuncoes,
                        filtroEmpresas,
                        filtroProjetos,
                        filtroGerentes,
                      })
                    );
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Função"
                  placeholder="Selecione"
                  data={[...new Set(data.map((i) => i.funcao))]}
                  value={filtroFuncoes}
                  onChange={(value) => {
                    setFiltroFuncoes(value);
                    setSortedData(
                      sortData(data, {
                        sortBy,
                        reversed: reverseSortDirection,
                        search,
                        filtroDepartamentos,
                        filtroDisponibilidades,
                        filtroFuncoes: value,
                        filtroEmpresas,
                        filtroProjetos,
                        filtroGerentes,
                      })
                    );
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Empresa"
                  placeholder="Selecione"
                  data={[...new Set(data.map((i) => i.company))]}
                  value={filtroEmpresas}
                  onChange={(value) => {
                    setFiltroEmpresas(value);
                    setSortedData(
                      sortData(data, {
                        sortBy,
                        reversed: reverseSortDirection,
                        search,
                        filtroDepartamentos,
                        filtroDisponibilidades,
                        filtroFuncoes,
                        filtroEmpresas: value,
                        filtroProjetos,
                        filtroGerentes,
                      })
                    );
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Projeto"
                  placeholder="Selecione"
                  data={[...new Set(data.map((i) => i.projeto))]}
                  value={filtroProjetos}
                  onChange={(value) => {
                    setFiltroProjetos(value);
                    setSortedData(
                      sortData(data, {
                        sortBy,
                        reversed: reverseSortDirection,
                        search,
                        filtroDepartamentos,
                        filtroDisponibilidades,
                        filtroFuncoes,
                        filtroEmpresas,
                        filtroProjetos: value,
                        filtroGerentes,
                      })
                    );
                    setPage(1);
                  }}
                  clearable
                />

                <MultiSelect
                  label="Gerente"
                  placeholder="Selecione"
                  data={[...new Set(data.map((i) => i.gerente))]}
                  value={filtroGerentes}
                  onChange={(value) => {
                    setFiltroGerentes(value);
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
                        filtroGerentes: value,
                      })
                    );
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
                  Projeto
                </Text>
                <Text fw={500}>{selectedUser.projeto}</Text>
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
          empresasDisponiveis={[]}
          onSubmit={(alocacoes) => {
            // Create an allocation for each company selected
            alocacoes.alocacoes.forEach((aloc) => {
              const id = `${selectedUser.name}-${aloc.empresa}-${Date.now()}`;
              const startDateStr = aloc.dataInicio ? dayjs(aloc.dataInicio).format('YYYY-MM-DD') : '';
              const endDateStr = aloc.dataFim ? dayjs(aloc.dataFim).format('YYYY-MM-DD') : '';
              
              if (startDateStr && endDateStr && aloc.empresa) {
                addAllocation({
                  id,
                  employeeName: selectedUser.name,
                  company: aloc.empresa,
                  title: `Alocado na ${aloc.empresa}`,
                  startDate: startDateStr,
                  endDate: endDateStr,
                  color: '#4F46E5',
                });
              }
            });
            closeAllocationDrawer();
          }}
        />
      )}
    </div>
  );
}