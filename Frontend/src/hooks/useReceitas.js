import { useQuery } from "react-query";
import receitaService from "../services/receita.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getReceitas() {
    const { data } = await receitaService.getAll();

    const receitas = data.map(receita => {
        return {
            ...receita,
            createdAt: dateFormatter.format(new Date(receita.createdAt)),
            updatedAt: dateFormatter.format(new Date(receita.updatedAt)),
            custo: priceFormatter.format(receita.custo),
            rendimento: receita.rendimento + ' ' + receita.unidadeDeMedida,
            ingredientes: receita.ingredientes.map(ingrediente => {
                return ' ' + ingrediente.nome
            })
        }
    });
    return receitas;
}

export function useReceitas() {
    return useQuery(['receitas'], () => getReceitas(), {
        staleTime: 1000 * 60 // 1min
    })
}