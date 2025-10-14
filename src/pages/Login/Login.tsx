import {
  /*   Anchor,*/
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  /*   Text,*/
  TextInput,
  Title,
  Image as MantineImage,
} from "@mantine/core"
import classes from "./Login.module.css"
import logoAnu from "../../assets/anuLogo.jpeg"

export function Login() {
  return (
    <div className={classes.wrapper}>
      
      <div>
        <Paper className={classes.form}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div className={classes.formContainer}>
              <MantineImage
                className={classes.logo}
                src={logoAnu}
                alt="Logo ANU"
              />
            </div>

            <Title order={2} className={classes.title}>
              Que bom ter você de volta!
            </Title>

            <TextInput placeholder="Digite seu e-mail" size="md" radius="md" />
            <PasswordInput placeholder="Senha" mt="md" size="md" radius="md" />
            <Checkbox
              color="rgba(255, 255, 255, 1)"
              label="Matenha-me conectado"
              styles={{
                label: { color: "#ffffffff" }, // Usando um código hexadecimal
              }}
              mt="xl"
              size="md"
              variant="outline"
            />
            <Button color="#a39787" fullWidth mt="xl" size="md" radius="md">
              Entrar
            </Button>

            {/*         <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
          Register
          </Anchor>
          </Text> */}
          </div>
        </Paper>
      </div>
      <div>
        <MantineImage
          className={classes.imageLogin}
          src="/src/assets/anuBranco-capa-login.jpg"
          alt="Login image"
        />
      </div>
    </div>
  )
}
