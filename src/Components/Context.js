import React, {createContext, useState} from 'react';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [toastShown, setToastShown] = useState(false);
  const [subtext, setSubtext] = useState('')
  return (
    <Context.Provider value={[toastShown, setToastShown, subtext, setSubtext]}>
      {children}
    </Context.Provider>
  );
};
