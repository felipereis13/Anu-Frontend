// DashboardPage.tsx
import { Nav } from "../../Components/Nav/Nav";
import { HeaderDash } from "./Header/HeaderDash";
import { SideBar } from "./SideBar/SideBar";
import { MainSchedule } from "./Schedule/MainSchedule"; // <<< NOVA IMPORTAÇÃO

export function DashboardPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

            <HeaderDash />

            {/* Contêiner que faz a Nav, SideBar e MainSchedule ficarem lado a lado */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                <Nav />

                {/* Contêiner de Layout (SideBar e Cronograma) */}
                <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                    <SideBar />
                    <MainSchedule /> {/* <<< NOVO COMPONENTE */}
                </div>
            </div>
        </div>
    );
}