import { useState } from "react";
import { Title } from "../../components/Title";
import { Container, Menu, MenuItem, MenuTitle } from "../../styles/pages/Admin/settings";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { setupAPIClient } from "../../lib/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Administradores } from "../../components/settings/Administradores";
import { Frete } from "../../components/settings/Frete";
import CadastroHora from "../../components/settings/Hora";
import Clientes from "../../components/settings/Clientes";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

export default function Settings({ settings, horas, clientes }) {
    const [screen, setScreen] = useState('frete')

    function SettingSelected({ selected }) {
        switch (selected) {
            case 'frete':
                return (
                    <Frete valorKm={settings.valorKm} enderecoOrigem={settings.enderecoOrigem} taxaEntrega={settings.taxaEntrega} />
                )
                break;
            case 'administradores':
                return (
                    <Administradores />
                )
                break;
            case 'valorHora':
                return (
                    <>
                        <CadastroHora hora={horas} />
                    </>
                )
                break;
            case 'clientes':
                return (
                    <>
                        <Clientes clientes={clientes} />
                    </>
                )
                break;

            default:
                return null;
                break;
        }


    }

    return (
        <>
            {/* <Title title={'Configurações'} /> */}
            <Container>
                <Menu>
                    <MenuTitle>CONFIGURAÇÕES</MenuTitle>
                    <MenuItem
                        onClick={() => setScreen('frete')}
                        selected={screen === 'frete'}>
                        <DeliveryDiningIcon />Frete
                    </MenuItem>

                    <MenuItem
                        onClick={() => setScreen('valorHora')}
                        selected={screen === 'valorHora'}>
                        <AccessTimeIcon />Valor Hora
                    </MenuItem>

                    <MenuItem
                        onClick={() => setScreen('administradores')}
                        selected={screen === 'administradores'}>
                        <AdminPanelSettingsIcon />Administradores
                    </MenuItem>

                    <MenuItem
                        onClick={() => setScreen('clientes')}
                        selected={screen === 'clientes'}>
                        <PeopleAltOutlinedIcon />Clientes
                    </MenuItem>
                </Menu>

                <main style={{ padding: 32 }}>
                    <SettingSelected selected={screen} />
                </main>

            </Container>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx);
    const settings = await api.get('/settings/1').then(res => {
        return res.data;
    })

    const clientes = (await api.get('/clientes')).data;

    const horas = (await api.get(`/valorHora/1`)).data;

    return {
        props: {
            settings,
            horas,
            clientes
        }
    }
}, {
    admin: true,
})