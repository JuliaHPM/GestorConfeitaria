import { useQuery } from "react-query";
import carrinhoService from "../services/carrinho.service";

async function getCarrinho(idCarrinho) {
    const { data } = await carrinhoService.getCarrinho(idCarrinho);
    return data;
}

export function useCarrinho(id) {

    return useQuery({
        queryKey: ['carrinho', id],
        queryFn: () => getCarrinho(id),
        enabled: !!id,
        staleTime: 1000 * 60 // 1min
    })
}