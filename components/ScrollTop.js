import React, {useState} from 'react';
import styled from '@emotion/styled';
import router from 'next/router';
import {withTranslation} from '../i18n';

const Boton = styled.button`
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    background-color: transparent;
    border: none;
    width: 6rem;
    height: 6rem;
    transition: all .5s ease;
    &:focus {
        outline: none;
    }
`;

const VolverBtn = styled.button`
    color: var(--colorAzul);
    position: fixed;
    left: 2rem;
    bottom: 2.5rem;
    border: none;
    font-size: 1.6rem;
    font-weight: bold;
    z-index: 999;
    border-radius: 3rem;
    padding: 1rem 2rem;
    background-color: #cacaca;  
    transition: all .3s ease;
    &:hover {
        background-color: #f0f0f0;
    }
    &:focus {
        outline: none;
    }
`;

const ScrollTop = ({t}) => {
    const [mostrarScroll, setMostrarScroll] = useState(false)
    
    function chequearScroll() {
        if (!mostrarScroll && window.pageYOffset > 400){
            setMostrarScroll(true)    
        } else if (mostrarScroll && window.pageYOffset <= 400){
            setMostrarScroll(false)    
        }  
    }

    if(typeof window !== "undefined") {
        window.addEventListener('scroll', chequearScroll)
    }

    const scrollTop = () => {
        setMostrarScroll(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };


    return (
        <>
            {
                mostrarScroll ? (
                    <>
                        <VolverBtn
                            onClick={() => router.push(`/`)}
                        >{t('Alternativos.Volver')}</VolverBtn>
                        <Boton
                            onClick={() => scrollTop()}
                        >
                            <img src="/img/subir-icono.png" alt="Scroll hacia arriba" />
                        </Boton>
                    </>
                ) : null
            }
        </>
        
    );
}
 
// export default ScrollTop;
export default withTranslation('common')(ScrollTop);
