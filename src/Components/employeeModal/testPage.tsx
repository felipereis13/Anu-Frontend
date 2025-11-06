import React from "react"
import { Button, Container, Title, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import EmployeeModal from "./EmployeeModal"
import EmployeeDrawer from "./EmployeeDrawer"

export default function TestPage() {
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false)
  const [lastData, setLastData] = React.useState<any | null>(null)

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md">
        Cadastro de Funcionários
      </Title>

      <Group mb="lg">
        <Button color="teal" onClick={openDrawer}>
          Novo Funcionário
        </Button>
        <Button onClick={openModal}>Cadastrar Funcionário</Button>
      </Group>

      {/* Drawer lateral */}
      <EmployeeDrawer opened={openedDrawer} onClose={closeDrawer} />

      {/* Modal central */}
      <EmployeeModal
        opened={openedModal}
        onClose={closeModal}
        onSubmit={(values) => {
          console.log("✅ Dados recebidos:", values)
          setLastData(values)
        }}
      />

      {lastData ? (
        <>
          <Text fw={600} mb="xs">
            Último cadastro enviado:
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
        <Text c="dimmed">Nenhum cadastro enviado ainda.</Text>
      )}
    </Container>
  )
}
