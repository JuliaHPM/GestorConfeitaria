import React, { useEffect, useState } from "react";
// import { useFetch } from "../../hooks/useFetch";
import { Container } from "react-bootstrap";

import { Typography, FormControl, FormControlLabel, Radio, RadioGroup, IconButton, Tooltip, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "../components/CheckBox";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { CardFiltro, Content, ConteudoView, InputPesquisa, ProdutosList } from "../styles/pages/Produtos";
import { Title } from "../components/Title";
import CardProduto from "../components/CardProduto";
import Link from "next/link";
import { RadioButton } from "../components/RadioButton";
import doceService from "../services/doce.service";
import categoriaService from "../services/categoria.service";
import { useProdutos } from "../hooks/useProdutos";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

export default function Produtos({ categorias, categoriaQuery }) {

    // const OptionsOrdem = [
    //     { value: 'bestseller', label: 'Mais vendidos' },
    //     { value: 'menorpreco', label: 'Menor preço' },
    //     { value: 'maiorpreco', label: 'Maior preço' },
    //     { value: 'addrecent', label: 'Adicionados recentemente' },
    // ]
    const [pesquisa, setPesquisa] = useState('');
    const [ordem, setOrdem] = useState('');//radioButton 
    const [categoriasSelected, setCategoriasSelected] = useState(categoriaQuery ? [categoriaQuery] : []);
    const { data, isLoading, error, isFetching, refetch } = useProdutos(categoriasSelected, ordem, pesquisa);

    const {register, control, reset, setValue, getValues, handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: {
            // pesquisa: '',
            categoria: '',
            ordem: '',
        }
    })


    function handleCategoriasSelected(categoria){
        const selected = categoriasSelected.some(item=> item === categoria);
    
        if(selected){
            setCategoriasSelected(old=>old.filter(item=>item !== categoria))
        }else{
            setCategoriasSelected(old=>[...old, categoria])
        }
    }

    const handleRadioChange = (event) => {
        setOrdem(event.target.value);
    };

    function handlePesquisaChange(e) {
        setPesquisa(e.target.value);
    }

    function cleanFilters() {
        setOrdem(null);
        setPesquisa('');
        setCategoriasSelected([]);
    }

    useEffect(() => {
        refetch()
    }, [pesquisa, ordem, categoriasSelected])

    const disabledCleanFilter =  !ordem && !pesquisa && !categoriasSelected.length > 0;

    return (
        <ConteudoView>
            <Title title=" " />
            <div style={{ flexDirection: 'row', display: 'flex', paddingBottom: '4rem' }}>
                <div style={{ display: 'block' }}>
                    <form >
            
                        <div style={{ marginBottom: 15, textAlign: 'start' }}>
                            <InputPesquisa
                                placeholder="Pesquisar"
                                value={pesquisa}
                                onChange={(e) => { handlePesquisaChange(e) }}
                            />
                        </div>

                       
                        <CardFiltro >
                            <Box>
                                <Content>
                                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <Typography style={{ textAlign: 'start', p: 0, paddingLeft: 1, fontWeight: '600', fontSize: 17 }}>
                                                Filtros
                                            </Typography>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <Tooltip title='Limpar filtro'>
                                                <IconButton color="primary" aria-label="clean filter" component="label" sx={{ margin: -1 }}
                                                    disabled={disabledCleanFilter}
                                                    onClick={cleanFilters}
                                                >
                                                    {!disabledCleanFilter ?
                                                        <FilterAltOffIcon sx={{ color: '#FF6AB9' }} />
                                                        :
                                                        <FilterAltIcon />
                                                    }
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <Typography style={{ textAlign: 'start', padding: 0, marginTop: 10, fontWeight: '600' }}>
                                        Categorias
                                    </Typography>

                                    {categorias.map((categoria, index) => {
                                        return (
                                        <Checkbox
                                        key={categoria.value}
                                        label={categoria.value}
                                        checked={categoriasSelected.some(item=> item === categoria.value)}
                                        controller={()=>handleCategoriasSelected(categoria.value)}
                                        />
                                        );
                                        })}
                                    
                                    <div>
                                        <Typography style={{ textAlign: 'start', marginTop: 10, fontWeight: '600' }}>
                                            Ordenar por
                                        </Typography>
                                        
                                            <RadioGroup
                                                aria-labelledby="radio group"
                                                name="ordem"
                                                value={ordem}
                                                onChange={handleRadioChange}
                                            >
                                                {/* <RadioButton
                                                    value="bestseller"
                                                    label="Mais vendido"
                                                /> */}
                                                <RadioButton
                                                    value="menorpreco"
                                                    label="Menor preço"
                                                />
                                                <RadioButton
                                                    value="maiorpreco"
                                                    label="Maior preço"
                                                />
                                                <RadioButton
                                                    value="addrecent"
                                                    label="Adicionados recentemente"
                                                    />
                                            </RadioGroup>
                                    </div>
                                </Content>
                            </Box>
                        </CardFiltro>
                    
                    </form>
                </div>
                <ProdutosList  >
                    {data?.length >0 ? data.map(doce => (
                        <Link href={`/produto/${doce.id}`} key={doce.id} prefetch={false} style={{ textDecoration: 'none' }}>
                            <CardProduto
                                titulo={doce.nomeDoce}
                                descricao={doce.descricao}
                                valor={doce.valorTotalComMargem.toFixed(2)}
                                peso={doce.peso}
                                imagem={doce.imagemDoce}
                            />
                        </Link>
                    ))
                    :
                    !isFetching && !isLoading ?
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ fontSize: 15, color: '#595959' }}>Nenhum produto encontrado!</p>
                                </div>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Spinner size={20} />
                                </div>
                    }
                </ProdutosList>
            </div >
        </ConteudoView >
    )
}

export const getServerSideProps = async ({ query }) => {
    const rescategorias = (await categoriaService.getHome()).data;
    const categorias = rescategorias ? 
    rescategorias.map(categoria=>{
        return {
            label: categoria.nomeCategoria,
            value: categoria.nomeCategoria
        }
    })
    : 
    [];

    const categoria = query.categoria;

    return {
        props: {
            categorias,
            categoriaQuery: categoria ? categoria : null
        },

    }
    
}

{/* <div style={{ display: 'flex', flexDirection: 'column' }}>
    {categorias.map((categoria, index) => (
        <Checkbox
            label={categoria.nomeCategoria}
            value={categoria.nomeCategoria}
            key={categoria.id}
            controller={() => handleSelectedCategoriasChange(index)}
            checked={setBoxesChecked[index]}
        />
    ))}
</div> */}

// const [boxesChecked, setBoxesChecked] = useState(new Array(categorias.length).fill(false));
// const selectedCategorias = [];

    // // useEffect(() => {
    // //     selectedCategorias.push(categoria)
    // // }, [])
    
    // // console.log(selectedCategorias)
    
    
    
    // console.log(boxesChecked)
    
    // function handleSelectedCategoriasChange(position) {
        //     const updatedBoxesChecked = boxesChecked.map((item, index) =>
    //         index === position ? !item : item
    //     );
    
    //     console.log(updatedBoxesChecked)
    
    //     setBoxesChecked(updatedBoxesChecked);
    //     updatedBoxesChecked.map((categoria, index) => {
    //         if (categoria) {
    //             selectedCategorias.push(categorias[index]);
    //         }
    //     });
    // }
