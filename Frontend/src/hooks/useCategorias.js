import { useQuery } from "react-query";
import categoriaService from "../services/categoria.service";
import { dateFormatter } from "../utils/formatter";

async function getCategorias() {
    const { data } = await categoriaService.getAll();

    const categorias = data.map(categoria => {
        return {
            ...categoria,
            createdAt: dateFormatter.format(new Date(categoria.createdAt)),
            updatedAt: dateFormatter.format(new Date(categoria.updatedAt)),
        }
    });
    return categorias;
}

export function useCategorias() {
    return useQuery(['categorias'], () => getCategorias(), {
        staleTime: 1000 * 60 // 1min
    })
}