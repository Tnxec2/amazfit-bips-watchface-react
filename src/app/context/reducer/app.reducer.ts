export interface IAppState {
    jsonName?: string
}
export const appInitialState: IAppState = {
  jsonName: null
};

export enum appActionsEnum {
  CHANGE_JSON_NAME,
  CLEAR_JSON_NAME,
};

interface IAction {
    type: appActionsEnum,
    jsonName?: string
}

export const appReducer = (state: IAppState, action: IAction): IAppState => {
    switch (action.type) {
      case appActionsEnum.CHANGE_JSON_NAME:
        return {
          ...state, jsonName: action.jsonName
        };
      case appActionsEnum.CLEAR_JSON_NAME: {
        return { ...state, jsonName: null };
      }
      default:
        return state;
    }
  };

