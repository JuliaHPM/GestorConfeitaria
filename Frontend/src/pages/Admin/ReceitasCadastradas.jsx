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
import { useReceitas } from '../../hooks/useReceitas';
import { queryClient } from '../../lib/queryClient'
import receitaService from '../../services/receita.service';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function ReceitasCadastradas() {

    const { data, isLoading, error, isFetching } = useReceitas();
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
            return receitaService.delete(itemSelecionado);
        }
        const res = submit();
        toast.promise(
            res,
            {
                pending: 'Deletando ...',
                success: 'Receita excluída!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then((res) => {
            // console.log(res);
            queryClient.invalidateQueries('receitas');//invalidar o query 'receitas' para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', minWidth: 150, flex: 1 },
        { field: 'tempoPreparo', headerName: 'Tempo Preparo', width: 130 },
        {
            field: 'rendimento',
            headerName: 'Rendimento',
            width: 100,
            sortable: false,
        },
        {
            field: 'custo',
            headerName: 'Custo',
            // type: 'number',
            width: 90,
        },
        {
            field: 'ingredientes',
            headerName: 'Ingredientes',
            width: 350,
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
                    <Link href={'/Admin/Form/Receita?id=' + id} prefetch={false} key={1}>
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
                <p>Deseja excluir o item?</p>
            </MeuModal>

            <Title title={'Receitas Cadastradas'} />

            <IconAdd>
                <Link href={"/Admin/Form/Receita"} prefetch={false}>
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
