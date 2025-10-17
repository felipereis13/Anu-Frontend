import { useState } from 'react';
import {Container, Text, ScrollArea, Table, TextInput, UnstyledButton, Group, Center, Pagination} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import classes from './Funcionario.module.css';
import { Nav } from "../../Components/Nav/Nav";
import { HeaderSearch } from "../../Components/search/Search";

interface RowData {
  name: string;
  departamento: string;
  projeto: string;
  disponibilidade: string;
  company: string;
  funcao: string;
  tags: string;
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


function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(data[0]).some((key) =>
      String(item[key as keyof RowData]).toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy]!.localeCompare(a[sortBy]!);
      }
      return a[sortBy]!.localeCompare(b[sortBy]!);
    }),
    payload.search
  );
}


const data = [
  { name: 'Athena Weissnat', departamento: "TI", projeto: 'Anatel', disponibilidade: 'Disponível', company: 'Tech Solutions', funcao: 'Desenvolvedora', tags: 'React, Node.js' },
  { name: 'Liam Kuhlman', departamento: "Marketing", projeto: 'Google', disponibilidade: 'Indisponível', company: 'Market Experts', funcao: 'Analista de Marketing', tags: 'SEO, Google Ads' },
  { name: 'Olivia Prosacco', departamento: "Financeiro", projeto: 'Banco do Brasil', disponibilidade: 'Disponível', company: 'Finance Corp', funcao: 'Contadora', tags: 'Excel, SAP' },
  { name: 'Noah Wiza', departamento: "Recursos Humanos", projeto: 'Ambev', disponibilidade: 'Disponível', company: 'HR Solutions', funcao: 'Recrutador', tags: 'Entrevistas, Onboarding' },
  { name: 'Ava McGlynn', departamento: "Vendas", projeto: 'Magazine Luiza', disponibilidade: 'Indisponível', company: 'Sales Pros', funcao: 'Representante de Vendas', tags: 'CRM, Negociação' },
  { name: 'Elijah Koss', departamento: "Logística", projeto: 'Correios', disponibilidade: 'Disponível', company: 'LogiTrans', funcao: 'Coordenador de Logística', tags: 'Supply Chain, Transporte' },
  { name: 'Sophia Bogan', departamento: "Atendimento ao Cliente", projeto: 'Nubank', disponibilidade: 'Disponível', company: 'Client First', funcao: 'Atendente', tags: 'Suporte, CRM' },
  { name: 'James Schaden', departamento: "Desenvolvimento de Produto", projeto: 'iFood', disponibilidade: 'Indisponível', company: 'Product Innovators', funcao: 'Gerente de Produto', tags: 'Agile, UX/UI' },
  { name: 'Isabella Kautzer', departamento: "Design", projeto: '99', disponibilidade: 'Disponível', company: 'Creative Minds', funcao: 'Designer Gráfico', tags: 'Photoshop, Illustrator' },
  { name: 'Benjamin OKon', departamento: "Jurídico", projeto: 'Petrobras', disponibilidade: 'Disponível', company: 'Legal Experts', funcao: 'Advogado', tags: 'Contratos, Compliance' },
  { name: 'Mia Runte', departamento: "Pesquisa e Desenvolvimento", projeto: 'Embraer', disponibilidade: 'Indisponível', company: 'Innovatech', funcao: 'Cientista de Dados', tags: 'Python, Machine Learning' },
  { name: 'Lucas Witting', departamento: "Operações", projeto: 'Vale', disponibilidade: 'Disponível', company: 'Ops Solutions', funcao: 'Analista de Operações', tags: 'Processos, Eficiência' },
  { name: 'Charlotte Ziemann', departamento: "Comunicação", projeto: 'Globo', disponibilidade: 'Disponível', company: 'Comms Agency', funcao: 'Especialista em Comunicação', tags: 'Redes Sociais, PR' },
  { name: 'Henry Langosh', departamento: "TI", projeto: 'Microsoft', disponibilidade: 'Indisponível', company: 'Tech Solutions', funcao: 'Administrador de Sistemas', tags: 'Azure, Windows Server' },
  { name: 'Amelia Dietrich', departamento: "Marketing", projeto: 'Facebook', disponibilidade: 'Disponível', company: 'Market Experts', funcao: 'Gerente de Marketing', tags: 'Content Marketing, Analytics' },
  { name: 'Alexander Kiehn', departamento: "Financeiro", projeto: 'Itaú', disponibilidade: 'Disponível', company: 'Finance Corp', funcao: 'Analista Financeiro', tags: 'Finanças, Power BI' },
  { name: 'Harper OConnell', departamento: "Recursos Humanos", projeto: 'Coca-Cola', disponibilidade: 'Indisponível', company: 'HR Solutions', funcao: 'Especialista em RH', tags: 'Treinamento, Desenvolvimento' },
  { name: 'Ethan Braun', departamento: "Vendas", projeto: 'Casas Bahia', disponibilidade: 'Disponível', company: 'Sales Pros', funcao: 'Gerente de Vendas', tags: 'Liderança, Estratégia de Vendas' },
  { name: 'Evelyn Gleichner', departamento: "Logística", projeto: 'DHL', disponibilidade: 'Disponível', company: 'LogiTrans', funcao: 'Analista de Logística', tags: 'Inventário, Distribuição' },
  { name: 'Daniela Stokes', departamento: "Atendimento ao Cliente", projeto: 'XP Investimentos', disponibilidade: 'Indisponível', company: 'Client First', funcao: 'Gerente de Atendimento', tags: 'Satisfação do Cliente, Retenção' },
  { name: 'Matthew Kulas', departamento: "Desenvolvimento de Produto", projeto: 'Rappi', disponibilidade: 'Disponível', company: 'Product Innovators', funcao: 'Desenvolvedor Full Stack', tags: 'JavaScript, Node.js' },
  { name: 'Scarlett McClure', departamento: "Design", projeto: 'Spotify', disponibilidade: 'Indisponível', company: 'Creative Minds', funcao: 'UX Designer', tags: 'Figma, Prototipagem' },
  { name: 'Josephine Witting', departamento: "Jurídico", projeto: 'Bradesco', disponibilidade: 'Disponível', company: 'Legal Experts', funcao: 'Consultora Jurídica', tags: 'Direito Empresarial, LGPD' },
  { name: 'Samuel Greenholt', departamento: "Pesquisa e Desenvolvimento", projeto: 'Natura', disponibilidade: 'Disponível', company: 'Innovatech', funcao: 'Engenheiro de Software', tags: 'C++, Sistemas Embarcados' },
  { name: 'Victoria Langworth', departamento: "Operações", projeto: 'Gerdau', disponibilidade: 'Indisponível', company: 'Ops Solutions', funcao: 'Gerente de Operações', tags: 'Gestão de Projetos, Lean' }

];

export function Funcionario() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 12;

 
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    setPage(1); 
  };


  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const rows = paginatedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.departamento}</Table.Td>
      <Table.Td>{row.projeto}</Table.Td>
      <Table.Td>{row.disponibilidade}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>{row.funcao}</Table.Td>
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
            <ScrollArea>
              <TextInput
                placeholder="Digite algo para começar a buscar"
                mb="md"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
              />

              <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Thead>
                  <Table.Tr>
                    <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>Nome</Th>
                    <Th sorted={sortBy === 'departamento'} reversed={reverseSortDirection} onSort={() => setSorting('departamento')}>Departamento</Th>
                    <Th sorted={sortBy === 'projeto'} reversed={reverseSortDirection} onSort={() => setSorting('projeto')}>Projeto</Th>
                    <Th sorted={sortBy === 'disponibilidade'} reversed={reverseSortDirection} onSort={() => setSorting('disponibilidade')}>Disponibilidade</Th>
                    <Th sorted={sortBy === 'company'} reversed={reverseSortDirection} onSort={() => setSorting('company')}>Empresa</Th>
                    <Th sorted={sortBy === 'funcao'} reversed={reverseSortDirection} onSort={() => setSorting('funcao')}>Função</Th>
                    <Th sorted={sortBy === 'tags'} reversed={reverseSortDirection} onSort={() => setSorting('tags')}>Tags</Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={7}>
                        <Text fw={500} ta="center">
                          Ops, nenhum funcionário encontrado com esse termo...
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
    </div>
  );
}
