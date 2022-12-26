import { useQuery } from "react-query";
import doceService from "../services/doce.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getDoces() {
    const { data } = await doceService.getAll();

    const doces = data.map(doce => {
        return {
            ...doce,
            createdAt: dateFormatter.format(new Date(doce.createdAt)),
            updatedAt: dateFormatter.format(new Date(doce.updatedAt)),
            custo: priceFormatter.format(doce.custo),
            peso: doce.peso, //+ ' ' + doce.unidadeDeMedida,
            receitas: doce.receitas.map(receita => {
                return ' ' + receita.nome
            })
        }
    });
    return doces;
}

export function useDoces() {
    return useQuery(['doces'], () => getDoces(), {
        staleTime: 1000 * 60 // 1min
    })
}