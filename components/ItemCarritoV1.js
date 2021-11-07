import React, {useContext} from 'react';
import {Row, Col} from 'reactstrap';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';
import {i18n} from '../i18n';

const Nombre = styled.p`
    color: var(--colorAzul);
    margin: 0;
    font-weight: bold;
`;

const Descripcion = styled.p`
    color: var(--colorAzul);
    margin: 0;
    font-size: 1.5rem;
`;

const Cantidad = styled.p`
    color: var(--colorAzul);
    margin: auto .8rem;
    /* font-weight: bold; */
    font-size: 1.8rem;
`;

const ColumnaCantidad = styled(Col)`
    display: flex;
`;

const BtnSimbolo = styled.button`
    margin: auto;
    border: none;
    background-color: transparent;
    padding: .2rem;
    &:focus {
        outline: none;
    }
`;

const ItemCarrito = ({item, id}) => {

    const SeleccionContext = useContext(seleccionContext);
    const { cambiarCantidad } = SeleccionContext;

    function clickSimbolo(nombre, operacion) {
        cambiarCantidad(nombre, operacion)
    }

    return (
        <Row key={id} style={{marginTop: '2.5rem'}}>
            <Col xs={8} style={{margin: 'auto'}}>
                <Nombre>{ (i18n.language === 'en' && item.en_nombre) ? item.en_nombre : item.nombre}</Nombre>
                <Descripcion>{ (i18n.language === 'en' && item.en_descripcion) ? item.en_descripcion : item.descripcion}</Descripcion>
            </Col>
            <ColumnaCantidad xs={4} >
                <BtnSimbolo
                    onClick={() => clickSimbolo(item.nombre, 'resta')}
                >
                    <img src="img/menos.png" alt="Restar una unidad" />
                </BtnSimbolo>
                <Cantidad>{item.cantidad}</Cantidad>
                <BtnSimbolo
                    onClick={() => clickSimbolo(item.nombre, 'suma')}
                >
                    <img src="img/mas.png" alt="Agregar una unidad" />
                </BtnSimbolo>
            </ColumnaCantidad>
        </Row>
    );
}
 
export default ItemCarrito;