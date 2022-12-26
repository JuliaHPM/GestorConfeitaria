import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import { ColorButton, ErrorText, InputForm, InputLabel, StyledNumericInput } from "../styles/components/FormComponents";
import { toast } from 'react-toastify';
import { queryClient } from '../lib/queryClient';
import categoriaService from '../services/categoria.service';
import { ActionButton } from '../styles/components/ActionButton';
import { Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { ImageContainer } from '../styles/components/FormCategoria';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Avatar from '@mui/material/Avatar';
import { useCloudinary } from '../hooks/useCloudinary';

export default function Categoria({ categoria, setCategoria }) {

    const { register, handleSubmit, setValue, getValues, formState, control, reset } = useForm({ mode: "onChange" });
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

    useEffect(() => {
        setValue("nomeCategoria", categoria && categoria.nomeCategoria);
        // setValue("imagemCategoria", categoria && categoria.imagemCategoria);
    }, [categoria, setValue])


    const uploadImage = useCloudinary();

    async function onSubmit(data) {
        // console.log(urlImage);

        const submit = async () => {
            let linkImage = urlImage;
            if (image) {
                if (categoria?.imagemCategoria !== urlImage) {
                    try {
                        const res = await uploadImage(image);
                        linkImage = res.data.secure_url;
                    } catch (err) {
                        throw err;
                    }

                }
            }

            if (categoria) {
                return categoriaService.update(categoria.id,
                    {
                        ...data,
                        imagemCategoria: linkImage
                    }
                );
            } else {
                return categoriaService.create(
                    {
                        ...data,
                        imagemCategoria: linkImage
                    }
                );
            }
        }

        const res = toast.promise(
            submit,
            {
                pending: 'Enviando ...',
                success: 'Categoria salva com sucesso!',
                error:
                {
                    render({ data }) {
                        return `${data.response.data.message}`
                    }
                }
            }
        )
        res.then(() => {
            queryClient.invalidateQueries('categorias');//invalidar o query para atualizar a tabela
            reset({ nomeCategoria: '' });
            setFile('');
            setImage(null);
            setCategoria(null);
        }).catch((err) => {
            console.log(err);
        })
    }


    const [image, setImage] = useState(null); //blob
    const [urlImage, setUrlImage] = useState(null); //url com o blob
    const [file, setFile] = useState(''); //value do input image

    const isSubmitButtonDisabled = (!image && !isDirty) || (!isValid && isDirty);

    function handleImageChange(e) {

        setFile(e.target.value);
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
        } else {
            setImage(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (!image) {
            setUrlImage(categoria ? categoria.imagemCategoria : null);
        } else {
            const objectUrl = URL.createObjectURL(image);
            setUrlImage(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image, categoria])

    useEffect(() => {
        setFile('');
        setImage(null);
        reset({}, { keepValues: true });
    }, [categoria, reset])

    return (
        <Container style={{ maxWidth: '60%' }}>
            {/* <Title title={ingrediente ? 'Editar Ingrediente' : 'Cadastrar Ingrediente'} /> */}
            <form onSubmit={handleSubmit(onSubmit)} >
                <Row className="align-items-center">
                    {/* imagemCategoria */}
                    <Col md={3} lg={3}>
                        <input
                            type="file"
                            id='inputImage'
                            style={{ zIdex: -1, position: 'absolute', opacity: 0 }}
                            accept={'image/png, image/jpeg, image/jpg'}
                            onChange={handleImageChange}
                            value={file}
                        />
                        <ImageContainer htmlFor='inputImage'>
                            <div >
                                <Avatar src={urlImage} alt="">
                                    <InsertPhotoOutlinedIcon fontSize='large' />
                                </Avatar>
                            </div>
                            <span><EditIcon fontSize="small" style={{ color: 'gray' }} /></span>
                        </ImageContainer>
                    </Col>
                    <Col>
                        <InputLabel color={errors?.nomeCategoria ? 'error' : 'normal'} >Nome Categoria</InputLabel>
                        <InputForm color={errors?.nomeCategoria ? 'error' : 'normal'}
                            type="text"
                            {...register("nomeCategoria",
                                { required: "Digite o nome da categoria" }
                            )
                            }
                        />
                        {/* <ErrorText>{errors?.nomeCategoria?.message ?errors?.nomeCategoria?.message : ' ' }</ErrorText> */}
                    </Col>
                    <Col xsm={4} sm={1} md={2} lg={1}>
                        <ActionButton >
                            <Tooltip title={categoria ? 'Salvar' : 'Cadastrar'}>
                                <span>
                                    <ColorButton aria-label="Add" disabled={isSubmitButtonDisabled} type="submit">
                                        {categoria ?
                                            <CheckIcon />
                                            :
                                            <AddIcon />}
                                    </ColorButton>
                                </span>
                            </Tooltip>
                        </ActionButton>
                    </Col>

                    <Col xsm={6} sm={4} md={2} lg={1}>
                        {categoria ?
                            <ActionButton>
                                <Tooltip title='Cancelar'>
                                    <ColorButton aria-label="Cancel" type="button" onClick={() => setCategoria(null)}>
                                        <CloseIcon />
                                    </ColorButton>
                                </Tooltip>
                            </ActionButton>
                            :
                            ''}
                    </Col>

                </Row>
            </form>
        </Container>
    )
}

