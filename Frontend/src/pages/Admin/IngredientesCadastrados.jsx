// import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TabelaCadastros from "../../components/TabelaCadastros"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MeuModal from "../../components/Modal";
import ingredienteService from "../../services/ingrediente.service";
import { Title } from "../../components/Title";
import Link from "next/link";
import { ActionButton, ColorButton, IconAdd } from "../../styles/pages/Admin/IngredientesCadastrados";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import { useIngredientes } from '../../hooks/useIngredientes';
import { queryClient } from '../../lib/queryClient'
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function IngredientesCadastrados() {

    const { data, isLoading, error, isFetching } = useIngredientes();
    // console.log(data)
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState();

    const handleCloseModalExcluir = () => setShowModalExcluir(false);

    const handleShowModalExcluir = () => setShowModalExcluir(true);

    function mostrarModalExcluir(id) {
        handleShowModalExcluir();
        setItemSelecionado(id);
    }

    function excluir() {
        const submit = () => {
            return ingredienteService.delete(itemSelecionado);
        }

        const res = submit();

        toast.promise(
            res,
            {
                pending: 'Excluindo ...',
                success: 'Ingrediente excluído!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then((res) => {
            queryClient.invalidateQueries('ingredientes');//invalidar o query 'ingredientes' para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', minWidth: 190, flex: 1 },
        { field: 'marca', headerName: 'Marca', width: 130 },
        {
            field: 'quantEmb',
            headerName: 'Quant. embalagem',
            width: 140,
            sortable: false,
            // valueGetter: (params) =>
            //     `${params.row.quantEmb || ''} ${params.row.unidadeDeMedida || ''}`,
        },
        {
            field: 'precoUnit',
            headerName: 'Preço Unit.',
            // type: 'number',
            width: 100,
            // valueGetter: (params) =>
            //     `${priceFormatter.format(params.row.precoUnit)}`
        },
        {
            field: 'precoKg',
            headerName: 'Preço Kg',
            // type: 'number',
            width: 100,
            // valueGetter: (params) =>
            //     `${priceFormatter.format(params.row.precoKg)}`
        },
        {
            field: 'createdAt',
            headerName: 'Data criação',
            //type: 'date',
            width: 130,
            // valueGetter: (params) =>
            //     `${dateFormatter.format(new Date(params.row.createdAt))}`
        },
        {
            field: 'updatedAt',
            headerName: 'Data atualização',
            type: 'date',
            width: 130,
            // valueGetter: (params) =>
            //     `${dateFormatter.format(new Date(params.row.updatedAt))}`
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 110,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <Link href={'/Admin/Form/Ingrediente?id=' + id} prefetch={false} key={1}>
                        <Tooltip title='Editar'>
                            <ActionButton>
                                <EditIcon />
                            </ActionButton>
                        </Tooltip>
                    </Link>,
                    <Tooltip title='Excluir' key={2}>
                        <ActionButton onClick={() => { mostrarModalExcluir(id) }}>
                            <DeleteIcon />
                        </ActionButton>
                    </Tooltip>
                ];
            },
        },
    ];

    return (
        <Container >
            <MeuModal
                show={showModalExcluir}
                handleClose={handleCloseModalExcluir}
                handleOkButtonClick={excluir}
                title={"Atenção!"}
                textBtn2={"Excluir"}
            >
                <p>Deseja excluir o item?</p>
            </MeuModal>

            <Title title={'Ingredientes Cadastrados'} />

            <IconAdd>
                <Link href={"/Admin/Form/Ingrediente"} prefetch={false}>
                    <Tooltip title='Adicionar'>
                        <ColorButton aria-label="Add">
                            <AddIcon />
                        </ColorButton>
                    </Tooltip>
                </Link>
            </IconAdd>


            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TabelaCadastros rows={data ? data : []} columns={columns} width='85%' loading={isLoading} />
                </div>

            </div>

        </Container >
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {}
    }
}, {
    admin: true,
})
