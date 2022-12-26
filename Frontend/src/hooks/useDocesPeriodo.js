import { useQuery } from "react-query";
import doceService from "../services/doce.service";
import { dateFormatter, priceFormatter } from "../utils/formatter";

async function getDocesPeriodo(status, dataInicio, dataFinal) {

    if (!status || status === null) { status = '' }
    if (!dataInicio || dataInicio === null) { dataInicio = '' }
    if (!dataFinal || dataFinal === null) { dataFinal = '' }

    const { data } = await doceService.getDocesPeriodo(status, dataInicio, dataFinal);
    // const doces = data.map(doce => {
    //     return {
    //         ...doce,
    //         createdAt: dateFormatter.format(new Date(doce.createdAt)),
    //         updatedAt: dateFormatter.format(new Date(doce.updatedAt)),
    //         custo: priceFormatter.format(doce.custo),
    //         peso: doce.peso, //+ ' ' + doce.unidadeDeMedida,
    //         receitas: doce.receitas.map(receita => {
    //             return ' ' + receita.nome
    //         })
    //     }
    // });
    return data;
}

export function useDocesPeriodo(status, dataInicio, dataFinal) {
    return useQuery(['docesPeriodo'], () => getDocesPeriodo(status, dataInicio, dataFinal), {
        staleTime: 1000 * 60 // 1min
    })
}

// {
//     "totalQuantity": "1",
//     "doce": {
//         "id": 3,
//         "nomeDoce": "Bento Cake Chocolate",
//         "valorTotalComMargem": 42.3,
//         "descricao": "Bolo tipo bento cake (bolo na marmita), com massa sabor chocolate, recheio de brigadeiro e cobertura de chantilly. \nPeça a decoração desejada pelo Whatsapp!",
//         "peso": 450,
//         "imagemDoce": "https://res.cloudinary.com/dd9oavdpw/image/upload/v1668632488/gestorConfeitaria/gjfxhohg90dkkullec5c.jpg",
//         "receitas": [
//             {
//                 "id": 2,
//                 "nome": "Massa de chocolate",
//                 "tempoPreparo": "01:30:00",
//                 "rendimento": 600,
//                 "custo": 6.66,
//                 "anotacoes": "",
//                 "modoPreparo": "",
//                 "tipoReceita": "massa",
//                 "unidadeDeMedida": "g/mL",
//                 "createdAt": "2022-11-14T19:13:50.360Z",
//                 "updatedAt": "2022-11-30T13:39:59.066Z",
//                 "Receitas_doce": {
//                     "quantReceita": 300,
//                     "unidadeDeMedida": "g/mL",
//                     "createdAt": "2022-11-16T21:01:29.608Z",
//                     "updatedAt": "2022-11-16T21:01:29.608Z",
//                     "idDoce": 3,
//                     "idReceita": 2
//                 }
//             },
//             {
//                 "id": 1,
//                 "nome": "Brigadeiro",
//                 "tempoPreparo": "00:40:00",
//                 "rendimento": 200,
//                 "custo": 9.3,
//                 "anotacoes": null,
//                 "modoPreparo": null,
//                 "tipoReceita": "recheio",
//                 "unidadeDeMedida": "g/mL",
//                 "createdAt": "2022-11-14T19:12:44.537Z",
//                 "updatedAt": "2022-12-05T21:45:50.233Z",
//                 "Receitas_doce": {
//                     "quantReceita": 150,
//                     "unidadeDeMedida": "g/mL",
//                     "createdAt": "2022-11-16T21:01:29.611Z",
//                     "updatedAt": "2022-11-16T21:01:29.611Z",
//                     "idDoce": 3,
//                     "idReceita": 1
//                 }
//             }
//         ]
//     }
// },