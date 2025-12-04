import { useMemo, useState } from "react"
import {
  Modal,
  Grid,
  TextInput,
  NumberInput,
  SegmentedControl,
  Group,
  Button,
  FileInput,
  Avatar,
  Stack,
  TagsInput,
  Divider,
  Box,
  Text,
  rem,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import type { DateValue, DatesRangeValue } from "@mantine/dates"

import { useForm } from "@mantine/form"

type WeekdayKey =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo"

type EmployeeForm = {
  nome: string
  email: string
  telefone: string
  gerente: string
  funcao: string
  departamento: string
  horaExtra: number | ""
  custoHora: number | ""
  disponibilidade: "Total" | "Parcial"
  dataEntrada: DateValue
  dataSaida: DateValue
  dataFeriasInicio: DateValue
  dataFeriasFim: DateValue
  dataLicencaInicio: string | null
  dataLicencaFim: string | null
  tags: string[]
  horasSemana: Record<WeekdayKey, number | "">
  avatar: File | null
}

type Props = {
  opened: boolean
  onClose: () => void
  onSubmit?: (values: EmployeeForm) => void
}

const DIA_LABELS: Record<WeekdayKey, string> = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
}

const initialWeek: Record<WeekdayKey, number | ""> = {
  segunda: 8,
  terca: "",
  quarta: "",
  quinta: "",
  sexta: "",
  sabado: "",
  domingo: "",
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
      horaExtra: "",
      custoHora: "",
      disponibilidade: "Total",
      dataEntrada: null,
      dataSaida: null,
      dataFeriasInicio: null,
      dataFeriasFim: null,
      dataLicencaInicio: null,
      dataLicencaFim: null,
      tags: [],
      horasSemana: initialWeek,
      avatar: null,
    },
    validate: {
      nome: (v) => (v.trim().length < 3 ? "Informe o nome completo" : null),
      email: (v) =>
        v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "E-mail inválido" : null,
      telefone: (v) =>
        v && v.replace(/\D/g, "").length < 10 ? "Telefone inválido" : null,
      custoHora: (v) =>
        v === "" || v >= 0 ? null : "Informe um valor maior ou igual a 0",
      horaExtra: (v) =>
        v === "" || v >= 0 ? null : "Informe um valor maior ou igual a 0",
      dataSaida: (v, values) =>
        v && values.dataEntrada && v < values.dataEntrada
          ? "Saída não pode ser antes da entrada"
          : null,
    },
  })

  const totalHorasSemana = useMemo(() => {
    return (Object.values(form.values.horasSemana) as (number | "")[])
      .map((h) => (h === "" ? 0 : h))
      .reduce((acc, n) => acc + (Number.isFinite(n) ? (n as number) : 0), 0)
  }, [form.values.horasSemana])

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
    const parsed: EmployeeForm = {
      ...values,
      custoHora: values.custoHora === "" ? 0 : Number(values.custoHora),
      horaExtra: values.horaExtra === "" ? 0 : Number(values.horaExtra),
    }
    onSubmit?.(parsed)
    onClose()
    form.reset()
    setAvatarPreview(null)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Cadastro de Funcionário"
      size="90%"
      radius="lg"
      centered
      styles={{
        content: {
          height: "90vh",
          padding: "2rem",
        },
      }}
    >
      <form onSubmit={form.onSubmit(submit)}>
        <Grid gutter="lg">
          {/* Avatar + upload */}
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

          {/* Coluna principal esquerda */}
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
                <NumberInput
                  label="Valor hora extra"
                  placeholder="0,00"
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalSeparator=","
                  leftSection={<Text fz="sm">R$</Text>}
                  {...form.getInputProps("horaExtra")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <NumberInput
                  label="Custo por hora"
                  placeholder="0,00"
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalSeparator=","
                  leftSection={<Text fz="sm">R$</Text>}
                  {...form.getInputProps("custoHora")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <TextInput
                  label="Departamento"
                  placeholder="Ex.: TI"
                  {...form.getInputProps("departamento")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <DatePickerInput
                  type="range"
                  label="Data de entrada / saída"
                  placeholder="Selecione o período"
                  value={
                    [
                      form.values.dataEntrada,
                      form.values.dataSaida,
                    ] as DatesRangeValue
                  }
                  onChange={(range: DatesRangeValue) => {
                    const [entrada, saida] = range
                    form.setFieldValue("dataEntrada", entrada ?? null)
                    form.setFieldValue("dataSaida", saida ?? null)
                  }}
                  valueFormat="DD/MM/YYYY"
                  styles={{
                    calendarHeaderControl: {
                      width: 28, // ← largura das setas
                      height: 28, // ← altura das setas
                      borderRadius: "50%",
                      fontSize: "0.8rem", // ← deixa o ícone menor
                    },
                    calendarHeader: {
                      justifyContent: "space-between",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap="xs">
                  <Text fw={500} size="sm">
                    Disponibilidade
                  </Text>
                  <SegmentedControl
                    fullWidth
                    data={["Total", "Parcial"]}
                    value={form.values.disponibilidade}
                    onChange={(v) =>
                      form.setFieldValue(
                        "disponibilidade",
                        v as "Total" | "Parcial"
                      )
                    }
                  />
                </Stack>
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

          {/* Jornada semanal */}
          <Grid.Col span={12}>
            <Divider my="xs" />
            <Text fw={600} mb="xs">
              Jornada por dia
            </Text>

            <Grid>
              {(Object.keys(DIA_LABELS) as WeekdayKey[]).map((key) => (
                <Grid.Col key={key} span={{ base: 12, sm: 4, md: 3 }}>
                  <NumberInput
                    label={DIA_LABELS[key]}
                    placeholder="Horas"
                    min={0}
                    max={24}
                    step={0.5}
                    rightSectionWidth={rem(48)}
                    value={form.values.horasSemana[key]}
                    onChange={(val) =>
                      form.setFieldValue("horasSemana", {
                        ...form.values.horasSemana,
                        [key]: val as number | "",
                      })
                    }
                    description="h/dia"
                  />
                </Grid.Col>
              ))}
            </Grid>

            <Box mt="xs">
              <Text size="sm" c="dimmed">
                Total semanal estimado:{" "}
                <Text span fw={600}>
                  {totalHorasSemana} horas
                </Text>
              </Text>
            </Box>
          </Grid.Col>

          {/* Férias e licenças */}
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
              valueFormat="DD/MM/YYYY" // ← Mantine converte Date para string aqui
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
              valueFormat="DD/MM/YYYY" // Mantine converte Date para string
              styles={{
                calendarHeaderControl: {
                  width: 28, // ← largura das setas
                  height: 28, // ← altura das setas
                  borderRadius: "50%",
                  fontSize: "0.8rem", // ← ícones menores
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
