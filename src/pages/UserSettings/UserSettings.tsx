import { TextInput, Button, Group, Avatar } from '@mantine/core';
import { HeaderSearch } from "../../Components/search/Search";
import { Nav } from "../../Components/Nav/Nav";
import classes from './UserSettings.module.css';

export function UserSettings() {
  return (
    <>
      <Nav />
      <HeaderSearch />
      <main className={classes.main}>
        <h2 className={classes.title}>Cadastro de Usuário</h2>

        <div className={classes.formContainer}>
          <Avatar size={100} radius="xl" src={null} alt="Foto de perfil" />

          <form className={classes.form}>
            <TextInput label="Nome completo" placeholder="Inserir nome completo" />
            <TextInput label="E-mail" placeholder="Inserir e-mail" />
            <TextInput label="Matrícula" placeholder="Preencher com o número de matrícula" />
            <TextInput label="Número de telefone" placeholder="Preencher com o número de telefone" />

            <Group justify="flex-end" mt="md">
              <Button variant="default">Cancelar</Button>
              <Button color="blue">Salvar</Button>
            </Group>
          </form>
        </div>
      </main>
    </>
  );
}
