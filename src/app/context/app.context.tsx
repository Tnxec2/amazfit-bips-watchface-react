import {createContext, useReducer} from 'react'
import { appActionsEnum, appInitialState, appReducer } from './reducer/app.reducer';

export const AppContext = createContext(null);

export interface IAppContext {
  jsonName: string,
  changeJsonName(name: string): void,
  clearJsonName(): void,
}

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value: IAppContext = {
    jsonName: state.jsonName,
    changeJsonName: (name: string) => {
      dispatch({ type: appActionsEnum.CHANGE_JSON_NAME, jsonName: name });
    },
    clearJsonName: () => {
      dispatch({ type: appActionsEnum.CLEAR_JSON_NAME });
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}