import { useQuery } from "react-query";
import doceService from "../services/doce.service";

async function getProdutos(categoria, ordem, pesquisa) {
    var doces = [];
    if (!categoria) {
        categoria = ''
    }
    if (!ordem) {
        ordem = ''
    }
    if (!pesquisa) {
        pesquisa = ''
    }

    doces = (await doceService.getDocesFilter(categoria, ordem, pesquisa)).data;

    return doces;
}

export function useProdutos(categoria, ordem, pesquisa) {
    return useQuery(['produtos', categoria], () => getProdutos(categoria, ordem, pesquisa), {
        staleTime: 1000 * 60 // 1min
    })
}