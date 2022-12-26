import { format } from "date-fns";
import { useQuery } from "react-query";
import pedidoService from "../services/pedido.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getVendas(dataInicio, dataFinal) {

    if (!dataInicio) { dataInicio = '' }
    if (!dataFinal) { dataFinal = '' }

    const vendasPeriodo = (await pedidoService.getVendas(dataInicio, dataFinal)).data;

    const datasGrafico = vendasPeriodo.map(venda => {
        return format(new Date(venda.dataEntrega), 'MMM, dd')
    })

    const quantidadePedidosGrafico = vendasPeriodo.map(venda => {
        return venda.pedidosCount

    })

    const data = { datasGrafico, quantidadePedidosGrafico }
    // console.log(data)
    return data;
}

export function useVendas(dataInicio, dataFinal) {
    return useQuery(['vendas'], () => getVendas(dataInicio, dataFinal), {
        staleTime: 1000 * 60 // 1min
    })
}