import { Chip, Divider, Tooltip, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ContainerItens, StyledCard } from "../styles/components/CardPedidoAdm";
import { priceFormatter } from '../utils/formatter'
import { EnderecoEntrega } from "./EnderecoEntrega";
import PlaceIcon from '@mui/icons-material/Place';
import ReactSelect from "react-select";
import { useState } from "react";
import { InputLabel, StyledSwitch } from "../styles/components/FormComponents";
import Checkbox from "./CheckBox";
import pedidoService from "../services/pedido.service";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { queryClient } from "../lib/queryClient";
import { ActionButton, ColorButton } from '../styles/components/CardPedidoAdm';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function CardPedidoAdm({ pedido }) {
    const StatusOptions = [
        { value: 'pendente', label: "Pendente" },
        { value: 'confirmado', label: "Confirmado" },
        { value: 'finalizado', label: "Finalizado" },
        { value: 'cancelado', label: "Cancelado" },
    ]

    const [status, setStatus] = useState(pedido.status ? StatusOptions.find(a => a.value === pedido.status) : null)
    const [pago, setPago] = useState(pedido.pago)
    const [loading, setLoading] = useState(false)

    async function handleStatusChange(status) {
        setStatus(status);
        try {
            setLoading(true);
            await pedidoService.updateStatus(pedido.id, { status })
            queryClient.invalidateQueries('pedidos')
        } catch (err) {
            if (!!err.data?.message) {
                toast.error(err.data.message);
            } else {
                toast.error('Erro!');
            }
            console.log(err)

        } finally {
            setLoading(false)
        }
    }

    async function handlePagoChange(checked) {
        console.log()
        setPago(checked)
        try {
            setLoading(true);
            await pedidoService.updatePagamento(pedido.id, { pago: checked })
            queryClient.invalidateQueries('pedidos')
        } catch (err) {
            if (!!err.data?.message) {
                toast.error(err.data.message);
            } else {
                toast.error('Erro ao alterar status de pagamento!');
            }
            console.log(err)

        } finally {
            setLoading(false)
        }
    }

    function callWhats(telefone) {
        const tel = telefone.replace(/\D/g, '');

        window.open(
            `https://wa.me/${tel}`,
            '_blank');
    }

    return (
        <StyledCard borderColor={pedido.status}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Typography style={{ fontSize: 20 }}>Pedido {pedido.id}</Typography>
                    <Typography style={{ fontSize: 20 }}>-</Typography>
                    <Tooltip title={pedido.cliente.nome}>
                        <Typography style={{ fontSize: 18, overflow: 'hidden', textOverflow: 'ellipsis', width: 170, whiteSpace: 'nowrap' }}>
                            {pedido.cliente.nome}
                        </Typography>
                    </Tooltip>
                    {loading && <Spinner size={14} />}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                    {pedido.tipoEntrega === 'delivery' ?
                        <Chip label={`Entrega em ${pedido.dataEntrega}`} variant="outlined" color="warning" sx={{ fontSize: 15 }} />
                        :
                        <Chip label={`Retirada em ${pedido.dataEntrega}`} variant="outlined" color="success" sx={{ fontSize: 15 }} />
                    }

                    {pedido.cliente.telefone &&
                        <ActionButton>
                            <Tooltip title='Conversar pelo WhatsApp'>
                                <ColorButton aria-label="WhatsApp" type="button" onClick={() => callWhats(pedido.cliente.telefone)}>
                                    <WhatsAppIcon />
                                </ColorButton>
                            </Tooltip>
                        </ActionButton>
                    }
                </div>

            </div>
            <Divider color="gray" style={{ margin: '0.6rem 0' }} />
            <ContainerItens>
                {pedido.itensPedido.map(item => (
                    <Row key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Col sm={8} md={7} lg={8}> <Typography variant="subtitle2">{item.quantidade}x {item.doce.nomeDoce}</Typography></Col>
                        <Col sm={2} md={2} lg={2}><Typography variant="subtitle2"> {priceFormatter.format(item.valorTotal)}</Typography></Col>
                    </Row>

                ))}
            </ContainerItens>
            <Divider color="gray" style={{ margin: '0.6rem 0' }} />
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div>
                        {pedido.tipoEntrega === 'delivery' &&
                            <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Col sm={8} md={7} lg={8}>  <Typography style={{ color: 'gray' }}>Taxa de entrega</Typography></Col>
                                <Col sm={2} md={2} lg={2}><Typography style={{ color: 'gray' }}>{pedido.valorEntrega}</Typography></Col>
                            </Row>
                        }
                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Col sm={8} md={7} lg={8}>  <Typography style={{ fontWeight: 'bold' }}>Total</Typography></Col>
                            <Col sm={2} md={2} lg={2}><Typography style={{ fontWeight: 'bold' }}> {pedido.total}</Typography></Col>
                        </Row>
                    </div>

                    <Divider color="gray" style={{ margin: '0.6rem 0' }} />

                    <div>
                        {/* <Typography sx={{ fontSize: 15 }}>Endereço entrega:</Typography> */}
                        {pedido.endereco &&
                            <>
                                {/* <Tooltip title={pedido.endereco.pontoReferencia ? pedido.endereco.pontoReferencia : ''}> */}
                                <Row style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Col sm={2} md={3} lg={3} >

                                        <Typography style={{ fontWeight: 'normal' }}>Endereço</Typography>
                                    </Col>
                                    <Col sm={8} md={8} lg={9} style={{ display: 'flex', justifyContent: 'end' }}>
                                        <PlaceIcon sx={{ color: '#FF6AB9', marginRight: 0.5 }} />
                                        <div>
                                            <Typography style={{ fontWeight: 'normal', display: "flex", justifyContent: 'end' }}>
                                                {pedido.endereco?.rua} n° {pedido.endereco?.numero}
                                                {pedido.endereco?.complemento && `, ${pedido.endereco?.complemento}`}
                                                {` - ${pedido.endereco?.bairro}`}
                                            </Typography>
                                            <Typography style={{ fontSize: 14, color: '#6d6d6d' }}>{pedido.endereco?.pontoReferencia && `${pedido.endereco?.pontoReferencia}`}</Typography>
                                        </div>
                                    </Col>
                                </Row>
                                {/* </Tooltip> */}
                                <Divider color="gray" style={{ margin: '0.6rem 0' }} />
                            </>
                        }

                        <Row style={{ display: "flex", height: '70px' }}>
                            <Col md={4} lg={4}>
                                <InputLabel color={'normal'}>Status</InputLabel>
                                <ReactSelect
                                    // isDisabled={!!(pedido.status === 'cancelado')}
                                    defaultValue={status}
                                    onChange={(e) => handleStatusChange(e.value)}
                                    instanceId={'status'}
                                    options={StatusOptions}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#fadcec',
                                            primary: '#F7A0CE',
                                        },
                                    })}
                                />
                            </Col>

                            <Col md={3} lg={3} style={{ display: "flex", alignItems: 'start', marginTop: 32 }}>
                                {/* <InputLabel style={{ marginTop: 0, width: '45%' }}>Pago</InputLabel> */}
                                {/* <StyledSwitch
                                    onChange={(e) => setPago(e.target.checked)}
                                    checked={pago}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /> */}
                                <Checkbox
                                    controller={(e) => handlePagoChange(e.target.checked)}
                                    checked={pago}
                                    label='Pago'
                                    disabled={!!(pedido.status === 'cancelado')}
                                />
                            </Col>

                            {pedido.observacao &&

                                <Col md={4} lg={5} style={{ alignItems: 'end', overflow: 'auto' }}>
                                    <InputLabel>Observação</InputLabel>
                                    <Typography style={{ fontSize: 14, lineHeight: 1.2 }}>{pedido.observacao}</Typography>
                                </Col>
                            }
                        </Row>
                    </div>
                </div>
            </div>

        </StyledCard>
    )
}