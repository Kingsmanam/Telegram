import React from 'react';
import App from '../../App';
import {ContextProvider} from './Context';


export default AppWrapper = () => {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
};
