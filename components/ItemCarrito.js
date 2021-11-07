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

const ColumnaCantidad = styled.div`
    display: flex;
    margin-top: 1.5rem;
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
        <div className="text-center mt-5">
            <Nombre>{ (i18n.language === 'en' && item.en_nombre) ? item.en_nombre : item.nombre}</Nombre>
            <Descripcion>{ (i18n.language === 'en' && item.en_descripcion) ? item.en_descripcion : item.descripcion}</Descripcion>
            <ColumnaCantidad>
                <div
                    style={{borderBottom: '1.5px solid var(--colorAzul)', width: '20%', maxWidth: '5rem', margin: 'auto auto auto 3rem'}}
                ></div>
                <BtnSimbolo
                    onClick={() => clickSimbolo(item.nombre, 'resta')}
                >
                    <img src="img/menos.png" alt="Restar una unidad" style={{maxHeight: '2.5rem'}} />
                </BtnSimbolo>
                <Cantidad>{item.cantidad}</Cantidad>
                <BtnSimbolo
                    onClick={() => clickSimbolo(item.nombre, 'suma')}
                >
                    <img src="img/mas.png" alt="Agregar una unidad" style={{maxHeight: '2.5rem'}} />
                </BtnSimbolo>
                <div
                    style={{borderBottom: '1.5px solid var(--colorAzul)', width: '20%', maxWidth: '5rem', margin: 'auto 3rem auto auto'}}
                ></div>
            </ColumnaCantidad>
        </div>
    );
}
 
export default ItemCarrito;