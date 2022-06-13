import {createContext, useReducer} from 'react'
import { appActions, appInitialState, appReducer } from './reducer/app.reducer';

export const AppContext = createContext(null);

export interface IAppContext {
  jsonName: string,
  changeJsonName(name: string),
  clearJsonName(),
}

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value: IAppContext = {
    jsonName: state.jsonName,
    changeJsonName: (name: string) => {
      dispatch({ type: appActions.CHANGE_JSON_NAME, jsonName: name });
    },
    clearJsonName: () => {
      dispatch({ type: appActions.CLEAR_JSON_NAME });
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}