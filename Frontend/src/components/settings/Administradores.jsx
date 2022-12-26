import { Col, Row, Spinner } from "react-bootstrap";
import { useAdmins } from "../../hooks/useAdmins"
import { Avatar, Divider, Tooltip } from "@mui/material";
import { ActionButton, ColorButton, InputForm, InputLabel, spanButton } from "../../styles/components/FormComponents";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "../../styles/components/PrimaryButton";
import AddIcon from '@mui/icons-material/Add';
import { Fragment, useState } from "react";
import userService from "../../services/user.service";
import { toast } from "react-toastify";
import { AdmContainer } from "../../styles/pages/Admin/settings";
import { queryClient } from "../../lib/queryClient";
import MeuModal from "../../components/Modal";


export function Administradores() {

    const { data: administradores, isLoading } = useAdmins();

    const [email, setEmail] = useState('');
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [adminToRemove, setAdminToRemove] = useState('');

    const handleCloseModalExcluir = () => setShowModalExcluir(false);
    const handleShowModalExcluir = () => setShowModalExcluir(true);

    function mostrarModalExcluir(email) {
        handleShowModalExcluir();
        setAdminToRemove(email);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const submit = async () => {
            return await userService.addAdmin(email);
        }
        const res = submit();

        toast.promise(
            res,
            {
                pending: 'Enviando ...',
                success: {
                    render({ data }) {
                        return data.data.message;
                    }
                },
                error: {
                    render({ data }) {
                        if (data.response) {

                            return `${data.response.data.message}`
                        } else {
                            return 'Ocorreu um erro!'
                        }
                    }
                }
            }
        )
        res.then(() => {
            queryClient.invalidateQueries('administradores');
            setEmail('');
        }).catch(() => { })

    }

    function handleRemove() {
        const submit = async () => {
            return await userService.removeAdmin(adminToRemove);
        }
        const res = submit();
        toast.promise(
            res,
            {
                pending: 'Removendo administrador ...',
                success: {
                    render({ data }) {
                        return `${data.data.message}`
                    }
                },
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then(() => {
            queryClient.invalidateQueries('administradores');//invalidar o query 'ingredientes' para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    const disabled = email === '';

    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}
            >

                <Col lg={7}>
                    <InputForm color={'normal'} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
                <Col>
                    <div style={{ margin: '0 1rem' }}>
                        <Tooltip title='Adionar como administrador'>
                            <span>
                                <ColorButton aria-label="Add" type="submit" disabled={disabled}>
                                    <AddIcon />
                                </ColorButton>
                            </span>
                        </Tooltip>
                    </div>
                </Col>


            </form>
            <MeuModal
                show={showModalExcluir}
                handleClose={handleCloseModalExcluir}
                handleOkButtonClick={handleRemove}
                title={"Atenção!"}
                textBtn2={"Remover"}
            >
                <p>Deseja remover administrador?</p>
            </MeuModal>

            <div>
                {isLoading ? <Spinner /> :

                    administradores.map((adm, i) => (
                        <Fragment key={adm.id}>
                            <AdmContainer key={adm.id}>
                                <Col lg={7} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

                                    <Avatar sx={{ bgcolor: "#ffa9e1", boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', width: '50px', height: '50px' }} src={adm.fotoPerfil} />
                                    <label style={{ fontSize: 17, fontWeight: 500 }}>{adm.nome}</label>
                                </Col>
                                <Col lg={1}>
                                    <Tooltip title='Excluir' key={2}>
                                        <ActionButton onClick={() => { mostrarModalExcluir(adm.email) }}>
                                            <DeleteIcon />
                                        </ActionButton>
                                    </Tooltip>
                                </Col>
                            </AdmContainer>
                            {i !== (administradores.length - 1) && <Divider width={'70%'} color='black' />}

                        </Fragment>
                    ))

                }
            </div>
        </>
    )
}