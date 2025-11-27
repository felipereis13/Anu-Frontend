import {
    Search,
    SkipPrev,
    SkipNext,
    PasteClipboard, // Nota: Verifique se o nome é PasteClipboard ou Clipboard dependendo da versão do iconoir
    ViewGrid
} from 'iconoir-react';
import { Button, ActionIcon, Group, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'; // Importante para abrir/fechar o menu
import classes from './HeaderDash.module.css';
import Anu from '../../../assets/ANU - Apresentação Identidade Visual 2.png';

export function HeaderDash() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const iconColor = '#A39787';

    // Função auxiliar para renderizar os botões (evita repetir código no mobile e desktop)
    const renderControls = (isMobile = false) => (
        <>
            {/* Navegação (Setas) */}
            <Group gap={4} style={isMobile ? { justifyContent: 'center' } : { marginRight: '1rem' }}>
                <ActionIcon variant="transparent" size="lg" aria-label="Anterior">
                    <SkipPrev color={iconColor} strokeWidth={1.5} width={24} />
                </ActionIcon>
                <ActionIcon variant="transparent" size="lg" aria-label="Próximo">
                    <SkipNext color={iconColor} strokeWidth={1.5} width={24} />
                </ActionIcon>
            </Group>

            {/* Botão Filtros */}
            <Button
                variant="default"
                leftSection={<PasteClipboard width={18} color={iconColor} strokeWidth={1.5} />}
                className={classes.customButton}
                fullWidth={isMobile} // No mobile ocupa a largura toda
            >
                Filtros
            </Button>

            {/* Botão Hoje */}
            <Button
                variant="default"
                className={classes.customButton}
                fullWidth={isMobile}
            >
                Hoje
            </Button>

            {/* Botão Semana */}
            <Button
                variant="default"
                leftSection={<ViewGrid width={18} color={iconColor} strokeWidth={1.5} />}
                className={classes.customButton}
                fullWidth={isMobile}
            >
                Semana
            </Button>

            {/* Botão de Busca */}
            <ActionIcon
                variant="default"
                size={isMobile ? "xl" : "input-sm"}
                className={classes.searchButton}
                aria-label="Buscar"
                style={isMobile ? { width: '100%' } : {}} // No mobile vira um botão largo
            >
                <Search width={18} color={iconColor} strokeWidth={1.5} />
            </ActionIcon>
        </>
    );

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                {/* Lado Esquerdo: Logo */}
                <img
                    src={Anu}
                    alt="Logo"
                    width={107}
                    className={classes.logo}
                />

                {/* VISÃO DESKTOP: Controles visíveis apenas em telas 'sm' (small) ou maiores */}
                <Group gap="xs" visibleFrom="sm" className={classes.controls}>
                    {renderControls(false)}
                </Group>

                {/* VISÃO MOBILE: Botão Hamburguer visível apenas telas menores que 'sm' */}
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                    color="#A39787" // Cor do hamburguer combinando com o tema
                />

                {/* O Menu Lateral (Drawer) */}
                <Drawer
                    opened={opened}
                    onClose={close}
                    position="right"
                    title="Menu"
                    padding="md"
                    hiddenFrom="sm"
                    classNames={{ title: classes.drawerTitle }} // Opcional: para estilizar o título "Menu"
                >
                    {/* Stack empilha os itens verticalmente */}
                    <Stack gap="md">
                        {renderControls(true)}
                    </Stack>
                </Drawer>
            </div>
        </header>
    );
}