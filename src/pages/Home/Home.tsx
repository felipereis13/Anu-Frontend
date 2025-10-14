import { Container, Grid, Card, Text } from '@mantine/core';
import classes from './Home.module.css';
import { Nav } from '../../Components/Nav/Nav';
import { HeaderSearch } from '../../Components/search/Search';

export function Home() {
    return (
        <>
            <Nav />
            <HeaderSearch />
            <Container fluid className={classes.Container} style={{marginLeft: '    80px'}}>
      <Grid justify="center" align="flex-start" gutter="md">
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid.Col key={i} span={{ base: 6, sm: 4, md: 2 }}>
            <Card shadow="sm" radius="md" withBorder>
              <Text ta="center">Card {i + 1}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Card
        mt="xl"
        radius="md"
        withBorder
        w="90%"
        style={{ minHeight: '120px', background: 'white' }}
      >
        <Text fw={600} mb="sm">
          Últimas atualizações
        </Text>
        <Text ta="center" c="dimmed">
        </Text>
      </Card>
    </Container>
        </>
    );
}
