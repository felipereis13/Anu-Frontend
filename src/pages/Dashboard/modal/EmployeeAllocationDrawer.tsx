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
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface Empresa {
  value: string;
  label: string;
}

interface Alocacao {
  empresa: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  cargaHorariaSemanal: number | "";
}

interface Periodo {
  dataInicio: Date | null;
  dataFim: Date | null;
}

// O que o drawer devolve para o pai
interface EmployeeAllocationResult {
  alocacoes: Alocacao[];
  ferias: Periodo[];
  licencasMedicas: Periodo[];
}

interface EmployeeAllocationDrawerProps {
  opened: boolean;
  onClose: () => void;
  empresasDisponiveis: Empresa[];
  onSubmit: (data: EmployeeAllocationResult) => void;
}

export default function EmployeeAllocationDrawer({
  opened,
  onClose,
  empresasDisponiveis,
  onSubmit,
}: EmployeeAllocationDrawerProps) {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);

  // Férias e licenças médicas como arrays
  const [ferias, setFerias] = useState<Periodo[]>([
    { dataInicio: null, dataFim: null },
  ]);

  const [licencasMedicas, setLicencasMedicas] = useState<Periodo[]>([
    { dataInicio: null, dataFim: null },
  ]);

  // ----- Alocações -----
  const adicionarAlocacao = () => {
    setAlocacoes((prev) => [
      ...prev,
      {
        empresa: "",
        dataInicio: null,
        dataFim: null,
        cargaHorariaSemanal: "",
      },
    ]);
  };

  const removerAlocacao = (index: number) => {
    setAlocacoes((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarCampoAlocacao = (
    index: number,
    campo: keyof Alocacao,
    valor: any
  ) => {
    const novaLista = [...alocacoes];
    novaLista[index][campo] = valor;
    setAlocacoes(novaLista);
  };

  // ----- Férias -----
  const adicionarFerias = () => {
    setFerias((prev) => [...prev, { dataInicio: null, dataFim: null }]);
  };

  const removerFerias = (index: number) => {
    setFerias((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarCampoFerias = (
    index: number,
    campo: keyof Periodo,
    valor: any
  ) => {
    const novaLista = [...ferias];
    novaLista[index][campo] = valor;
    setFerias(novaLista);
  };

  // ----- Licenças Médicas -----
  const adicionarLicenca = () => {
    setLicencasMedicas((prev) => [
      ...prev,
      { dataInicio: null, dataFim: null },
    ]);
  };

  const removerLicenca = (index: number) => {
    setLicencasMedicas((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarCampoLicenca = (
    index: number,
    campo: keyof Periodo,
    valor: any
  ) => {
    const novaLista = [...licencasMedicas];
    novaLista[index][campo] = valor;
    setLicencasMedicas(novaLista);
  };

  const handleSubmit = () => {
    const payload: EmployeeAllocationResult = {
      alocacoes,
      ferias,
      licencasMedicas,
    };

    console.log("📦 Dados do drawer:", payload);
    onSubmit(payload); // aqui o pai pode preencher automaticamente o cadastro
    onClose();
  };

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
          Selecione as empresas, defina os períodos de alocação, férias e
          licenças médicas.
        </Text>

        <Divider my="sm" label="Alocações" labelPosition="center" />

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
              onChange={(val) => atualizarCampoAlocacao(index, "empresa", val)}
              required
            />

            <Group grow>
              <DatePickerInput
                label="Data de início"
                placeholder="Selecione"
                value={item.dataInicio}
                onChange={(val) =>
                  atualizarCampoAlocacao(index, "dataInicio", val)
                }
                required
                valueFormat="DD/MM/YYYY"
              />

              <DatePickerInput
                label="Data de fim"
                placeholder="Opcional"
                value={item.dataFim}
                onChange={(val) =>
                  atualizarCampoAlocacao(index, "dataFim", val)
                }
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
                atualizarCampoAlocacao(index, "cargaHorariaSemanal", val)
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

        {/* FÉRIAS */}
        <Divider my="sm" label="Férias" labelPosition="center" />

        {ferias.map((item, index) => (
          <Stack
            key={index}
            p="md"
            style={{
              border: "1px dashed #e0e0e0",
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          >
            <Group justify="space-between" align="center">
              <Text fw={500}>Período de férias {index + 1}</Text>
              {ferias.length > 1 && (
                <Tooltip label="Remover período de férias">
                  <ActionIcon color="red" onClick={() => removerFerias(index)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>

            <Group grow>
              <DatePickerInput
                label="Início das férias"
                placeholder="Selecione"
                value={item.dataInicio}
                onChange={(val) =>
                  atualizarCampoFerias(index, "dataInicio", val)
                }
                valueFormat="DD/MM/YYYY"
              />

              <DatePickerInput
                label="Fim das férias"
                placeholder="Selecione"
                value={item.dataFim}
                onChange={(val) => atualizarCampoFerias(index, "dataFim", val)}
                valueFormat="DD/MM/YYYY"
              />
            </Group>
          </Stack>
        ))}

        <Button
          leftSection={<IconPlus size={18} />}
          variant="subtle"
          onClick={adicionarFerias}
        >
          Adicionar outro período de férias
        </Button>

        {/* LICENÇA MÉDICA */}
        <Divider my="sm" label="Licença médica" labelPosition="center" />

        {licencasMedicas.map((item, index) => (
          <Stack
            key={index}
            p="md"
            style={{
              border: "1px dashed #e0e0e0",
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          >
            <Group justify="space-between" align="center">
              <Text fw={500}>Licença {index + 1}</Text>
              {licencasMedicas.length > 1 && (
                <Tooltip label="Remover licença">
                  <ActionIcon
                    color="red"
                    onClick={() => removerLicenca(index)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>

            <Group grow>
              <DatePickerInput
                label="Início da licença"
                placeholder="Selecione"
                value={item.dataInicio}
                onChange={(val) =>
                  atualizarCampoLicenca(index, "dataInicio", val)
                }
                valueFormat="DD/MM/YYYY"
              />

              <DatePickerInput
                label="Fim da licença"
                placeholder="Selecione"
                value={item.dataFim}
                onChange={(val) =>
                  atualizarCampoLicenca(index, "dataFim", val)
                }
                valueFormat="DD/MM/YYYY"
              />
            </Group>
          </Stack>
        ))}

        <Button
          leftSection={<IconPlus size={18} />}
          variant="subtle"
          onClick={adicionarLicenca}
        >
          Adicionar outra licença médica
        </Button>

        {/* AÇÕES FINAIS */}
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
  );
}