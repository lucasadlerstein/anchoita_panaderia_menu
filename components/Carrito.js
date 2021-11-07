import React, {useEffect, useContext, useState} from 'react';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';
import ItemCarrito from './ItemCarrito';
import {withTranslation, i18n} from '../i18n';
import Swal from 'sweetalert2';

const Fondo = styled.div`
    margin: 0 auto;
    width: 95%;
    max-width: 35rem;
    height: 80%;
    background-color: white;
    -webkit-box-shadow: 0px 0px 300px 49px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 300px 49px rgba(0,0,0,1);
    box-shadow: 0px 0px 300px 49px rgba(0,0,0,1);
    position: fixed;
    margin: 0 auto;
    top: 50%;
    bottom: 0;
    right: 0;
    left: 0;
    transform: translate(0, -50%);
    transition: all .3s ease;
    padding: 2rem 1.5rem;
    color: var(--colorAzul);
    z-index: 999;
    overflow: scroll;
`;

const Cerrar = styled.button`
    background-color: transparent;
    border: none;
    font-weight: bold;
    text-align: center;
    margin: 0;
    transition: all .3s ease;
    &:hover {
        transform: rotate(360deg);
    }
    &:focus {
        outline: none;
    }
`;

const Categoria = styled.h5`
    text-transform: uppercase;
    color: var(--colorNaranja);
    font-weight: bold;
    font-size: 1.8rem;
    padding-top: 1rem;
    margin-top: 2rem;
    text-align: center;
    &:first-of-type {
        margin-top: 0;
    }
`;

const BotonesCarrito = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Carrito = ({t}) => {

    const SeleccionContext = useContext(seleccionContext);
    const { carrito, visibilidadCarrito, productosCarrito, vaciarCarrito } = SeleccionContext;

    const [hayComidas, setHayComidas] = useState(false)
    const [hayVinos, setHayVinos] = useState(false)
    const [hayBebidas, setHayBebidas] = useState(false)
    const [hayCocteles, setHayCocteles] = useState(false)

    useEffect(() => {
        if (productosCarrito) {
            productosCarrito.forEach(prod => {
                if (prod.categoria === 'bebidas') {
                    setHayBebidas(true)
                } else if (prod.categoria === 'vinos') {
                    setHayVinos(true)
                } else if (prod.categoria === 'cocteleria') {
                    setHayCocteles(true)
                } else if (prod.categoria === 'comidas') {
                    setHayComidas(true)
                } 
            })
        }
        // eslint-disable-next-line
    }, [])

    function clickVaciarCarrito() {
        Swal.fire({
            title: '¿Estás seguro/a de eliminar todos los productos?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--colorAzul)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito()
                setHayBebidas(false);
                setHayVinos(false);
                setHayCocteles(false);
                setHayComidas(false);
                visibilidadCarrito(true);
            }
          })          
    } 

    return (
        <Fondo id="carrito">
            <BotonesCarrito>
                <Cerrar
                    onClick={() => visibilidadCarrito(carrito)}
                >
                    <img height="20" src="img/cerrar-carrito-icon.png" alt="Cerrar carrito" />
                </Cerrar>
                <Cerrar
                    onClick={() => clickVaciarCarrito()}
                >
                    <img height="30" src="img/vaciar-carrito-icon.png" alt="Vaciar carrito" />
                </Cerrar>
            </BotonesCarrito>
            {
                (hayComidas) ? (
                    <>
                        <Categoria>{t('Secciones.Comidas')}</Categoria> 
                        {productosCarrito.map((item, id) => {
                            if(item.categoria === 'comidas' && item.cantidad !== 0) {
                                return <ItemCarrito key={id} item={item} id={id} />
                            }
                        }
                        )}
                    </>   
                ) : null
            }

            {
                (hayVinos) ? (
                    <>
                        <Categoria>{t('Secciones.Vinos')}</Categoria> 
                        {productosCarrito.map((item, id) => {
                            if(item.categoria === 'vinos' && item.cantidad !== 0) {
                                return <ItemCarrito key={id} item={item} id={id} />
                            }
                        }
                        )}
                    </>   
                ) : null
            }

            {
                (hayCocteles) ? (
                    <>
                        <Categoria>{t('Secciones.Cocteleria')}</Categoria> 
                        {productosCarrito.map((item, id) => {
                            if(item.categoria === 'cocteleria' && item.cantidad !== 0) {
                                return <ItemCarrito key={id} item={item} id={id} />
                            }
                        }
                        )}
                    </>   
                ) : null
            }

            {
                (hayBebidas) ? (
                    <>
                        <Categoria>{t('Secciones.Bebidas')}</Categoria> 
                        {productosCarrito.map((item, id) => {
                            if(item.categoria === 'bebidas' && item.cantidad !== 0) {
                                return <ItemCarrito key={id} item={item} id={id} />
                            }
                        }
                        )}
                    </>
                ) : null
            }   
        </Fondo>
    );
}
 
export default withTranslation('common')(Carrito);