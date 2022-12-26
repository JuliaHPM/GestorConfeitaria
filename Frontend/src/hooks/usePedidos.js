import { useQuery } from "react-query";
import pedidoService from "../services/pedido.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getPedidos(idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal, campoOrdem, ordem) {

    //setar branco para funcionar no query
    if (!status) { status = '' }
    if (!pago) { pago = '' }
    if (!idPedido) { idPedido = '' }
    if (!nomeCliente) { nomeCliente = '' }
    if (!tipoEntrega) { tipoEntrega = '' }
    if (!dataInicio) { dataInicio = '' }
    if (!dataFinal) { dataFinal = '' }
    if (!campoOrdem) { campoOrdem = 'dataEntrega' }
    if (!ordem) { ordem = 'ASC' }

    const res = await pedidoService.getPedidosFiltered(idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal, campoOrdem, ordem);

    const pedidos = res.data.map(pedido => {
        return {
            ...pedido,
            createdAt: dateFormatter.format(new Date(pedido.createdAt)),
            updatedAt: dateFormatter.format(new Date(pedido.updatedAt)),
            dataEntrega: dateFormatter.format(new Date(pedido.dataEntrega)),
            valorEntrega: priceFormatter.format(pedido.valorEntrega),
            total: priceFormatter.format(pedido.valorFinal),
            subtotal: priceFormatter.format(pedido.valorFinal - pedido.valorEntrega)
            // itensPedido: pedido.itensPedido.map(item => {
            //     return ' ' + item.nome
            // })
        }
    });
    return pedidos;
}

export function usePedidos(idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal, campoOrdem, ordem) {
    return useQuery(['pedidos'], () => getPedidos(idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal, campoOrdem, ordem), {
        staleTime: 1000 * 60 // 1min
    })
}