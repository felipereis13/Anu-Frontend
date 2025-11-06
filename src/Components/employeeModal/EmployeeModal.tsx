import {  useState } from "react"
import {
  Modal,
  Grid,
  TextInput,
  Group,
  Button,
  FileInput,
  Avatar,
  Stack,
  TagsInput,
  Divider,
 
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import type { DateValue, DatesRangeValue } from "@mantine/dates"
import { useForm } from "@mantine/form"

type EmployeeForm = {
  nome: string
  email: string
  telefone: string
  gerente: string
  funcao: string
  departamento: string
  dataEntrada: DateValue
  dataFeriasInicio: DateValue
  dataFeriasFim: DateValue
  dataLicencaInicio: string | null
  dataLicencaFim: string | null
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
      dataFeriasInicio: null,
      dataFeriasFim: null,
      dataLicencaInicio: null,
      dataLicencaFim: null,
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
    <Modal
      opened={opened}
      onClose={onClose}
      title="Cadastro de Funcionário"
      size="50%"
      radius="md"
      centered
      styles={{
        content: {
          padding: "0.5rem 1rem", 
          height: "auto", 
        },
        header: {
          marginBottom: "0.5rem",
          padding: "0.5rem 1rem",
        },
        title: {
          fontWeight: 600,
          fontSize: "1.2rem",
        },
      }}
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

          {/* Férias e Licenças */}
          <Grid.Col span={12}>
            <Divider my="xs" />
          </Grid.Col>

          {/* Período de Férias */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DatePickerInput
              type="range"
              label="Período de Férias"
              placeholder="Selecione o início e o fim das férias"
              value={
                [
                  form.values.dataFeriasInicio,
                  form.values.dataFeriasFim,
                ] as DatesRangeValue
              }
              onChange={(range: DatesRangeValue) => {
                const [inicio, fim] = range
                form.setFieldValue("dataFeriasInicio", inicio ?? null)
                form.setFieldValue("dataFeriasFim", fim ?? null)
              }}
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

          {/* Período de Licença */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DatePickerInput
              type="range"
              label="Período da Licença"
              placeholder="Selecione o início e o fim da licença"
              value={[
                form.values.dataLicencaInicio,
                form.values.dataLicencaFim,
              ]}
              onChange={([inicio, fim]) => {
                form.setFieldValue("dataLicencaInicio", inicio ?? null)
                form.setFieldValue("dataLicencaFim", fim ?? null)
              }}
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
        </Grid>

        <Group justify="flex-end" mt="lg">
          <Button variant="subtle" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </Modal>
  )
}
