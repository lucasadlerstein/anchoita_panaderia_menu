import SeleccionState from '../context/seleccion/seleccionState';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/animaciones.css'
import '../styles/globals.css'

import { appWithTranslation } from '../i18n'

function MyApp({ Component, pageProps }) {
  return (
    <SeleccionState>
      <Component {...pageProps} />
    </SeleccionState>
  ) 
}

export default appWithTranslation(MyApp);