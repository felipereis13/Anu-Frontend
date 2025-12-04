import { useState } from "react"
import {
  Drawer,
  Grid,
  TextInput,
  Group,
  Button,
  FileInput,
  Avatar,
  Stack,
  TagsInput,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import type { DateValue } from "@mantine/dates"
import { useForm } from "@mantine/form"
import "@mantine/dates/styles.css"

type EmployeeForm = {
  nome: string
  email: string
  telefone: string
  gerente: string
  funcao: string
  departamento: string
  dataEntrada: DateValue
  tags: string[]
  avatar: File | null
}

type Props = {
  opened: boolean
  onClose: () => void
  onSubmit?: (values: EmployeeForm) => void
}

export default function EmployeeModal({ opened, onClose, onSubmit }: Props) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<EmployeeForm>({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      gerente: "",
      funcao: "",
      departamento: "",
      dataEntrada: null,
      tags: [],
      avatar: null,
    },
    validate: {
      nome: (v) => (v.trim().length < 3 ? "Informe o nome completo" : null),
      email: (v) =>
        v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "E-mail inválido" : null,
      telefone: (v) =>
        v && v.replace(/\D/g, "").length < 10 ? "Telefone inválido" : null,
    },
  })

  function handleAvatar(file: File | null) {
    form.setFieldValue("avatar", file)
    if (!file) {
      setAvatarPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setAvatarPreview(url)
  }

  function submit(values: EmployeeForm) {
    onSubmit?.(values)
    onClose()
    form.reset()
    setAvatarPreview(null)
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Cadastro de Funcionário"
      position="right"
      size="lg"
      padding="xl"
      overlayProps={{ backgroundOpacity: 0.3, blur: 3 }}
    >
      <form onSubmit={form.onSubmit(submit)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Stack align="center" gap="sm">
              <Avatar
                src={avatarPreview ?? undefined}
                radius="xl"
                size={90}
                alt="Avatar"
              />
              <FileInput
                label="Foto (opcional)"
                placeholder="Selecione uma imagem"
                accept="image/*"
                value={form.values.avatar ?? null}
                onChange={handleAvatar}
                clearable
              />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 9 }}>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  label="Nome completo"
                  placeholder="Ex.: Maria Silva"
                  {...form.getInputProps("nome")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <TextInput
                  label="Função"
                  placeholder="Ex.: Desenvolvedor(a)"
                  {...form.getInputProps("funcao")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="E-mail"
                  placeholder="nome@empresa.com"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 3 }}>
                <TextInput
                  label="Número telefone"
                  placeholder="(00) 00000-0000"
                  {...form.getInputProps("telefone")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 3 }}>
                <TextInput
                  label="Gerente responsável"
                  placeholder="Ex.: João Costa"
                  {...form.getInputProps("gerente")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 4 }}>
                <TextInput
                  label="Departamento"
                  placeholder="Ex.: TI"
                  {...form.getInputProps("departamento")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 8 }}>
                <DatePickerInput
                  label="Data de entrada"
                  placeholder="Selecione a data de entrada"
                  value={form.values.dataEntrada}
                  onChange={(d) => form.setFieldValue("dataEntrada", d ?? null)}
                  valueFormat="DD/MM/YYYY"
                  styles={{
                    calendarHeaderControl: {
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      fontSize: "0.8rem",
                    },
                    calendarHeader: {
                      justifyContent: "space-between",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TagsInput
                  label="TAG's"
                  placeholder="Digite e pressione Enter"
                  splitChars={[","]}
                  {...form.getInputProps("tags")}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="lg">
          <Button variant="subtle" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </Drawer>
  )
}