import React from 'react';

import Error_03 from '../../images/error_03.gif';
import { Header, ButtonLink, Center } from '../../components';

const PageNotFound = () => (
  <Center>
    <Header centered>Ops!</Header>
    <div>
      <img src={Error_03} alt='Error' />
    </div>
    <ButtonLink to='/'>Voltar pra o Inicio</ButtonLink>
  </Center>
);
export default PageNotFound;
