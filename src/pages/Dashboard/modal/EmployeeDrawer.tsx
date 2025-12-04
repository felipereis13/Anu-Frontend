/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  TextInput,
  Select,
  Button,
  Group,
  Divider,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"
import "@mantine/dates/styles.css"

interface EmpresaDrawerProps {
  opened: boolean
  onClose: () => void
}

export default function EmpresaDrawer({ opened, onClose }: EmpresaDrawerProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    areaAtuacao: "",
    segmento: "",
    cnpj: "",
    responsavel: "",
    inicioContrato: null as Date | null,
  })

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    console.log("✅ Dados da empresa:", form)
    onClose()
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="lg"
      overlayProps={{ backgroundOpacity: 0.3, blur: 3 }}
      title="Cadastro de Empresa"
      padding="xl"
    >
      <TextInput
        label="Nome da empresa"
        placeholder="Ex.: TechCorp LTDA"
        value={form.nome}
        onChange={(e) => handleChange("nome", e.currentTarget.value)}
        required
      />

      <TextInput
        mt="md"
        label="E-mail de contato"
        placeholder="contato@empresa.com"
        value={form.email}
        onChange={(e) => handleChange("email", e.currentTarget.value)}
      />

      <TextInput
        mt="md"
        label="Área de atuação"
        placeholder="Ex.: Tecnologia da Informação"
        value={form.areaAtuacao}
        onChange={(e) => handleChange("areaAtuacao", e.currentTarget.value)}
      />

      <Select
        mt="md"
        label="Segmento"
        placeholder="Selecione"
        data={["Tecnologia", "Serviços", "Indústria", "Comércio"]}
        value={form.segmento}
        onChange={(val) => handleChange("segmento", val)}
      />

      <TextInput
        mt="md"
        label="CNPJ"
        placeholder="00.000.000/0001-00"
        value={form.cnpj}
        onChange={(e) => handleChange("cnpj", e.currentTarget.value)}
      />

      <TextInput
        mt="md"
        label="Responsável na empresa"
        placeholder="Nome da pessoa de contato"
        value={form.responsavel}
        onChange={(e) => handleChange("responsavel", e.currentTarget.value)}
      />

      <Divider my="lg" label="Dados do contrato" labelPosition="center" />

      <DatePickerInput
        label="Início do contrato"
        placeholder="Selecione a data de início"
        value={form.inicioContrato}
        onChange={(date) => handleChange("inicioContrato", date)}
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