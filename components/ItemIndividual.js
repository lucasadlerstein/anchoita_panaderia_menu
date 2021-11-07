import React, {useContext, useEffect} from 'react';
import styled from '@emotion/styled';
import {Row, Col} from 'reactstrap';
import seleccionContext from '../context/seleccion/seleccionContext';
import {i18n, withTranslation} from '../i18n';

const Item = styled(Row)`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    /* padding: 0 1rem; */
    color: var(--colorAzul);
`;

const Nombre = styled.p`
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0;
    color: var(--colorAzul);

`;

const Descripcion = styled.p`
    margin: 0;
    font-size: 1.5rem;
    white-space: pre-wrap;
`;

const Precio = styled.p`
    /* font-weight: bold; */
    margin: 0 1rem 0 0;
    text-align: right;
    font-size: 1.9rem;
    font-family: 'RobotoCondensed', serif;
    color: var(--colorNaranja);
`;

const AgregarBtn = styled.button`
    background-color: transparent;
    font-weight: bold;
    border: none;
    color: var(--colorAzul);
    transition: all .3s ease;
    text-align: center;
    font-size: 2.5rem;
    line-height: 2rem;
    /* margin: auto; */
    
    /* position: absolute; */
    /* top: -8px; */
    /* left:auto; */
    /* right:auto; */
    /* white-space:nowrap; */
    /* overflow:visible; */

    &:hover{
        color: var(--colorNaranja);
    }
    &:focus {
        outline: none;
    }
`;

const ColumnaPrimera = styled(Col)`
    // Si es IPhone: 2px padding left
    @supports (-webkit-touch-callout: none) {
        padding-left: 2px;
    }
`;

const GustoHelado = styled.div`
    color: var(--colorAzul);
    width: 45%;
    padding-left: 3rem;
    margin-bottom: .5rem;
    display: inline-block;
`;

const ItemIndividual = ({producto, etapa, t, tamanosBool, tipoItem}) => {

    useEffect(() => {
        if(!producto.descripcion) producto.descripcion = '';
        if(!producto.en_nombre) producto.en_nombre = '';
        if(!producto.en_descripcion) producto.en_descripcion = '';
        // eslint-disable-next-line
    }, [])

    const SeleccionContext = useContext(seleccionContext);
    const { agregarNuevo, busqueda, v_pais } = SeleccionContext;

    const agregarAlCarrito = (producto) => {
        const nuevo = {
            nombre: producto.nombre,
            en_nombre: producto.en_nombre,
            descripcion: producto.descripcion,
            en_descripcion: producto.en_descripcion,
            categoria: etapa,
            cantidad: 1
        }
        agregarNuevo(nuevo)
    }

    return (
        <>
        {
            (busqueda === ''
            || producto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.en_nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.en_descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            ) ? (
                (tipoItem === 'gusto') ? (
                    <GustoHelado className={`text-center ${producto.stock ? null : 'sin-stock'}`}>
                        <Nombre>{(i18n.language === 'en' && producto.en_nombre) ? producto.en_nombre : producto.nombre }</Nombre>
                        { (producto.descripcion) ? <Descripcion>{producto.descripcion}</Descripcion> : null }
                    </GustoHelado>
                ) : (
                    <Item className={producto.stock ? null : 'sin-stock'}>
                        {/* <ColumnaPrimera xs={1} className="pr-0"> */}
                            {/* <AgregarBtn
                                onClick={() => agregarAlCarrito(producto)}
                            >+</AgregarBtn> */}
                        {/* </ColumnaPrimera> */}
                        <Col xs={8} className="pl-5">
                            <Nombre>{(i18n.language === 'en' && producto.en_nombre) ? producto.en_nombre : producto.nombre } {(producto.anada ? producto.anada : null)}</Nombre>
                            { (producto.descripcion) ? <Descripcion>{producto.descripcion}</Descripcion> : null }
                        </Col>
                        <Col xs={4} className="pl-0">
                            <Precio>
                                {
                                    !(producto.precio === 0 || producto.precio === '0' || producto.precio === '') ? `$${producto.precio}` : ''
                                }
                                {
                                    !(producto.precio2 === 0 || producto.precio2 === '0' || producto.precio2 === '') ? ` / $${producto.precio2}` : ''
                                }
                                {
                                    !(producto.precio3 === 0 || producto.precio3 === '0' || producto.precio3 === '') ? ` / $${producto.precio3}` : ''
                                }
                            </Precio>
                        </Col>
                    </Item>
                )
            ) : null
        }
        </>
    );
}
 
export default withTranslation('common')(ItemIndividual);