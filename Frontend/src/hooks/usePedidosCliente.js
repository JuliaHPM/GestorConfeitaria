import { useQuery } from "react-query";
import pedidoService from "../services/pedido.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getPedidosCliente(idCliente) {
    const res = await pedidoService.getPedidos(idCliente);

    const pedidos = res.data.map(pedido => {
        return {
            ...pedido,
            createdAt: dateFormatter.format(new Date(pedido.createdAt)),
            // updatedAt: dateFormatter.format(new Date(pedido.updatedAt)),
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

export function usePedidosCliente(idCliente) {
    return useQuery(['pedidos', idCliente], () => getPedidosCliente(idCliente), {
        staleTime: 1000 * 60 // 1min
    },
    )
}