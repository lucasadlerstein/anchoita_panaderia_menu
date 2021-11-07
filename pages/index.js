import React, {useContext} from 'react';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {i18n, withTranslation} from '../i18n';
import PropTypes from 'prop-types'

const Logo = styled.img`
  max-width: 17rem;
  margin: 0 auto 5.5rem auto;
  text-align: center;
`;

const Lista = styled.ul`
  text-align: left;
  li {
    padding: 1rem 0;
    border-bottom: 1px solid #7a7a7a;
    text-transform: uppercase;
    span {
      color: #7a7a7a;
    }
  }
  li:last-of-type{
    border-bottom: 1px solid transparent;
  }
`;

const ListaSubItems = styled.ul`
  li {
    border: none;
    padding: .2rem;
    text-transform: none;
  }
`;

const BotonIdioma = styled.button`
  background-color: transparent;
  border: none;
  text-transform: uppercase;
  margin: 5rem auto 0 auto;
  text-align: center;
  color: white;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const Todo = styled.div`
  width: 60%;
  max-width: 30rem;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Inicio = ({t}) => {

  const SeleccionContext = useContext(seleccionContext);
  const { cambiarSeleccion, etapa } = SeleccionContext;

  const router = useRouter();

  const clickEtapaInicial = selec => {
    // cambiarSeleccion('etapa', selec);
    router.push(`/menu?categoria=${selec}`);
  }

  // const clickVinosInicial = selec => {
  //   cambiarSeleccion('etapa', 'vinos');
  //   cambiarSeleccion('v_pais', selec)
  //   router.push(`/menu`);
  // }

  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{t('SEO.Titulo')}</title>
      <meta name="description" content={t('SEO.Descripcion')} />
      <meta name="keywords" content={t('SEO.Keywords')} />
      {/* <meta name="robots" content="index, follow" /> */}
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
    <Todo>
      <Logo src="img/logo.png" alt="Logo Anchoita" />
      <Lista>
        <li><span>01. </span>
          <a
            onClick={() => clickEtapaInicial('cafeteria')}
          >{t('CatMenuPanaderia.Cafeteria')}</a>
        </li>
        {/* <li><span>02. </span>
          <a onClick={etapa === 'vinos' ? () => cambiarSeleccion('etapa', null) : () => cambiarSeleccion('etapa', 'vinos')}>
          {t('Secciones.Vinos')}
          </a>
          {
            etapa === 'vinos' ? (
              <ListaSubItems>
                <li>
                  <a
                    onClick={() => clickVinosInicial('copa')}
                  >
                    {t('Secciones.Lugares.Copa')}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => clickVinosInicial('argentina')}
                  >
                    {t('Secciones.Lugares.Argentina')}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => clickVinosInicial('mundo')}
                  >
                    {t('Secciones.Lugares.Mundo')}
                  </a>
                </li>
              </ListaSubItems>
            ) : null
          }
        </li> */}
        <li><span>02. </span>
          <a
            onClick={() => clickEtapaInicial('bebidas')}
          >
            {t('CatMenuPanaderia.Bebidas')}
          </a>
        </li>
        <li><span>03. </span>
          <a
            onClick={() => clickEtapaInicial('panaderia')}
          >
            {t('CatMenuPanaderia.Panaderia')}
          </a>
        </li>
        <li><span>04. </span>
          <a
            onClick={() => clickEtapaInicial('sandwiches')}
          >
            {t('CatMenuPanaderia.Sandwiches')}
          </a>
        </li>
        <li><span>05. </span>
          <a
            onClick={() => clickEtapaInicial('helados')}
          >
            {t('CatMenuPanaderia.Helados')}
          </a>
        </li>
      </Lista>
      <BotonIdioma
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      >{i18n.language === 'en' ? 'MENÚ EN ESPAÑOL' : 'ENGLISH MENU'}</BotonIdioma>
    </Todo>
    </>
  );
}

Inicio.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

Inicio.propTypes = {
  t: PropTypes.func.isRequired,
}
 
export default withTranslation('common')(Inicio);