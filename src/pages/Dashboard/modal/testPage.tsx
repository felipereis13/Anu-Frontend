/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Button, Container, Title, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import EmployeeModal from "./EmployeeModal"
import EmployeeDrawer from "./EmployeeDrawer"
import EmployeeAllocationDrawer from "./EmployeeAllocationDrawer"

export default function TestPage() {
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false)
  const [openedAlloc, { open: openAlloc, close: closeAlloc }] =
    useDisclosure(false)

  const [lastData, setLastData] = React.useState<any | null>(null)
  const [lastAllocations, setLastAllocations] = React.useState<any[] | null>(
    null
  )

  const empresas = [
    { value: "1", label: "TechCorp" },
    { value: "2", label: "AgroDigital" },
    { value: "3", label: "EduSmart" },
  ]

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md">
        Cadastro e Alocação de Funcionários
      </Title>

      {/* Botões de ações principais */}
      <Group mb="lg">
        <Button color="teal" onClick={openDrawer}>
          Novo Funcionário
        </Button>
        <Button onClick={openModal}>Cadastrar Funcionário</Button>
        <Button color="blue" onClick={openAlloc}>
          Gerenciar Alocação
        </Button>
      </Group>

      {/* Drawer lateral para novo funcionário */}
      <EmployeeDrawer opened={openedDrawer} onClose={closeDrawer} />

      {/* Modal de cadastro de funcionário */}
      <EmployeeModal
        opened={openedModal}
        onClose={closeModal}
        onSubmit={(values) => {
          console.log("✅ Dados do funcionário recebidos:", values)
          setLastData(values)
        }}
      />

      {/* Drawer de alocação com retorno de dados */}
      <EmployeeAllocationDrawer
        opened={openedAlloc}
        onClose={closeAlloc}
        empresasDisponiveis={empresas}
        onSubmit={(alocacoes) => {
          console.log("📦 Alocações recebidas:", alocacoes)
          setLastAllocations(alocacoes)
        }}
      />

      {/* Resultados */}
      <Container mt="xl">
        {lastData ? (
          <>
            <Text fw={600} mb="xs">
              Último cadastro de funcionário:
            </Text>
            <pre
              style={{
                background: "#1a1a1a",
                color: "#e1e1e1",
                padding: "1rem",
                borderRadius: "8px",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(lastData, null, 2)}
            </pre>
          </>
        ) : (
          <Text c="dimmed" mb="lg">
            Nenhum cadastro de funcionário enviado ainda.
          </Text>
        )}

        {lastAllocations ? (
          <>
            <Text fw={600} mb="xs" mt="xl">
              Últimas alocações registradas:
            </Text>
            <pre
              style={{
                background: "#1a1a1a",
                color: "#e1e1e1",
                padding: "1rem",
                borderRadius: "8px",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(lastAllocations, null, 2)}
            </pre>
          </>
        ) : (
          <Text c="dimmed">Nenhuma alocação registrada ainda.</Text>
        )}
      </Container>
    </Container>
  )
}