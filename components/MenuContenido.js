import React, {useEffect, useContext, useState} from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import ItemIndividual from './ItemIndividual';
import seleccionContext from '../context/seleccion/seleccionContext';
import {withTranslation} from '../i18n';
import clienteAxios from '../config/axios';

const Fondo = styled.div`
    background-color: white;
    padding: 1rem 0;
    position: relative;
`;
const VolverBtn = styled.button`
    color: var(--colorAzul);
    position: absolute;
    top: 5px;
    left: 5px;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    padding: .1rem 1rem;
    background-color: #cacaca;  
    transition: all .3s ease;
    &:hover {
        background-color: #f0f0f0;
    }
    &:focus {
        outline: none;
    }
`;
const Categoria = styled.p`
    text-transform: uppercase;
    color: var(--colorAzul);
    font-size: 2.2rem;
    font-weight: bold;
    border-bottom: 1px solid var(--colorAzul);
    width: 95%;
    text-align: center;
    padding-bottom: 2rem;
    margin: 7rem auto 2rem auto;
    /* margin-top: 3rem; */
    /* margin-bottom: .5rem; */
    transition: all .5s ease;
    &:hover {
        color: var(--colorNaranja);
    }
`;

const SubCategoria = styled.p`
    font-style: italic;
    font-weight: bold;
    font-size: 2rem;
    color: var(--colorAzul);
    margin-top: 4.5rem;
`;

const MenuContenido = ({contenido, tipo, categorias, etapa, t}) => {
    const router = useRouter();

    useEffect(() => {
        async function traerCategoriasCafe() {
            await clienteAxios.get('/general/get/categorias-cafe')
                .then(resp => { setCategoriasCafe(resp.data.categoriasCafe) })
                .catch(err => { console.log('CAT-404-CAF'); })
        }

        traerCategoriasCafe();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const categoriaGet = urlParams.get('categoria');   
        setTimeout(() => {
            window.location.href = `#${categoriaGet}`;
        }, 600); 

        // Organizar helados
        if(contenido) {
            let soloHelados = contenido.filter(it => Number(it.categoria) === 5);
            let preciosHelados = soloHelados.filter(sH => (sH.precio !== 0 && sH.precio !== ''));
            preciosHelados = preciosHelados.sort(function(a, b){return a.precio-b.precio});
            let soloGustos = soloHelados.filter(sH => (sH.precio === 0 || sH.precio === ''));
            setItemsHelados(preciosHelados.concat(soloGustos));
            console.log(preciosHelados.concat(soloGustos))
        }

        // eslint-disable-next-line
    }, [contenido])

    const SeleccionContext = useContext(seleccionContext);
    const {cambiarSeleccion} = SeleccionContext;

    const [categoriasCafe, setCategoriasCafe] = useState([]);
    const [itemsHelados, setItemsHelados] = useState([]);

    const cuentaDiez = [1,2,3,4,5,6,7,8,9,10];

    return (
        <Fondo>
            {/* {
                (etapa === 'bebidas') ? (
                    <VolverBtn
                        onClick={() => cambiarSeleccion('etapa', null)}
                    >{t('Alternativos.Volver')}</VolverBtn>
                ) : (
                    <VolverBtn
                        onClick={() => cambiarSeleccion('v_tipo', null)}
                    >{t('Alternativos.Volver')}</VolverBtn>
                )
            } */}
            <VolverBtn
                onClick={() => router.push(`/`)}
            >{t('Alternativos.Volver')}</VolverBtn>
    

            {/* <Categoria>Salta</Categoria> */}
            {/* <Uva>Chardonnay</Uva> */}

            {
                categorias.map((item, i) => (
                    <div key={item.codigo}>
                        <Categoria id={item.codigo}>{item.nombre}</Categoria>
                        {/* {
                            categoriasCafe.map(cat => (
                                (item.codigo === 'cafeteria' && cat.nombre !== '') ? (
                                    <SubCategoria key={cat.id} className="pl-4">_ {cat.nombre}</SubCategoria>
                                ) : null
                            ))
                        } */}
                        {
                            cuentaDiez.map(one => (
                                (categoriasCafe[[one-1]] !== undefined && categoriasCafe[[one-1]].nombre !== '' && item.codigo === 'cafeteria') ? (
                                    <>
                                        <SubCategoria className={`pl-4 ${one === 1 ? 'mt-5' : ''}`}>_ {categoriasCafe[[one-1]].nombre}</SubCategoria>
                                        {contenido.map(prod => (
                                            (Number(prod.categoria) === 1 && prod.visible === true && Number(prod.categoria2) === one) ? (
                                                <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                            ) : null
                                        ))} 
                                    </>
                                ) : null
                            ))
                        }

                        {/* {
                            contenido.map(prod => (
                                (prod.categoria === item.id && prod.visible === true && Number(prod.categoria) !== 1) ? (
                                    <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />
                                ) : (prod.destacado === true && prod.visible === true && item.codigo === 'destacado' && Number(prod.categoria) !== 1) ? (
                                    <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />                                    
                                ) : null
                            ))
                        } */}
                        {
                            (item.id === 5) ? (
                                itemsHelados.map(prod => (
                                    (prod.categoria === item.id && prod.visible === true && Number(prod.categoria) !== 1) ? (
                                        <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />
                                    ) : (prod.destacado === true && prod.visible === true && item.codigo === 'destacado' && Number(prod.categoria) !== 1) ? (
                                        <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />                                    
                                    ) : null
                                ))
                            ) : (
                                contenido.map(prod => (
                                    (prod.categoria === item.id && prod.visible === true && Number(prod.categoria) !== 1) ? (
                                        <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />
                                    ) : (prod.destacado === true && prod.visible === true && item.codigo === 'destacado' && Number(prod.categoria) !== 1) ? (
                                        <ItemIndividual key={prod.id} producto={prod} etapa={etapa} tipoItem={(Number(prod.categoria) === 5 && (Number(prod.precio) === 0 || prod.precio === '')) ? 'gusto' : ''} />                                    
                                    ) : null
                                ))

                            )
                        }
                    </div>       
                ))
            }
        </Fondo>
    );
}
 
export default withTranslation('common')(MenuContenido);