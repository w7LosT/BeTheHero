import 'intl'; //essa importação e a abaixo são para usar o Intl no android
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}

