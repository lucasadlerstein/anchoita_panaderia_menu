import React, {useContext} from 'react';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';
import {withTranslation} from '../i18n';

const Nav = styled.div`
    /* display: inline-block; */
`;

const Item = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: all .3s ease;
    &:hover {
        color: var(--colorNaranja);
    }
    &:focus {
        outline: none;
    }
    @media (min-width: 400px){
        font-size: 1.3rem;
    }
    @media (min-width: 440px){
        font-size: 1.5rem;
    }

`;

const NavSecundario = styled(Nav)`
    border-top: 1px solid #7a7a7a;
    padding-top: 1rem;
    margin-top: 1rem;
`;

const ItemSec = styled(Item)`
    /* padding: 0 1rem;
    border-right: 1px solid #7a7a7a;
    line-height: 1.5rem;
    &:last-of-type {
        border-right: none;
    } */
`;

const Todo = styled.div`
    background-color: var(--colorAzul);
    position: sticky;
    top: 7.8rem;
    z-index: 998;
`;

const NavegacionMenu = ({t}) => {

    const SeleccionContext = useContext(seleccionContext);
    const { cambiarSeleccion, etapa, v_pais, v_tipo } = SeleccionContext;
    
    return (
        <Todo className="pb-5 mx-auto text-center">
            <Nav>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'comidas')}
                    className={etapa === 'comidas' ? 'activo' : null}
                >{t('Secciones.Comidas')}</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'vinos')}
                    className={etapa === 'vinos' ? 'activo' : null}
                >{t('Secciones.Vinos')}</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'cocteleria')}
                    className={etapa === 'cocteleria' ? 'activo' : null}
                >{t('Secciones.Cocteleria')}</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'bebidas')}
                    className={etapa === 'bebidas' ? 'activo' : null}
                >{t('Secciones.Bebidas')}</Item>
            </Nav>

            {
                etapa === 'vinos' ? (
                    <NavSecundario>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'copa')}
                            className={v_pais === 'copa' ? 'activo' : null}
                        >{t('Secciones.Lugares.Copa')}</Item>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'argentina')}
                            className={v_pais === 'argentina' ? 'activo' : null}
                        >{t('Secciones.Lugares.Argentina')}</Item>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'mundo')}
                            className={v_pais === 'mundo' ? 'activo' : null}
                        >{t('Secciones.Lugares.Mundo')}</Item>
                    </NavSecundario>
                ) : null
            }
        </Todo>
    );
}
 
export default withTranslation('common')(NavegacionMenu);