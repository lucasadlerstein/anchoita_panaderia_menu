import React, {useReducer, useState, useEffect} from 'react';
import seleccionContext from './seleccionContext';
import seleccionReducer from './seleccionReducer';
import { NUEVA_ETAPA, NUEVA_V_PAIS, NUEVA_V_TIPO, VISIBILIDAD_CARRITO, VACIAR_CARRITO, CAMBIAR_CANTIDAD, AGREGAR_NUEVO, GET_STORAGE, CAMBIAR_BUSQUEDA, CAMBIAR_SHAKE } from '../../types/index';

const SeleccionState = ({children}) => {

    const stateInicial = {
        etapa: 'comidas',
        v_pais: null,
        v_tipo: null,
        carrito: false,
        shake: false,
        busqueda: '',
        productosCarrito: [
            // {
            //     categoria: 'comidas',
            //     nombre: 'Bla bla bla',
            //     cantidad: 1
            // },
            // {
            //     categoria: 'comidas',
            //     nombre: 'Bla bla blassss s s',
            //     cantidad: 1
            // },
        ]
    }

    const [state, dispatch] = useReducer(seleccionReducer, stateInicial);

    const cambiarSeleccion = (llave, valor) => {
        if (llave === 'etapa') {
            dispatch({
                type: NUEVA_ETAPA,
                payload: valor
            })
        } else if (llave === 'v_tipo') {
            dispatch({
                type: NUEVA_V_TIPO,
                payload: valor
            })
        } else if (llave === 'v_pais') {
            dispatch({
                type: NUEVA_V_PAIS,
                payload: valor
            })
        }
    }

    const visibilidadCarrito = (estado) => {
        dispatch({
            type: VISIBILIDAD_CARRITO,
            payload: !estado
        })
    }

    const vaciarCarrito = () => {
        dispatch({
            type: VACIAR_CARRITO
        })
    }

    const cambiarCantidad = (nombre, operacion) => {
        const info = { nombre, operacion }
        dispatch({
            type: CAMBIAR_CANTIDAD,
            payload: info
        })
        actualizarStorage();
        setTimeout(() => {
            dispatch({
                type: CAMBIAR_SHAKE
            })
        }, 1200);
    }

    const agregarNuevo = (informacion) => {
        let existe = false;
        state.productosCarrito.forEach(producto => {
            if(producto.nombre === informacion.nombre) {
                existe = true;
            }
        })
        if(existe) {
            const info = { 
                nombre: informacion.nombre, 
                operacion: 'suma'
            }
            dispatch({
                type: CAMBIAR_CANTIDAD,
                payload: info
            })
        } else {
            dispatch({
                type: AGREGAR_NUEVO,
                payload: informacion
            })
        }
        actualizarStorage();
        setTimeout(() => {
            dispatch({
                type: CAMBIAR_SHAKE
            })
        }, 1200);
    }

    const actualizarStorage = () => {
        setTimeout(() => {
            localStorage.setItem('carrito', JSON.stringify(state.productosCarrito));
        }, 500);
    }

    const getStorage = () => {
        dispatch({
            type: GET_STORAGE,
            payload: JSON.parse(localStorage.getItem('carrito'))
        })
    }

    const cambiarBusqueda = (typeado) => {
        dispatch({
            type: CAMBIAR_BUSQUEDA,
            payload: typeado
        })
    }

    return (
        <seleccionContext.Provider
            value={{
                etapa: state.etapa,
                v_pais: state.v_pais,
                v_tipo: state.v_tipo,
                carrito: state.carrito,
                productosCarrito: state.productosCarrito,
                busqueda: state.busqueda,
                shake: state.shake,
                cambiarSeleccion,
                visibilidadCarrito,
                vaciarCarrito,
                cambiarCantidad,
                agregarNuevo,
                actualizarStorage,
                getStorage,
                cambiarBusqueda,
            }}
        >
            {children}
        </seleccionContext.Provider>
    )
}

export default SeleccionState;