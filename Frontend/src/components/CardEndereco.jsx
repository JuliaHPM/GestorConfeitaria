import { Grid, Tooltip, Typography } from "@mui/material";
import { StyledCard, StyledCardContent } from "../styles/components/CardEndereco";
import { ActionButton, ErrorText, InputForm, InputLabel } from "../styles/components/FormComponents";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Col, Row } from "react-bootstrap";
import enderecoService from "../services/endereco.service";
import MeuModal from "./Modal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { queryClient } from '../lib/queryClient';
import PlaceIcon from '@mui/icons-material/Place';
import { useForm } from "react-hook-form";
import ModalEndereco from "./ModalEndereco";

export default function CardEndereço({ endereco, usuarioId }) {

    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);

    const handleCloseModalExcluir = () => setShowModalExcluir(false);

    const handleShowModalExcluir = () => setShowModalExcluir(true);

    function mostrarModalExcluir(id) {
        handleShowModalExcluir();
    }

    const handleCloseModalEditar = () => setShowModalEditar(false);

    const handleShowModalEditar = () => setShowModalEditar(true);

    function mostrarModalEditar(id) {
        handleShowModalEditar();
    }

    function excluir() {
        const submit = () => {
            return enderecoService.delete(1, endereco.id); //idCliente //idEndereco
        }
        const res = submit();
        toast.promise(
            res,
            {
                pending: 'Excluindo ...',
                success: 'Endereco excluído!',
                error: 'Erro ao exluir endereço!'
            }
        )
        res.then((res) => {
            queryClient.invalidateQueries('enderecos');//invalidar o query para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    return (
        <>
            <StyledCard sx={{ marginBottom: '1rem' }}>
                <StyledCardContent>
                    <Row>
                        <Col md={2} lg={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <PlaceIcon sx={{ color: '#FF6AB9', marginRight: 1 }} />
                        </Col>
                        <Col md={8} lg={8}>
                            <Typography sx={{ color: "#424242", fontSize: 18, fontWeight: 300 }} >
                                <b>{endereco.nome ? endereco.nome : endereco.rua}</b>
                            </Typography>
                            <Col>
                                <Typography variant="secondary" sx={{ color: "#424242", fontSize: 15 }}>
                                    Rua {endereco.rua} n° {endereco.numero}
                                    {endereco.complemento && `, ${endereco.complemento}`}
                                    {` - ${endereco.bairro}`}
                                </Typography>
                            </Col>
                            <Col>
                                <Typography variant="secondary" sx={{ color: "#737373", fontSize: 15 }}>
                                    {endereco.pontoReferencia && endereco.pontoReferencia}
                                </Typography>
                            </Col>
                            <Typography sx={{ color: "#424242", fontSize: 15 }}>
                                {endereco.cidade} - {endereco.cep}
                            </Typography>
                        </Col>
                        <Col md={2} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Tooltip title='Editar'>
                                <ActionButton onClick={() => { mostrarModalEditar(endereco.id) }}>
                                    <EditIcon />
                                </ActionButton>
                            </Tooltip>

                            <Tooltip title='Excluir'>
                                <ActionButton onClick={() => { mostrarModalExcluir(endereco.id) }}>
                                    <DeleteIcon />
                                </ActionButton>
                            </Tooltip>
                        </Col>
                    </Row>
                </StyledCardContent>
            </StyledCard>

            <MeuModal
                show={showModalExcluir}
                handleClose={handleCloseModalExcluir}
                handleOkButtonClick={excluir}
                title={"Atenção!"}
                textBtn2={"Excluir"}
            >
                <p>Deseja excluir o endereço?</p>
            </MeuModal>

            <ModalEndereco
                show={showModalEditar}
                handleClose={handleCloseModalEditar}
                endereco={endereco}
                usuarioId={usuarioId}
            />

        </>
    )
}