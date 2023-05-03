import { WatchFace } from "../../model/watchFace.bips.model";

export interface IWatchfaceState {
    watchface: WatchFace
}

export const watchfaceInitialState: IWatchfaceState = {
  watchface: new WatchFace()
};

export enum watchfaceActionsEnum {
  SET_WATCHFACE_FROM_JSON,
  CLEAR_WATCHFACE,
  UPDATE_BACKGROUND,
  TOGGLE_BACKGROUND,
  TOGGLE_TIME_DIGITAL,
  UPDATE_AMPM,
  UPDATE_DRAWING_ORDER_TIME,
  UPDATE_HOURS_DIGITAL,
  UPDATE_MINUTES_DIGITAL,
  UPDATE_SECONDS_DIGITAL,
  TOGGLE_SUNRISE,
  UPDATE_SUNRISE_HOURS,
  UPDATE_SUNRISE_MINUTES,
  UPDATE_SUNSET_HOURS,
  UPDATE_SUNSET_MINUTES, 
  UPDATE_SUNRISE_HOURS_NODATA,
  UPDATE_SUNRISE_MINUTES_NODATA,
  UPDATE_SUNSET_HOURS_NODATA,
  UPDATE_SUNSET_MINUTES_NODATA,
  UPDATE_ANALOG_HOURS,
  UPDATE_ANALOG_MINUTES,
  UPDATE_ANALOG_SECONGS,
  UPDATE_ANALOG_AMPM,
  TOGGLE_ANALOG,
  TOGGLE_DATE,
  TOGGLE_DATEEXT,
  TOGGLE_DATEALT,
  UPDATE_DAY,
  UPDATE_MONTH,
  UPDATE_MONTH_AS_WORD,
  UPDATE_WEEKDAY,
  UPDATE_ONELINE_MONTH,
  UPDATE_ONELINE_DATE_DELIMITER,
  UPDATE_TWODIGITS_MONTH,
  UPDATE_TWODIGITS_DAY,
  UPDATE_SEPARATED_DAY,
  UPDATE_SEPARATED_MONTH,
  UPDATE_SEPARATED_YEAR,
  UPDATE_WEEKDAY_PROGRESS,
  UPDATE_DAY_ALT,
  UPDATE_MONTH_ALT,
  TOGGLE_ACTIVITY,
  TOGGLE_ACTIVITY_NUMBER,
  TOGGLE_STEP_PROGRESS,
  TOGGLE_PULSE_PROGRESS,
  UPDATE_STEPS,
  UPDATE_STEPPROGRESS,
  UPDATE_PULSE,
  UPDATE_PULSE_PROGRESS,
  UPDATE_CALORIES,
  UPDATE_STEPSPERCENTAGE,
  UPDATE_DISTANCE,
  UPDATE_STEP_GOAL,
  TOGGLE_ACTIVITY_ALT,
  UPDATE_ALT_STEPS,
  UPDATE_ALT_CALORIES,
  UPDATE_ALT_PULSE,
  UPDATE_ALT_DISTANCE,
  UPDATE_ALT_BATTERY,
  UPDATE_ALT_BATTERY_SUFFIX,
  UPDATE_ALT_PULSE_NO_DATA,
  UPDATE_ALT_DISTANCE_DECIMAL_POINTER,
  UPDATE_ALT_DISTANCE_SUFFIX,
  UPDATE_ALT_ICON1,
  UPDATE_ALT_ICON2,
  UPDATE_ALT_ICON3,
  UPDATE_ALT_ICON4,
  UPDATE_ALT_ICON5,
  TOGGLE_STATUS,
  UPDATE_BLUETOOTH,
  UPDATE_ALARM,
  UPDATE_LOCK,
  UPDATE_DND,
  TOGGLE_BATTERY,
  UPDATE_BATTERY_DIGIT,
  UPDATE_BATTERY_ICON,
  UPDATE_BATTERY_ICON_PROGRESS,
  UPDATE_BATTERY_CIRCLE,
  TOGGLE_WEATHER,
  TOGGLE_WEATHER_TEMP,
  UPDATE_WEATHER_CURRENT,
  UPDATE_WEATHER_ICON,
  UPDATE_WEATHER_ONE_LINE,
  UPDATE_WEATHER_NIGHT,
  UPDATE_WEATHER_DAY,
  UPDATE_WEATHER_NIGHT_ALT_COORDS,
  UPDATE_WEATHER_DAY_ALT_COORDS,
  UPDATE_WEATHER_AQI,
  UPDATE_WEATHER_HUMIDITY,
  TOGGLE_PAI,
  UPDATE_PAI_IMAGE_LOW,
  UPDATE_PAI_IMAGE_NORMAL,
  UPDATE_PAI_IMAGE_HIGH,
  UPDATE_PAI_NUMBER_LOW,
  UPDATE_PAI_NUMBER_NORMAL,
  UPDATE_PAI_NUMBER_HIGH,
  UPDATE_PAI_NUMBER_GENERAL,
  UPDATE_PAI_IMAGE_NODATA,
  TOGGLE_CALORIES_PROGRESS,
  UPDATE_CALORIES_GOALIMAGE,
  UPDATE_CALORIES_ICON,
  UPDATE_CALORIES_CIRCLE,
};

interface IAction {
    type: watchfaceActionsEnum,
    value?: any
}

export const watchfaceReducer = (state: IWatchfaceState, action: IAction): IWatchfaceState => {
    switch (action.type) {
      case watchfaceActionsEnum.TOGGLE_BACKGROUND:
        return {
          ...state, watchface: {...state.watchface, background: {...state.watchface.background, collapsed: !state.watchface.background.collapsed}}
        };
      case watchfaceActionsEnum.UPDATE_BACKGROUND:
        return {
          ...state, watchface: {...state.watchface, background: {...action.value}}
        };
        //
        // Time
        //
      case watchfaceActionsEnum.TOGGLE_TIME_DIGITAL:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, collapsed: !state.watchface.time.collapsed}}
        };
      case watchfaceActionsEnum.UPDATE_DRAWING_ORDER_TIME:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, drawingOrder: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_HOURS_DIGITAL:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, hours: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_MINUTES_DIGITAL:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, minutes: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SECONDS_DIGITAL:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, seconds: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_AMPM:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, ampm: action.value}}
        };
      case watchfaceActionsEnum.TOGGLE_SUNRISE:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, collapsedSunrise: !state.watchface.time.collapsedSunrise}}
        };
      case watchfaceActionsEnum.UPDATE_SUNRISE_HOURS:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunriseHours: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNRISE_MINUTES:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunriseMinutes: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNSET_HOURS:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunsetHours: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNSET_MINUTES:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunsetMinutes: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNRISE_HOURS_NODATA:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunriseHoursNoData: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNRISE_MINUTES_NODATA:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunriseMinutesNoData: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNSET_HOURS_NODATA:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunsetHoursNoData: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SUNSET_MINUTES_NODATA:
        return {
          ...state, watchface: {...state.watchface, time: {...state.watchface.time, sunsetMinutesNoData: action.value}}
        };
      case watchfaceActionsEnum.TOGGLE_ANALOG:
        return {
          ...state, watchface: {...state.watchface, analogTime: {...state.watchface.analogTime, collapsed: ! state.watchface.analogTime.collapsed}}
        };
      case watchfaceActionsEnum.UPDATE_ANALOG_HOURS:
        return {
          ...state, watchface: {...state.watchface, analogTime: {...state.watchface.analogTime, hours: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ANALOG_MINUTES:
        return {
          ...state, watchface: {...state.watchface, analogTime: {...state.watchface.analogTime, minutes: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ANALOG_SECONGS:
        return {
          ...state, watchface: {...state.watchface, analogTime: {...state.watchface.analogTime, seconds: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ANALOG_AMPM:
        return {
          ...state, watchface: {...state.watchface, analogTime: {...state.watchface.analogTime, ampm: action.value}}
        };

      // Date

      case watchfaceActionsEnum.TOGGLE_DATE:
          return {
            ...state, watchface: {...state.watchface, date: {...state.watchface.date, collapsed: ! state.watchface.date.collapsed}}
          };
      case watchfaceActionsEnum.TOGGLE_DATEALT:
          return {
            ...state, watchface: {...state.watchface, date: {...state.watchface.date, collapsedAlt: ! state.watchface.date.collapsedAlt}}
          };
      case watchfaceActionsEnum.TOGGLE_DATEEXT:
          return {
            ...state, watchface: {...state.watchface, dateExtended: {...state.watchface.dateExtended, collapsed: ! state.watchface.dateExtended.collapsed}}
          };
      case watchfaceActionsEnum.UPDATE_DAY:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, day: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_MONTH:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, month: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_MONTH_AS_WORD:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, montName: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_WEEKDAY:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, weekday: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ONELINE_MONTH:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, oneLine: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ONELINE_DATE_DELIMITER:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, oneLineDelimiter: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_TWODIGITS_DAY:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, twoDigitsDay: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_TWODIGITS_MONTH:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, twoDigitsMonth: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_DAY_ALT:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, dayAlt: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_WEEKDAY_PROGRESS:
        return {
          ...state, watchface: {...state.watchface, weekdayicon: action.value}
        };
      case watchfaceActionsEnum.UPDATE_MONTH_ALT:
        return {
          ...state, watchface: {...state.watchface, date: {...state.watchface.date, monthAlt: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SEPARATED_DAY:
        return {
          ...state, watchface: {...state.watchface, dateExtended: {...state.watchface.dateExtended, day: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SEPARATED_MONTH:
        return {
          ...state, watchface: {...state.watchface, dateExtended: {...state.watchface.dateExtended, month: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_SEPARATED_YEAR:
        return {
          ...state, watchface: {...state.watchface, dateExtended: {...state.watchface.dateExtended, years: action.value}}
        };
          
      // ACTIVITYS normal
      case watchfaceActionsEnum.TOGGLE_ACTIVITY:
        return {
          ...state, watchface: {...state.watchface, collapsedActivityBlock: ! state.watchface.collapsedActivityBlock}
        };
      case watchfaceActionsEnum.TOGGLE_ACTIVITY_NUMBER:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, collapsed: ! state.watchface.activity.collapsed}}
        };
      case watchfaceActionsEnum.TOGGLE_STEP_PROGRESS:
        return {
          ...state, watchface: {...state.watchface, stepsProgress: {...state.watchface.stepsProgress, collapsed: ! state.watchface.stepsProgress.collapsed}}
        };
      case watchfaceActionsEnum.TOGGLE_PULSE_PROGRESS:
        return {
          ...state, watchface: {...state.watchface, pulseProgress: {...state.watchface.pulseProgress, collapsed: ! state.watchface.pulseProgress.collapsed}}
        };
      case watchfaceActionsEnum.UPDATE_STEPS:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, steps: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_STEP_GOAL:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, stepsGoals: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_CALORIES:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, calories: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_STEPSPERCENTAGE:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, stepsPercentage: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_PULSE:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, pulse: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_DISTANCE:
        return {
          ...state, watchface: {...state.watchface, activity: {...state.watchface.activity, distance: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_STEPPROGRESS:
        return {
          ...state, watchface: {...state.watchface, stepsProgress: {...action.value}}
        };
      case watchfaceActionsEnum.UPDATE_PULSE_PROGRESS:
        return {
          ...state, watchface: {...state.watchface, pulseProgress: {...action.value}}
        };

        // ACTIVITYS Alt
      
      case watchfaceActionsEnum.TOGGLE_ACTIVITY_ALT:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, collapsed: ! state.watchface.activityAlt.collapsed}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_STEPS:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, steps: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_BATTERY:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, battery: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_CALORIES:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, calories: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_PULSE:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, pulse: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_DISTANCE:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, distance: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_DISTANCE_DECIMAL_POINTER:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, distanceDecimalPointer: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_BATTERY_SUFFIX:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, batterySuffix: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_PULSE_NO_DATA:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, pulseNoData: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_DISTANCE_SUFFIX:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, distanceSuffixKM: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_ICON1:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, icon1: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_ICON2:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, icon2: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_ICON3:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, icon3: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_ICON4:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, icon4: action.value}}
        };
      case watchfaceActionsEnum.UPDATE_ALT_ICON5:
        return {
          ...state, watchface: {...state.watchface, activityAlt: {...state.watchface.activityAlt, icon5: action.value}}
        };

        // Status
      
        case watchfaceActionsEnum.TOGGLE_STATUS:
          return {
            ...state, watchface: {...state.watchface, status: {...state.watchface.status, collapsed: ! state.watchface.status.collapsed}}
          };
        case watchfaceActionsEnum.UPDATE_BLUETOOTH:
          return {
            ...state, watchface: {...state.watchface, status: {...state.watchface.status, bluetooth: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_ALARM:
          return {
            ...state, watchface: {...state.watchface, status: {...state.watchface.status, alarm: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_LOCK:
          return {
            ...state, watchface: {...state.watchface, status: {...state.watchface.status, lock: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_DND:
          return {
            ...state, watchface: {...state.watchface, status: {...state.watchface.status, doNotDisturb: action.value}}
          };
      
        // Battery
      
        case watchfaceActionsEnum.TOGGLE_BATTERY:
          return {
            ...state, watchface: {...state.watchface, battery: {...state.watchface.battery, collapsed: ! state.watchface.battery.collapsed}}
          };
        case watchfaceActionsEnum.UPDATE_BATTERY_DIGIT:
          return {
            ...state, watchface: {...state.watchface, battery: {...state.watchface.battery, text: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_BATTERY_ICON:
          return {
            ...state, watchface: {...state.watchface, battery: {...state.watchface.battery, icon: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_BATTERY_ICON_PROGRESS:
          return {
            ...state, watchface: {...state.watchface, battery: {...state.watchface.battery, scale: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_BATTERY_CIRCLE:
          return {
            ...state, watchface: {...state.watchface, battery: {...state.watchface.battery, circle: action.value}}
          };

        // Weather
      
        case watchfaceActionsEnum.TOGGLE_WEATHER:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, collapsed: ! state.watchface.weather.collapsed}}
          };
        case watchfaceActionsEnum.TOGGLE_WEATHER_TEMP:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, temperatureCollapsed: ! state.watchface.weather.temperatureCollapsed}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_ICON:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, customIcon: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_CURRENT:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, current: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_ONE_LINE:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, todayOneLine: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_NIGHT:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, night: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_NIGHT_ALT_COORDS:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, nightAltCoords: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_DAY:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, day: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_DAY_ALT_COORDS:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, dayAltCoords: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_AQI:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, aqi: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_WEATHER_HUMIDITY:
          return {
            ...state, watchface: {...state.watchface, weather: {...state.watchface.weather, humidity: action.value}}
          };


        // PAI
      
        case watchfaceActionsEnum.TOGGLE_PAI:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, collapsed: ! state.watchface.pai.collapsed}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_IMAGE_LOW:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, imageLow: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_IMAGE_NORMAL:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, imageNormal: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_IMAGE_HIGH:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, imageHigh: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_IMAGE_NODATA:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, imageNoData: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_NUMBER_LOW:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, numberLow: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_NUMBER_NORMAL:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, numberNormal: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_NUMBER_HIGH:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, numberHigh: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_PAI_NUMBER_GENERAL:
          return {
            ...state, watchface: {...state.watchface, pai: {...state.watchface.pai, numberGeneral: action.value}}
          };

        // Calories progress

        case watchfaceActionsEnum.TOGGLE_CALORIES_PROGRESS:
          return {
            ...state, watchface: {...state.watchface, caloriesProgress: {...state.watchface.caloriesProgress, collapsed: ! state.watchface.caloriesProgress.collapsed}}
          };
        case watchfaceActionsEnum.UPDATE_CALORIES_GOALIMAGE:
          return {
            ...state, watchface: {...state.watchface, caloriesProgress: {...state.watchface.caloriesProgress, goalImage: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_CALORIES_ICON:
          return {
            ...state, watchface: {...state.watchface, caloriesProgress: {...state.watchface.caloriesProgress, icon: action.value}}
          };
        case watchfaceActionsEnum.UPDATE_CALORIES_CIRCLE:
          return {
            ...state, watchface: {...state.watchface, caloriesProgress: {...state.watchface.caloriesProgress, circle: action.value}}
          };

      case watchfaceActionsEnum.SET_WATCHFACE_FROM_JSON:
        return {
          ...state, watchface: new WatchFace(action.value)
        };
      case watchfaceActionsEnum.CLEAR_WATCHFACE:
        return {
          ...state, watchface: new WatchFace()
        };
      default:
        return state;
    }
  };
