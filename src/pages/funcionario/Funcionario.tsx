import { Container, Grid, Card, Text } from '@mantine/core';
import classes from './funcionario.module.css';
import { Nav } from "../../Components/Nav/Nav";
import { HeaderSearch } from "../../Components/search/Search"

export function Funcionario() {
  return (
    <div className={classes.wrapper}>
      <Nav />
      <HeaderSearch />
      <Container fluid className={classes.Container} style={{ marginLeft: '80px' }}>
        <Grid justify="center" align="flex-start" gutter="md">
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid.Col key={i} span={{ base: 6, sm: 4, md: 2 }}>
              <Card shadow="sm" radius="md" withBorder>
                <Text ta="center">Card {i + 1}</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        <main className={classes['funcionario-container']}>
          <section className={classes['funcionario-top']}>
            <h1>Área do Funcionário</h1>
          </section>
          <section className={classes['funcionario-content']}>
            <div className={classes['funcionario-text']}>
              {/* texto aqui */}
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}