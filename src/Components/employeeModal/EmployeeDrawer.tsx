import {
  Drawer,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Divider,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"

interface EmployeeDrawerProps {
  opened: boolean
  onClose: () => void
}

export default function EmployeeDrawer({
  opened,
  onClose,
}: EmployeeDrawerProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    funcao: "",
    taxaExtra: 0,
    custoPorHora: 0,
    departamento: "",
    tais: "",
    gerenteResponsavel: "",
    mesFerias: null as Date | null,
    licencaInicio: null as Date | null,
    licencaFim: null as Date | null,
  })

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    console.log("✅ Dados do funcionário:", form)
    onClose()
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="lg"
      overlayProps={{ backgroundOpacity: 0.3, blur: 3 }}
      title="Cadastro de Funcionário"
      padding="xl"
    >
      <TextInput
        label="Nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={(e) => handleChange("nome", e.currentTarget.value)}
        required
      />

      <TextInput
        mt="md"
        label="E-mail"
        placeholder="exemplo@empresa.com"
        value={form.email}
        onChange={(e) => handleChange("email", e.currentTarget.value)}
      />

      <TextInput
        mt="md"
        label="Função"
        placeholder="Ex.: Analista de Sistemas"
        value={form.funcao}
        onChange={(e) => handleChange("funcao", e.currentTarget.value)}
      />

      <Group grow mt="md">
        <NumberInput
          label="Taxa extra (%)"
          value={form.taxaExtra}
          onChange={(val) => handleChange("taxaExtra", val)}
        />
        <NumberInput
          label="Custo por hora (R$)"
          value={form.custoPorHora}
          onChange={(val) => handleChange("custoPorHora", val)}
        />
      </Group>

      <Select
        mt="md"
        label="Departamento"
        placeholder="Selecione"
        data={["RH", "Financeiro", "TI", "Operações"]}
        value={form.departamento}
        onChange={(val) => handleChange("departamento", val)}
      />

      <TextInput
        mt="md"
        label="TAI’s"
        placeholder="Insira o(s) TAI(s)"
        value={form.tais}
        onChange={(e) => handleChange("tais", e.currentTarget.value)}
      />

      <TextInput
        mt="md"
        label="Gerente responsável"
        placeholder="Nome do gerente"
        value={form.gerenteResponsavel}
        onChange={(e) =>
          handleChange("gerenteResponsavel", e.currentTarget.value)
        }
      />

      <Divider my="lg" label="Férias e Licenças" labelPosition="center" />

      <DatePickerInput
        label="Mês de férias"
        placeholder="Selecione o mês"
        value={form.mesFerias}
        onChange={(date) => handleChange("mesFerias", date)}
        valueFormat="MM/YYYY"
      />

      <DatePickerInput
        mt="md"
        type="range"
        label="Período de licença"
        placeholder="Início e fim da licença"
        value={[form.licencaInicio, form.licencaFim]}
        onChange={([inicio, fim]) => {
          handleChange("licencaInicio", inicio ?? null)
          handleChange("licencaFim", fim ?? null)
        }}
        valueFormat="DD/MM/YYYY"
      />

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </Group>
    </Drawer>
  )
}
