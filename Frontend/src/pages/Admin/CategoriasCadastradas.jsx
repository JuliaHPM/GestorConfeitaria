import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TabelaCadastros from "../../components/TabelaCadastros"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MeuModal from "../../components/Modal";
import categoriaService from "../../services/categoria.service";
import { Title } from "../../components/Title";
import { ActionButton, ColorButton, IconAdd } from "../../styles/pages/Admin/IngredientesCadastrados";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import { useCategorias } from '../../hooks/useCategorias';
import { queryClient } from '../../lib/queryClient'
import FormCategoria from '../../components/FormCategoria';
import { ImageTable } from '../../components/ImageTable';
import { withSSRAuth } from '../../utils/withSSRAuth';


export default function CategoriasCadastradas() {

    const { data, isLoading, error, isFetching } = useCategorias();
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState();

    const [categoria, setCategoria] = useState();

    const handleCloseModalExcluir = () => setShowModalExcluir(false);

    const handleShowModalExcluir = () => setShowModalExcluir(true);

    function mostrarModalExcluir(id) {
        handleShowModalExcluir();
        setItemSelecionado(id);
    }

    function excluir() {
        const submit = async () => {
            return await categoriaService.delete(itemSelecionado);
        }
        const res = submit();
        toast.promise(
            res,
            {
                pending: 'Deletando ...',
                success: 'Categoria excluída!',
                error: {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then(() => {
            queryClient.invalidateQueries('categorias');//invalidar o query 'ingredientes' para atualizar a tabela
        }).catch(() => { })
        handleCloseModalExcluir();
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            align: 'center',
            // headerAlign:'center',
            field: 'imagemCategoria',
            headerName: 'Imagem',
            minWidth: 45,
            sortable: false,
            renderCell: ({ row }) => (
                <ImageTable src={row.imagemCategoria} alt={row.nomeCategoria} />
            )

        },
        { field: 'nomeCategoria', headerName: 'Nome', width: 190, flex: 1 },
        {
            field: 'createdAt',
            headerName: 'Data criação',
            //type: 'date',
            minWidth: 130,
            // valueGetter: (params) =>
            //     `${dateFormatter.format(new Date(params.row.createdAt))}`
        },
        {
            field: 'updatedAt',
            headerName: 'Data atualização',
            type: 'date',
            minWidth: 130,
            // valueGetter: (params) =>
            //     `${dateFormatter.format(new Date(params.row.updatedAt))}`
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            minWidth: 110,
            cellClassName: 'actions',
            getActions: ({ row, id }) => {
                return [
                    <Tooltip title='Editar' key={1}>
                        <ActionButton onClick={() => setCategoria(row)}>
                            <EditIcon />
                        </ActionButton>
                    </Tooltip>,
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
                <p>Deseja excluir a categoria?</p>
            </MeuModal>

            <Title title={'Categorias Doce'} />

            <FormCategoria categoria={categoria} setCategoria={setCategoria} />

            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
                    <TabelaCadastros rows={data ? data : []} columns={columns} width='58%' height={420} loading={isLoading} />
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
