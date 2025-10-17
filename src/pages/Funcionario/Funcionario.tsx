import { useState } from 'react';
import { Container, Grid, Text, ScrollArea, Table, TextInput, UnstyledButton, Group, Center } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import classes from './Funcionario.module.css';
import { Nav } from "../../Components/Nav/Nav";
import { HeaderSearch } from "../../Components/search/Search";


interface RowData {
  name: string;
  email: string;
  company: string;
  funcao: string;
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
  { name: 'Athena Weissnat', company: 'Little - Rippin', email: 'Elouise.Prohaska@yahoo.com', funcao: 'Gerente Junior' },
  { name: 'Deangelo Runolfsson', company: 'Greenfelder - Krajcik', email: 'Kadin_Trantow87@yahoo.com', funcao: 'Vendedor' },
  { name: 'Danny Carter', company: 'Kohler and Sons', email: 'Marina3@hotmail.com',   funcao: 'Estagiario' },
  { name: 'Trace Tremblay PhD', company: 'Crona, Aufderhar and Senger', email: 'Antonina.Pouros@yahoo.com', funcao: 'Gerente' },
  { name: 'Derek Dibbert', company: 'Gottlieb LLC', email: 'Abagail29@hotmail.com',   funcao: 'Designer' },
  { name: 'Viola Bernhard', company: 'Funk, Rohan and Kreiger', email: 'Jamie23@hotmail.com', funcao: 'Analista QA' },
  { name: 'Austin Jacobi', company: 'Botsford - Corwin', email: 'Genesis42@yahoo.com', funcao: 'Desenvolvedor' },
  { name: 'Hershel Mosciski', company: 'Okuneva, Farrell and Kilback', email: 'Idella.Stehr28@yahoo.com', funcao: 'DevOps' },
  { name: 'Mylene Ebert', company: 'Kirlin and Sons', email: 'Hildegard17@hotmail.com', funcao: 'Marketing' },
  { name: 'Lou Trantow', company: 'Parisian - Lemke', email: 'Hillard.Barrows1@hotmail.com',  funcao: 'Gerente Senior' },
  { name: 'Dariana Weimann', company: 'Schowalter - Donnelly', email: 'Colleen80@gmail.com',  funcao: 'RH' },
  { name: 'Dr. Christy Herman', company: 'VonRueden - Labadie', email: 'Lilyan98@gmail.com', funcao: 'Financeiro' },
  { name: 'Katelin Schuster', company: 'Jacobson - Smitham', email: 'Erich_Brekke76@gmail.com', funcao: 'Contador' },
  { name: 'Melyna Macejkovic', company: 'Schuster LLC', email: 'Kylee4@yahoo.com',  funcao: 'Assistente' },
  { name: 'Pinkie Rice', company: 'Wolf, Trantow and Zulauf', email: 'Fiona.Kutch@hotmail.com', funcao: 'Auxiliar' },
  { name: 'Brain Kreiger', company: 'Lueilwitz Group', email: 'Rico98@hotmail.com', funcao: 'Suporte' },
];


export function Funcionario() {

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
       <Table.Td>{row.funcao}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.wrapper}>
      <Nav />
      <HeaderSearch />
      <Container fluid className={classes.Container} style={{ marginLeft: '80px' }}>
        <Grid justify="center" align="flex-start" gutter="md">
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid.Col key={i} span={{ base: 6, sm: 4, md: 2 }}>
            </Grid.Col>
          ))}
        </Grid>
        <main className={classes['funcionario-container']}>
          <section className={classes['funcionario-top']}>
            
          </section>
          <section className={classes['funcionario-content']}>
            <div className={classes['funcionario-text']}>
              <ScrollArea>
                <TextInput
                  placeholder="Buscar por qualquer campo"
                  mb="md"
                  leftSection={<IconSearch size={16} stroke={1.5} />}
                  value={search}
                  onChange={handleSearchChange}
                />
                <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                  <Table.Tbody>
<Table.Tr>
  <Th
    sorted={sortBy === 'name'}
    reversed={reverseSortDirection}
    onSort={() => setSorting('name')}
  >
    Nome
  </Th>
  <Th
    sorted={sortBy === 'email'}
    reversed={reverseSortDirection}
    onSort={() => setSorting('email')}
  >
    Email
  </Th>
  <Th
    sorted={sortBy === 'company'}
    reversed={reverseSortDirection}
    onSort={() => setSorting('company')}
  >
    Empresa
  </Th>
  <Th
    sorted={sortBy === 'funcao'}
    reversed={reverseSortDirection}
    onSort={() => setSorting('funcao')}
  >
    Função
  </Th>
</Table.Tr>
                  </Table.Tbody>
                  <Table.Tbody>
                    {rows.length > 0 ? (
                      rows
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={3}>
                          <Text fw={500} ta="center">
                            Nenhum resultado encontrado
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}