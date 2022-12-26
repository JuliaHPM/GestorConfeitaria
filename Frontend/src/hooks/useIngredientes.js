import { useQuery } from "react-query";
import ingredienteService from "../services/ingrediente.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getIngredientes() {
    const { data } = await ingredienteService.getAll();

    const ingredientes = data.map(ingrediente => {
        return {
            ...ingrediente,
            createdAt: dateFormatter.format(new Date(ingrediente.createdAt)),
            updatedAt: dateFormatter.format(new Date(ingrediente.updatedAt)),
            precoUnit: priceFormatter.format(ingrediente.precoUnit),
            precoKg: priceFormatter.format(ingrediente.precoKg),
            quantEmb: ingrediente.quantEmb + ' ' + ingrediente.unidadeDeMedida
        }
    });

    return ingredientes;
}

export function useIngredientes() {
    return useQuery(['ingredientes'], () => getIngredientes(), {
        staleTime: 1000 * 60 // 1min
    })
}