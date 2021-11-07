import React, {useEffect, useContext} from 'react';
import styled from '@emotion/styled';
import ItemIndividual from './ItemIndividual';
import seleccionContext from '../context/seleccion/seleccionContext';
import {withTranslation} from '../i18n';

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
const TipoUva = styled.p`
    text-transform: uppercase;
    color: var(--colorNaranja);
    padding-left: 3rem;
    font-size: 1.6rem;
    margin-bottom: .5rem;
    font-weight: bold;
    margin-top: 3rem;
`;
const Provincia = styled.p`
    color: black;
    padding-left: 4.2rem;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    &:before {
        content: '•';
        /* padding-top: 5rem; */
        padding-right: .5rem;
        vertical-align: middle;
    }
`;

const VinosContenido = ({contenido, tipo, pais, categorias, etapa, t}) => {
    
    useEffect(() => {
        window.location.href = `#${tipo}`;
        // eslint-disable-next-line
    }, [])

    const regiones = [
        { visible: false, pais: 'mundo', es: 'Borgoña', en: 'Burgundy' },
        { visible: false, pais: 'mundo', es: 'Burdeos', en: 'Bordeaux' },
        { visible: false, pais: 'mundo', es: 'Champagne', en: 'Champagne' },
        { visible: false, pais: 'mundo', es: 'Toscana', en: 'Tuscany' },
        { visible: false, pais: 'mundo', es: 'Piemonte', en: '' },
        { visible: false, pais: 'mundo', es: 'Mosel', en: '' },
        { visible: false, pais: 'mundo', es: 'Malborough', en: '' },
        { visible: false, pais: 'mundo', es: 'Montsant', en: '' },
        { visible: false, pais: 'mundo', es: 'Penedés', en: '' },
        { visible: false, pais: 'mundo', es: 'Rias Baixas', en: '' },
        { visible: false, pais: 'mundo', es: 'Valdeorras', en: '' },
        { visible: false, pais: 'mundo', es: 'Montilla - Moriles', en: '' },
        { visible: false, pais: 'mundo', es: 'Jerez de la Frontera', en: '' },
        { visible: false, pais: 'mundo', es: 'Sanlúcar de Barrameda', en: '' },
        { visible: false, pais: 'mundo', es: 'Tenerife', en: '' },
        { visible: false, pais: 'mundo', es: 'Priorat', en: '' },
        { visible: false, pais: 'mundo', es: 'Ribera del Duero', en: '' },
        { visible: false, pais: 'mundo', es: 'Sierra de Gredos', en: '' },
        { visible: false, pais: 'mundo', es: 'Elqui', en: '' },
        { visible: false, pais: 'mundo', es: 'Itata', en: '' },
        { visible: false, pais: 'mundo', es: 'Maipo', en: '' },
        { visible: false, pais: 'mundo', es: 'Maule', en: '' },
        { visible: false, pais: 'mundo', es: 'Madeira', en: '' },
        { visible: false, pais: 'mundo', es: 'Oporto', en: '' },
        { visible: false, pais: 'mundo', es: 'Valle de Uco', en: '' },
        { visible: false, pais: 'mundo', es: 'Luján de Cuyo', en: '' },
        { visible: false, pais: 'mundo', es: 'Valles Calchaquíes', en: '' },
        { visible: false, pais: 'mundo', es: 'Trevelin', en: '' },
        { visible: false, pais: 'argentina', es: 'Buenos Aires', en: 'Buenos Aires' },
        { visible: false, pais: 'argentina', es: 'Catamarca', en: 'Catamarca' },
        { visible: false, pais: 'argentina', es: 'Chubut', en: 'Chubut' },
        { visible: false, pais: 'argentina', es: 'Córdoba', en: 'Córdoba' },
        { visible: false, pais: 'argentina', es: 'Jujuy', en: 'Jujuy' },
        { visible: false, pais: 'argentina', es: 'La Rioja', en: 'La Rioja' },
        { visible: false, pais: 'argentina', es: 'Mendoza', en: 'Mendoza' },
        { visible: false, pais: 'argentina', es: 'Río Negro', en: 'Río Negro' },
        { visible: false, pais: 'argentina', es: 'Salta', en: 'Salta' },
        { visible: false, pais: 'argentina', es: 'San Juan', en: 'San Juan' },
    ]

    const SeleccionContext = useContext(seleccionContext);
    const {cambiarSeleccion} = SeleccionContext;

    return (
        <Fondo>
            <VolverBtn
                onClick={() => cambiarSeleccion('v_tipo', null)}
            >{t('Alternativos.Volver')}</VolverBtn>
            {
                categorias.map((cat, i) => (
                    <div key={cat.codigo}>
                        <TipoUva id={cat.codigo}>{cat.nombre}</TipoUva>
                        {
                            regiones.map((reg, index) => {
                                if(reg.pais === pais || pais === 'copa') {
                                    return (
                                        contenido.map(prod => (
                                        <>  
                                            {
                                                (pais === 'copa') ? (
                                                    ((reg.es === prod.region && prod.tipo === cat.codigo && reg.visible === false && prod.visible === true) && (prod.c140 === true || prod.c120 === true || prod.c70 === true || prod.c35 === true)) ? (
                                                        <>
                                                        <Provincia key={reg.es} id={reg.es}>{reg.es}</Provincia>
                                                        {reg.visible = true}
                                                        </>
                                                    ) : null
                                                ) : (
                                                    (reg.es === prod.region && prod.tipo === cat.codigo && reg.visible === false && prod.visible === true) ? (
                                                        <>
                                                            <Provincia key={reg.es} id={reg.es}>{reg.es}</Provincia>
                                                            { reg.visible = true }
                                                        </>
                                                    ) : null
                                                )
                                            }
                                            
                                            {
                                                (prod.tipo === cat.codigo && prod.region === reg.es  && prod.visible === true) ? (
                                                    (pais === 'argentina' && prod.pais === 'Argentina') ? (
                                                        <ItemIndividual tamanosBool={false} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : (pais === 'mundo' && prod.pais !== 'Argentina') ? (
                                                        <ItemIndividual tamanosBool={false} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : ((pais === 'copa') && (prod.c140 === true || prod.c120 === true || prod.c70 === true || prod.c35 === true)) ? (
                                                        <ItemIndividual tamanosBool={false} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : null
                                                ) : null
                                            }

                                            {           
                                                ((prod.region === reg.es && cat.codigo === 'tamanos') && (prod.t375 || prod.t500 || prod.t1125 || prod.t1500 || prod.t3000)) ? (
                                                    (pais === 'argentina' && prod.pais === 'Argentina'  && prod.visible === true ) ? (
                                                        <ItemIndividual tamanosBool={true} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : (pais === 'mundo' && prod.pais !== 'Argentina'  && prod.visible === true ) ? (
                                                        <ItemIndividual tamanosBool={true} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : ((pais === 'copa' && prod.visible === true) && (prod.c140 === true || prod.c120 === true || prod.c70 === true || prod.c35 === true) ) ? (
                                                        <ItemIndividual tamanosBool={true} key={prod.id} producto={prod} etapa={etapa} />
                                                    ) : null
                                                ) : null
                                            }
                                        </>
                                        )))
                                    }
                            })
                        }
                    </div>       
                ))
            }
        </Fondo>
    );
}
 
export default withTranslation('common')(VinosContenido);
