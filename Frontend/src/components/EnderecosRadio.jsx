import { Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { ContainerEndereco } from "../styles/components/EnderecosRadio";
import Spinner from "./Spinner";
import PlaceIcon from '@mui/icons-material/Place';
import { PinkLink } from "../styles/pages/Carrinho";

export function EnderecosRadio({ enderecos, enderecoSelected, freteLoading = false, handleEnderecoChange }) {
    return (
        <div>
            {enderecos.length > 0 ?
                <>
                    {enderecos && enderecos.map((endereco, index) => (
                        <ContainerEndereco key={index} selected={endereco.id === enderecoSelected} onClick={() => handleEnderecoChange(endereco.id)} >
                            <div>
                                <Typography style={{ fontSize: 17, lineHeight: 1.4 }}>{endereco.nome}</Typography>
                                <Typography style={{ fontSize: 15, color: '#3f3f3f' }}>{endereco.rua}, {endereco.numero} - {endereco.bairro} - {endereco.cidade}</Typography>
                            </div>
                            {(endereco.id === enderecoSelected) && freteLoading && <Spinner size={18} />}
                            {(endereco.id === enderecoSelected) && !freteLoading && <PlaceIcon sx={{ color: '#FF6AB9' }} />}
                        </ContainerEndereco>
                    ))}
                </>

                :
                <div style={{ padding: 10, paddingLeft: 20 }}>
                    <Typography variant="subtitle2">
                        Ops, nenhum endereço de entrega cadastrado!{' '}
                        <PinkLink href="/perfil">Adicionar endereço </PinkLink>
                    </Typography>
                </div>

            }
        </div>
    )
}