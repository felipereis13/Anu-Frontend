import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import classes from "./Login.module.css"

export function Login() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Seja bem vindo ao ANU!
        </Title>

        <TextInput
          label="Email"
          placeholder="Anu@gmail.com"
          size="md"
          radius="md"
        />
        <PasswordInput
          label="Senha"
          placeholder="Sua senha"
          mt="md"
          size="md"
          radius="md"
        />
        <Checkbox label="Me mantenha conectado" mt="xl" size="md" />
        <Button id="buttonLogin" fullWidth mt="xl" size="md" radius="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  )
}
