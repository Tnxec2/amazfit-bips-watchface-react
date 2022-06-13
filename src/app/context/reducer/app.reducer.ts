export interface IAppState {
    jsonName?: string
}
export const appInitialState: IAppState = {
  jsonName: null
};

export const appActions = {
  CHANGE_JSON_NAME: "CHANGE_JSON_NAME",
  CLEAR_JSON_NAME: 'CLEAR_JSON_NAME',
};

interface IAction {
    type: string,
    jsonName?: string
}

export const appReducer = (state: IAppState, action: IAction): IAppState => {
    switch (action.type) {
      case appActions.CHANGE_JSON_NAME:
        return {
          ...state, jsonName: action.jsonName
        };
      case appActions.CLEAR_JSON_NAME: {
        return { ...state, jsonName: null };
      }
      default:
        return state;
    }
  };

