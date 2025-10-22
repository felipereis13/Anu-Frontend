import React from "react"
import { Button, Container, Title, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import EmployeeModal from "./EmployeeModal"

export default function TestPage() {
  const [opened, { open, close }] = useDisclosure(false)
  const [lastData, setLastData] = React.useState<any | null>(null)

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md">
        Cadastro de Funcionários
      </Title>

      <Group mb="lg">
        <Button color="teal" onClick={open}>
          Novo Funcionário
        </Button>
      </Group>

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

      <EmployeeModal
        opened={opened}
        onClose={close}
        onSubmit={(values) => {
          console.log("✅ Dados recebidos:", values)
          setLastData(values)
        }}
      />
    </Container>
  )
}
