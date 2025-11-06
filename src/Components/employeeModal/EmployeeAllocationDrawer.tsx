import {
  Drawer,
  Button,
  Group,
  Select,
  NumberInput,
  Divider,
  Stack,
  Text,
  ActionIcon,
  Tooltip,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import "@mantine/dates/styles.css"

interface Empresa {
  value: string
  label: string
}

interface Alocacao {
  empresa: string
  dataInicioAlocacao: Date | null
  dataFimAlocacao: Date | null
  cargaHorariaSemanal: number | ""
}

interface EmployeeAllocationDrawerProps {
  opened: boolean
  onClose: () => void
  empresasDisponiveis: Empresa[]
  onSubmit: (alocacoes: Alocacao[]) => void // ✅ NOVO
}


export default function EmployeeAllocationDrawer({
  opened,
  onClose,
  empresasDisponiveis,
}: EmployeeAllocationDrawerProps) {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([])

  const adicionarAlocacao = () => {
    setAlocacoes([
      ...alocacoes,
      { empresa: "", dataInicioAlocacao: null, dataFimAlocacao: null, cargaHorariaSemanal: "" },
    ])
  }

  const removerAlocacao = (index: number) => {
    setAlocacoes(alocacoes.filter((_, i) => i !== index))
  }

  const atualizarCampo = (index: number, campo: keyof Alocacao, valor: any) => {
    const novaLista = [...alocacoes]
    novaLista[index][campo] = valor
    setAlocacoes(novaLista)
  }

  const handleSubmit = () => {
    console.log("📦 Alocações registradas:", alocacoes)
    onClose()
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="lg"
      overlayProps={{ backgroundOpacity: 0.3, blur: 3 }}
      title="Alocação de Funcionário em Empresas"
      padding="xl"
    >
      <Stack>
        <Text c="dimmed" size="sm">
          Selecione as empresas e defina os períodos de alocação
        </Text>

        <Divider my="sm" />

        {alocacoes.map((item, index) => (
          <Stack
            key={index}
            p="md"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Group justify="space-between" align="center">
              <Text fw={600}>Alocação {index + 1}</Text>
              <Tooltip label="Remover alocação">
                <ActionIcon color="red" onClick={() => removerAlocacao(index)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Select
              label="Empresa"
              placeholder="Selecione uma empresa"
              data={empresasDisponiveis}
              value={item.empresa}
              onChange={(val) => atualizarCampo(index, "empresa", val)}
              required
            />

            <Group grow>
              <DatePickerInput
                label="Data de início"
                placeholder="Selecione"
                value={item.dataInicioAlocacao}
                onChange={(val) => atualizarCampo(index, "dataInicioAlocacao", val)}
                required
                valueFormat="DD/MM/YYYY"
              />

              <DatePickerInput
                label="Data de fim"
                placeholder="Opcional"
                value={item.dataFimAlocacao}
                onChange={(val) => atualizarCampo(index, "dataFimAlocacao", val)}
                valueFormat="DD/MM/YYYY"
              />
            </Group>

            <NumberInput
              label="Carga horária semanal (h)"
              placeholder="Ex.: 20"
              min={1}
              max={44}
              value={item.cargaHorariaSemanal}
              onChange={(val) =>
                atualizarCampo(index, "cargaHorariaSemanal", val)
              }
            />
          </Stack>
        ))}

        <Button
          leftSection={<IconPlus size={18} />}
          variant="light"
          onClick={adicionarAlocacao}
        >
          Adicionar nova alocação
        </Button>

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="teal" onClick={handleSubmit}>
            Salvar Alocações
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
