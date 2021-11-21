import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Container} from 'reactstrap';
import NavegacionMenu from '../components/NavegacionMenu';
import EleccionContenido from '../components/EleccionContenido';
import MenuContenido from '../components/MenuContenido';
import VinosContenido from '../components/VinosContenido';
import seleccionContext from '../context/seleccion/seleccionContext';
import Carrito from '../components/Carrito';
import clienteAxios from '../config/axios';
import styled from '@emotion/styled';
import Head from 'next/head';
import {withTranslation} from '../i18n';
import Link from 'next/link';
import ScrollTop from '../components/ScrollTop';
import PropTypes from 'prop-types'

const Menu = ({t}) => {

    const SeleccionContext = useContext(seleccionContext);
    const { etapa, v_pais, v_tipo, carrito, visibilidadCarrito, getStorage, cambiarBusqueda, busqueda, shake, productosCarrito, cambiarSeleccion } = SeleccionContext;
    
    const [buscador, setBuscador] = useState(false);

    const [items, setItems] = useState([]);
    const [stickyHeader, setStickyHeader] = useState(false)
    
    function chequearScroll() {
        if (!stickyHeader && window.pageYOffset > 100){
            if (etapa === 'vinos') {
                document.querySelector('body').classList.remove('mt-0');
                document.querySelector('body').classList.remove('mt-15r');
                document.querySelector('body').classList.add('mt-18r');                
            } else {
                document.querySelector('body').classList.remove('mt-0');
                document.querySelector('body').classList.remove('mt-18r');
                document.querySelector('body').classList.add('mt-15r');
            }
            setStickyHeader(true)
        } else if (stickyHeader && window.pageYOffset <= 100){
            setStickyHeader(false)
            document.querySelector('body').classList.remove('mt-15r');
            document.querySelector('body').classList.remove('mt-18r');
            document.querySelector('body').classList.add('mt-0');
        }  
    }

    if(typeof window !== "undefined") {
        window.addEventListener('scroll', chequearScroll)
    }

    useEffect(() => {
        // if(localStorage.getItem('carrito')) {
        //     getStorage();
        // }
        async function traerInfo() {
            await clienteAxios.get('/panaderia/todos')
                .then(resp => { setItems(resp.data.items); })
                .catch(err => { console.log('PAN-404-PAN'); })

        }
        // function llenarStates() {
        //     if(etapa === '' || etapa === null) {
        //         cambiarSeleccion('etapa', 'comidas');
        //     }
        // }
        traerInfo();
        // llenarStates();
        // eslint-disable-next-line
    }, [])


    const cTodas = [
        { nombre: t('CatMenuPanaderia.Cafeteria'), codigo: 'cafeteria', id: 1 },
        { nombre: t('CatMenuPanaderia.Bebidas'), codigo: 'bebidas', id: 2 },
        { nombre: t('CatMenuPanaderia.Panaderia'), codigo: 'panaderia', id: 3 },
        { nombre: t('CatMenuPanaderia.Sandwiches'), codigo: 'sandwiches', id: 4 },
        { nombre: t('CatMenuPanaderia.Helados'), codigo: 'helados', id: 5 },
    ]

    const BuscadorInput = styled.input`
        border: none;
        border-bottom: 1px solid var(--colorAzul);
        color: var(--colorAzul);
        background-color: transparent;
        width: calc(98% - 1.2rem);
        &:focus {
            outline: none;
        }
    `;

    const RowPersonalizada = styled(Row)`
        /* background-color: var(--colorAzul); */
        background-color: white;
        position: sticky;
        top: 0;
        z-index: 998;
        padding: 1rem 0;
        /* padding: 2rem 0; */
        min-height: 8rem;
        margin: 0;
        /* border-bottom: 1px solid var(--colorAzul); */
        -webkit-box-shadow: 0px 10px 32px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 0px 10px 32px 0px rgba(0,0,0,0.15);
        box-shadow: 0px 10px 32px 0px rgba(0,0,0,0.15);

    `;

    const Notificacion = styled.span`
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        padding: .5rem;
        border-radius: 100%;
        background: var(--colorNaranja);
        color: white;
    `;

    const FooterDireccion = styled.p`
      text-align: center;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      margin-top: 2rem;
    `;

    const handleChangeBusqueda = e => {
        cambiarBusqueda(e.target.value)
    }

    return (

        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>{t('SEO.Titulo')}</title>
                <meta name="description" content={t('SEO.Descripcion')} />
                <meta name="keywords" content={t('SEO.Keywords')} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;0,700;1,300&display=swap" rel="stylesheet" />

                <link
                    rel="preload"
                    href="/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/RobotoCondensed/RobotoCondensed-Bold.ttf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/Henderson/Henderson-Sans-Regular.otf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/Henderson/Henderson-Sans-Bold.otf"
                    as="font"
                    crossOrigin=""
                />
            </Head>
            <Container className="py-5r" style={{paddingTop: '10rem'}}>
                <RowPersonalizada>
                    <Col xs={buscador ? 7 : 2} className={`my-auto ${buscador ? 'text-center' : 'text-right'}`}>
                        { buscador ? (
                            <BuscadorInput type="text" autoFocus value={busqueda} onChange={handleChangeBusqueda} />
                        ) : null }
                        {
                            buscador ? (
                                <a
                                    style={{color: 'var(--colorAzul)'}}
                                    onClick={() => {
                                        setBuscador(!buscador)
                                        cambiarBusqueda('')
                                }}>X</a>
                            ) : (
                                <a onClick={() => setBuscador(!buscador)}>
                                    {/* <img src="img/search-icon.png" alt={t('Alternativos.Buscar')} style={{width: '2rem'}} /> */}
                                    <svg fill="none" height="24" stroke="#103149" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10.5" cy="10.5" r="7.5"/>
                                        <line x1="21" x2="15.8" y1="21" y2="15.8"/>
                                    </svg>
                                </a>
                            )
                        }
                    </Col>
                    <Col xs={buscador ? 4 : 8} className={`text-center ${buscador ? 'px-0' : ''}`}>
                        <Link href="/">
                            <a>
                                <img src="img/logo-menu.png" alt="Logo Anchoita" style={{maxHeight: '7rem'}} />
                            </a>
                        </Link>
                    </Col>
                </RowPersonalizada>

                {/* { (etapa !== null) ? <EleccionContenido
                    cPlatos={cPlatos} cCocteleria={cCocteleria} cVinos={cVinos} cBebidas={cBebidas}
                /> : null } */}
                
                {/* {
                    (etapa === 'comidas' && v_tipo !== null) ? (
                        <MenuContenido contenido={platos} tipo={v_tipo} categorias={cPlatos} etapa={etapa} />
                    ) : null
                } */}
                    <MenuContenido contenido={items} tipo={v_tipo} categorias={cTodas} etapa={etapa} />
                {/* {
                    (etapa === 'vinos' && v_tipo !== null && v_pais !== null) ? (
                        <VinosContenido contenido={vinos} tipo={v_tipo} pais={v_pais} categorias={cVinos} etapa={etapa} />
                    ) : null
                } */}

                {/* {
                    (etapa === 'cocteleria' && v_tipo !== null) ? (
                        <MenuContenido contenido={cocteles} tipo={v_tipo} categorias={cCocteleria} etapa={etapa} />
                    ) : null
                } */}

                {/* {
                    (etapa === 'bebidas') ? (
                        <MenuContenido contenido={cocteles} tipo={v_tipo} categorias={cBebidas} etapa={etapa} />
                    ) : null
                } */}

                {/* { (carrito) ? <Carrito /> : null } */}

                <ScrollTop />
                <FooterDireccion>Aguirre 1562 • Chacarita • Buenos Aires</FooterDireccion>
            </Container>
        </>
    );
}

// Menu.getInitialProps = async () => ({
//     namespacesRequired: ['common'],
// });
 
export default withTranslation('common')(Menu);