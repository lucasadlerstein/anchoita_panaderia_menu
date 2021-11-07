import React, {useContext} from 'react';
import styled from '@emotion/styled';
import {Row, Col} from 'reactstrap';
import seleccionContext from '../context/seleccion/seleccionContext';
import {categorias} from './Categorias';

const Fondo = styled.div`
    background-color: white;
    padding: 3rem;
`;

const ItemTipo = styled.button`
    background-color: transparent;
    border: none;
    color: var(--colorAzul);
    font-weight: bold;
    padding: 1rem 0;
    border-bottom: 1px solid var(--colorAzul);
    transition: all .3s ease;
    &:focus {
        outline: none;
    }
`;

const EleccionContenido = ({cPlatos, cVinos, cBebidas, cCocteleria}) => {
    const SeleccionContext = useContext(seleccionContext);
    const { cambiarSeleccion, etapa, v_tipo, v_pais } = SeleccionContext;


    if (etapa === 'comidas' && v_tipo === null) {
        return (
            <Fondo>
                <Row className="text-center">
                    {
                        // categorias[0].opciones.map(cat => (
                        cPlatos.map(cat => (
                            <Col xs={6} className="mx-auto my-auto py-3" key={cat.codigo}>
                                <ItemTipo
                                    onClick={() => cambiarSeleccion('v_tipo', cat.codigo)}
                                >{cat.nombre}</ItemTipo>
                            </Col>
                        ))
                    }
                </Row>
            </Fondo>
        )
    } else if (etapa === 'vinos' && v_pais !== null && v_tipo === null) {
        return (
            <Fondo>
                <Row className="text-center">
                    {
                        // categorias[1].opciones.map(cat => (
                        cVinos.map(cat => (
                            <Col xs={6} className="mx-auto my-auto py-3" key={cat.codigo}>
                                <ItemTipo
                                    onClick={() => cambiarSeleccion('v_tipo', cat.codigo)}
                                >{cat.nombre}</ItemTipo>
                            </Col>
                        ))
                    }
                </Row>
            </Fondo>
        )
    } else if (etapa === 'cocteleria' && v_tipo === null) {
        return (
            <Fondo>
                <Row className="text-center">
                    {
                        // categorias[2].opciones.map(cat => (
                        cCocteleria.map(cat => (
                            <Col xs={6} className="mx-auto my-auto py-3" key={cat.codigo}>
                                <ItemTipo
                                    onClick={() => cambiarSeleccion('v_tipo', cat.codigo)}
                                >{cat.nombre}</ItemTipo>
                            </Col>
                        ))
                    }
                </Row>
            </Fondo>
        )
    } else {
        return null;
    }
}
 
export default EleccionContenido;