import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TabelaCadastros from "../../components/TabelaCadastros"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MeuModal from "../../components/Modal";
import { Title } from "../../components/Title";
import Link from "next/link";
import { ActionButton, ColorButton, IconAdd } from "../../styles/pages/Admin/IngredientesCadastrados";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import { useDoces } from '../../hooks/useDoces';
import { queryClient } from '../../lib/queryClient'
import doceService from '../../services/doce.service';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { ImageTable } from "../../components/ImageTable";
import { priceFormatter } from "../../utils/formatter";

export default function DocesCadastrados() {

    const { data, isLoading, error, isFetching } = useDoces();
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
            return doceService.delete(itemSelecionado);
        }

        const res = submit();

        toast.promise(
            res,
            {
                pending: 'Excluindo ...',
                success: 'Doce excluído!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then((res) => {
            queryClient.invalidateQueries('doces');//invalidar o query 'doces' para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            align: 'center',
            // headerAlign:'center',
            field: 'imagemDoce',
            headerName: 'Imagem',
            minWidth: 40,
            sortable: false,
            renderCell: ({ row }) => (
                <ImageTable src={row.imagemDoce} alt={row.imagemDoce} />
            )

        },
        { field: 'nomeDoce', headerName: 'Nome', minWidth: 220, flex: 1 },
        {
            field: 'peso', headerName: 'Peso', width: 70,
            valueGetter: (params) =>
                // params.row.peso.toString().length > 3 ? `${params.row.peso}` : "Não"
                `${params.row.peso} g`,
        },
        {
            field: 'disponivel',
            headerName: 'Disponível',
            width: 90,
            sortable: false,
            type: 'boolean'
            // valueGetter: (params) =>
            //     params.row.disponivel ? "Sim" : "Não"
            // `${params.row.disponivel}`,
        },
        {
            field: 'valorTotalComMargem',
            headerName: 'Valor venda',
            // type: 'number',
            width: 90,
            valueGetter: (params) =>
                `${priceFormatter.format(params.row.valorTotalComMargem)}`,
        },
        {
            field: 'receitas',
            headerName: 'Receitas',
            width: 290,
            // valueGetter: (params) =>
            //     `${params.row.ingredientes}`,
        },
        // {
        //     field: 'createdAt',
        //     headerName: 'Data criação',
        //     //type: 'date',
        //     width: 130,
        // },
        {
            field: 'updatedAt',
            headerName: 'Data atualização',
            type: 'date',
            width: 130,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 110,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <Link href={'/Admin/Form/Doce?id=' + id} prefetch={false} key={1}>
                        <Tooltip title='Editar'>
                            <ActionButton>
                                <EditIcon />
                            </ActionButton>
                        </Tooltip>
                    </Link>,
                    <Tooltip title='Excluir' key={2}>
                        <ActionButton onClick={() => { mostrarModalExcluir(id) }} >
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
                <p>Deseja excluir o doce?</p>
            </MeuModal>

            <Title title={'Doces Cadastrados'} />

            <IconAdd>
                <Link href={"/Admin/Form/Doce"} prefetch={false}>
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
