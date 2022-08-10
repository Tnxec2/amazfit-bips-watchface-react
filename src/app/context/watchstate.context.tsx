import {createContext, useReducer} from 'react'
import { WatchState } from '../model/watchState';
import { watchstateActions, watchstateInitialState, watchstateReducer } from './reducer/watchstate.reducer';

export const WatchStateContext = createContext(null);

export interface IWatchStateContext {
  watchState: WatchState,
  updateDate(date: string): void,
  updateTime(date: string): void,
  changeSunriseHours(hours: string): void,
  changeSunriseMinutes(min: string): void,
  changeSunsetHours(hours: string): void,
  changeSunsetMinutes(min: string): void,
  changeSteps(v: string): void,
  changeStepsGoal(v: string): void,
  changeBattery(v: string): void,
  changeCalories(v: string): void,
  changeHeartrate(v: string): void,
  changeDistance(v: string): void,
  changePai(v: string): void,
  changeWeatherIcon(v: string): void,
  changeTemp(v: string): void,
  changeTempMin(v: string): void,
  changeTempMax(v: string): void,
  changeAQI(v: string): void,
  changeHumidity(v: string): void,
  toggleBluetooth(): void,
  toggleAlarm(): void,
  toggleLock(): void,
  toggleDND(): void,
  toggleHeartrateNodata(): void,
  togglePaiNodata(): void,
  toggleSunsetNodata(): void,
  toggleTemperatureAlt(): void,
}

export const WatchstateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchstateReducer, watchstateInitialState);

  const value: IWatchStateContext = {
    watchState: state.watchstate,
    updateDate: (date: string) => {
      dispatch({ type: watchstateActions.CHANGE_DATE, value: date });
    },
    updateTime: (time: string) => {
      dispatch({ type: watchstateActions.CHANGE_TIME, value: time });
    },
    changeSunriseHours: (hours: string) => {
      dispatch({ type: watchstateActions.CHANGE_SUNRISE_HOURS, value: hours });
    },
    changeSunriseMinutes: (min: string) => {
      dispatch({ type: watchstateActions.CHANGE_SUNRISE_MIN, value: min });
    },
    changeSunsetHours: (hours: string) => {
      dispatch({ type: watchstateActions.CHANGE_SUNSET_HOURS, value: hours });
    },
    changeSunsetMinutes: (min: string) => {
      dispatch({ type: watchstateActions.CHANGE_SUNSET_MIN, value: min });
    },
    changeSteps: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_STEPS, value: v });
    },
    changeStepsGoal: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_STEPS_GOAL, value: v });
    },
    changeBattery: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_BATTERY, value: v });
    },
    changeCalories: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_CALORIES, value: v });
    },
    changeHeartrate: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_HEARTRATE, value: v });
    },
    changeDistance: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_DISTANCE, value: v });
    },
    changePai: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_PAI, value: v });
    },
    changeWeatherIcon: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_WEATHER_ICON, value: v });
    },
    changeTemp: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_TEMP, value: v });
    },
    changeTempMin: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_TEMP_MIN, value: v });
    },
    changeTempMax: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_TEMP_MAX, value: v });
    },
    changeAQI: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_AIR_QUALITY, value: v });
    },
    changeHumidity: (v: string) => {
      dispatch({ type: watchstateActions.CHANGE_HUMIDITY, value: v });
    },
    toggleBluetooth: () => {
      dispatch({ type: watchstateActions.TOGGLE_BLUETOOTH});
    },
    toggleAlarm: () => {
      dispatch({ type: watchstateActions.TOGGLE_ALARM});
    },
    toggleDND: () => {
      dispatch({ type: watchstateActions.TOGGLE_DND});
    },
    toggleLock: () => {
      dispatch({ type: watchstateActions.TOGGLE_LOCK});
    },
    toggleHeartrateNodata: () => {
      dispatch({ type: watchstateActions.TOGGLE_HEARTRATE_NODATA});
    },
    togglePaiNodata: () => {
      dispatch({ type: watchstateActions.TOGGLE_PAI_NODATA});
    },
    toggleSunsetNodata: () => {
      dispatch({ type: watchstateActions.TOGGLE_SUNSET_NODATA});
    },
    toggleTemperatureAlt: () => {
      dispatch({ type: watchstateActions.TOGGLE_TEMP_ALT});
    },

  };

  return (
    <WatchStateContext.Provider value={value}>
      {children}
    </WatchStateContext.Provider>
  )
}