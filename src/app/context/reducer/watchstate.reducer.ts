import { digitTypes } from "../../model/watchFace.bips.model";
import { WatchState } from "../../model/watchState";

export interface IWatchStateState {
    watchstate: WatchState
}

export const watchstateInitialState: IWatchStateState = {
  watchstate: new WatchState()
};

export enum watchstateActions {
  CHANGE_STEPS,
  CHANGE_STEPS_GOAL,
  CHANGE_BATTERY,
  CHANGE_CALORIES,
  CHANGE_HEARTRATE,
  CHANGE_DISTANCE,
  CHANGE_PAI,
  CHANGE_DATE,
  CHANGE_TIME,
  CHANGE_SUNRISE_HOURS,
  CHANGE_SUNRISE_MIN,
  CHANGE_SUNSET_HOURS,
  CHANGE_SUNSET_MIN,
  CHANGE_WEATHER_ICON,
  CHANGE_TEMP,
  CHANGE_TEMP_MIN,
  CHANGE_TEMP_MAX,
  CHANGE_AIR_QUALITY,
  CHANGE_HUMIDITY,
  TOGGLE_BLUETOOTH,
  TOGGLE_ALARM,
  TOGGLE_LOCK,
  TOGGLE_DND,
};

interface IAction {
    type: watchstateActions,
    value?: any
}

export const watchstateReducer = (state: IWatchStateState, action: IAction): IWatchStateState => {
    switch (action.type) {
      case watchstateActions.CHANGE_DATE:
        return {
          ...state, watchstate: updateDate(state.watchstate, action.value)
        };
      case watchstateActions.CHANGE_TIME:
        return {
          ...state, watchstate: updateTime(state.watchstate, action.value)
        };
      case watchstateActions.CHANGE_STEPS:
        return {
          ...state, watchstate: {...state.watchstate, steps: parseValue(action.value, 99999)}
        };
      case watchstateActions.CHANGE_STEPS_GOAL:
        return {
          ...state, watchstate: {...state.watchstate, stepsGoal: parseValue(action.value, 99999)}
        };
      case watchstateActions.CHANGE_BATTERY:
        return {
          ...state, watchstate: {...state.watchstate, battery: parseValue(action.value, 100)}
        };
      case watchstateActions.CHANGE_CALORIES:
        return {
          ...state, watchstate: {...state.watchstate, calories: parseValue(action.value, 9999)}
        };
      case watchstateActions.CHANGE_HEARTRATE:
        return {
          ...state, watchstate: {...state.watchstate, hearthrate: parseValue(action.value, 220)}
        };
      case watchstateActions.CHANGE_DISTANCE:
        return {
          ...state, watchstate: {...state.watchstate, distance: parseValue(action.value, 9999)}
        };
      case watchstateActions.CHANGE_PAI:
        return {
          ...state, watchstate: {...state.watchstate, pai: parseValue(action.value, 999)}
        };
      case watchstateActions.CHANGE_SUNRISE_HOURS:
        return {
          ...state, watchstate: {...state.watchstate, sunriseHours: parseValue(action.value, 23)}
        };
      case watchstateActions.CHANGE_SUNRISE_MIN:
        return {
          ...state, watchstate: {...state.watchstate, sunriseMinutes: parseValue(action.value, 59)}
        };
      case watchstateActions.CHANGE_SUNSET_HOURS:
        return {
          ...state, watchstate: {...state.watchstate, sunsetHours: parseValue(action.value, 23)}
        };
      case watchstateActions.CHANGE_SUNSET_MIN:
        return {
          ...state, watchstate: {...state.watchstate, sunsetMinutes: parseValue(action.value, 59)}
        };
      case watchstateActions.CHANGE_WEATHER_ICON:
        return {
          ...state, watchstate: {...state.watchstate, weatherIcon: parseValue(action.value, digitTypes.weather.imageProgressTotal)}
        };
      case watchstateActions.CHANGE_TEMP:
        return {
          ...state, watchstate: {...state.watchstate, temperature: parseValue(action.value, 99)}
        };
      case watchstateActions.CHANGE_TEMP_MIN:
        return {
          ...state, watchstate: {...state.watchstate, temperatureMin: parseValue(action.value, 99)}
        };
      case watchstateActions.CHANGE_TEMP_MAX:
        return {
          ...state, watchstate: {...state.watchstate, temperatureMax: parseValue(action.value, 99)}
        };
      case watchstateActions.CHANGE_AIR_QUALITY:
        return {
          ...state, watchstate: {...state.watchstate, airQuality: parseValue(action.value, 500)}
        };
      case watchstateActions.CHANGE_HUMIDITY:
        return {
          ...state, watchstate: {...state.watchstate, humidity: parseValue(action.value, 100)}
        };
      case watchstateActions.TOGGLE_BLUETOOTH:
        return {
          ...state, watchstate: {...state.watchstate, bluetooth: !state.watchstate.bluetooth}
        };
      case watchstateActions.TOGGLE_ALARM:
        return {
          ...state, watchstate: {...state.watchstate, alarm: !state.watchstate.alarm}
        };
      case watchstateActions.TOGGLE_LOCK:
        return {
          ...state, watchstate: {...state.watchstate, lock: !state.watchstate.lock}
        };
      case watchstateActions.TOGGLE_DND:
        return {
          ...state, watchstate: {...state.watchstate, dnd: !state.watchstate.dnd}
        };
      default:
        return state;
    }
  };

  function updateDate(state: WatchState, d: string): WatchState {
    let date = new Date(d);
    const ws = { ...state };
    ws.year = date.getFullYear();
    ws.month = date.getMonth() + 1;
    ws.monthasword = date.getMonth();
    ws.day = date.getDate();
    ws.weekday = date.getDay() > 0 ? date.getDay() - 1 : 6;
    return ws
  }

  function updateTime(state: WatchState, t: string): WatchState {
    let [h, m, s] = t.split(":");
    const ws = { ...state };
    if (!isNaN(parseInt(h))) ws.hours = parseInt(h);
    if (!isNaN(parseInt(m))) ws.minutes = parseInt(m);
    if (!isNaN(parseInt(s))) ws.seconds = parseInt(s);
    return ws
  }

  const parseValue = (e: string, max?: number) => {
    const v = parseInt(e);
    return !isNaN(v) ? (max ? Math.min(v, max) : v) : 0;
  }