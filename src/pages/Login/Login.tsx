import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Image as MantineImage,
} from "@mantine/core";
import { useForm } from '@mantine/form';
import classes from "./Login.module.css";
import logoAnu from "../../icons figma/ANU-LOGO-LOGIN.png";
import imageLogin from "../../assets/anuBranco-capa-login.jpg";

export function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      keepConnected: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'E-mail inválido'),
      password: (val) => (val.length < 6 ? 'A senha deve ter pelo menos 6 caracteres' : null),
    },
  });

  return (
    <div className={classes.wrapper}>
      <div>
        <Paper className={classes.form}>
          <div className={classes.formContainer}>
            <MantineImage
              className={classes.logoLogin}
              src={logoAnu}
              alt="Logo ANU"
            />
          </div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Title order={2} className={classes.title}>
              Que bom ter você de volta!
            </Title>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                placeholder="Digite seu e-mail"
                size="md"
                radius="md"
                required
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
                styles={{
                  error: { color: "white" },
                }}
              />
              <PasswordInput
                placeholder="Senha"
                mt="md"
                size="md"
                radius="md"
                required
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                styles={{
                  error: { color: "white" }, 
                }}
              />
              <Checkbox
                color="rgba(255, 255, 255, 1)"
                label="Matenha-me conectado"
                styles={{
                  label: { color: "#ffffffff" },
                }}
                mt="xl"
                size="md"
                variant="outline"
                checked={form.values.keepConnected}
                onChange={(event) =>
                  form.setFieldValue(
                    "keepConnected",
                    event.currentTarget.checked
                  )
                }
              />
              <Button
                type="submit"
                color="#a39787"
                fullWidth
                mt="xl"
                size="md"
                radius="md"
              >
                Entrar
              </Button>
            </form>
          </div>
        </Paper>
      </div>
      <div>
        <MantineImage
          className={classes.imageLogin}
          src={imageLogin}
          alt="Login image"
        />
      </div>
    </div>
  )
}