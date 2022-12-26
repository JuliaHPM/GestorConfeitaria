import { dateFormatter } from '../../utils/formatter';
import { ImageTable } from '../ImageTable';
import TabelaCadastros from '../TabelaCadastros'

export default function Clientes({ clientes }) {

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
                <ImageTable src={row.fotoPerfil} alt={row.nome} />
            )

        },
        { field: 'nome', headerName: 'Nome', width: 190, flex: 1 },
        { field: 'telefone', headerName: 'Telefone', width: 190 },
        {
            field: 'createdAt',
            headerName: 'Data criação',
            //type: 'date',
            minWidth: 130,
            valueGetter: (params) =>
                `${dateFormatter.format(new Date(params.row.createdAt))}`
        },
        // {
        //     field: 'updatedAt',
        //     headerName: 'Data atualização',
        //     type: 'date',
        //     minWidth: 130,
        //     valueGetter: (params) =>
        //         `${dateFormatter.format(new Date(params.row.updatedAt))}`
        // },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Ações',
        //     minWidth: 110,
        //     cellClassName: 'actions',
        //     getActions: ({ row, id }) => {
        //         return [
        //             <Tooltip title='Editar' key={1}>
        //                 <ActionButton onClick={() => setCategoria(row)}>
        //                     <EditIcon />
        //                 </ActionButton>
        //             </Tooltip>,
        //             <Tooltip title='Excluir' key={2}>
        //                 <ActionButton onClick={() => { mostrarModalExcluir(id) }}>
        //                     <DeleteIcon />
        //                 </ActionButton>
        //             </Tooltip>
        //         ];
        //     },
        // },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
                <TabelaCadastros rows={clientes ? clientes : []} columns={columns} width='100%' height={420} />
            </div>
        </div>
    )
}