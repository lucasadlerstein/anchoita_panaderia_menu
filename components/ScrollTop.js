import React, {useState} from 'react';
import styled from '@emotion/styled';

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

const ScrollTop = () => {
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
                    <Boton
                        onClick={() => scrollTop()}
                    >
                        <img src="/img/subir-icono.png" alt="Scroll hacia arriba" />
                    </Boton>
                ) : null
            }
        </>
        
    );
}
 
export default ScrollTop;