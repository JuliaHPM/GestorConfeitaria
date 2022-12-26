import { useQuery } from "react-query";
import enderecoService from "../services/endereco.service";

async function getEnderecos(id) {

    const { data } = await enderecoService.getEnderecos(id);
    const enderecos = data.map(endereco => {
        return {
            id: endereco.id,
            nome: endereco.nome,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            pontoReferencia: endereco.pontoReferencia,
            cep: endereco.cep,
        }
    });

    return enderecos;
}

export function useEnderecos(id) {
    return useQuery({
        queryKey: ['enderecos', id],
        queryFn: () => getEnderecos(id),
        enabled: !!id,
        staleTime: 1000 * 60 // 1min
    })
}