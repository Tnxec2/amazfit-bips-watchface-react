import {createContext, useReducer} from 'react'
import { WatchJson } from '../model/json.bips.model';
import { WatchAmPmIcon, WatchAQI, WatchBackground, WatchBatteryFormatedNumber, WatchCircleScale, WatchClockHand, WatchCoordinates, WatchFace, WatchStepsFormatedNumber, WatchFourDigitsSeparated, WatchHumidity, WatchImage, WatchImageSet, WatchLinearIconSet, WatchNumber, WatchNumberExt, WatchOneLineTemperature, WatchPulseProgress, WatchStepsProgress, WatchSwitch, WatchTextTemperature, WatchTwoDigitsSeparated, WatchWeekdayStatus, WatchPulseFormatedNumber, WatchCaloriesFormatedNumber, WatchDistanceFormatedNumber, WatchStepPercentageFormatedNumber } from '../model/watchFace.bips.model';
import { watchfaceActionsEnum, watchfaceInitialState, watchfaceReducer } from './reducer/watchface.reducer';

export const WatchfaceContext = createContext(null);

export interface IWatchContext {
    watchface: WatchFace,
    setWatchfaceFromJson(json: WatchJson): void,
    clearWatchface(): void,
    updateBackground(background: WatchBackground): void,
    toggleBackground(): void
    toggleTimeDigital(): void
    updateDrawingOrder(drawingOrder: string): void,
    updateHoursDigital(hours: WatchTwoDigitsSeparated): void,
    updateMinutesDigital(minutes: WatchTwoDigitsSeparated): void,
    updateSecondsDigital(seconds: WatchTwoDigitsSeparated): void,
    toggleSunrise(): void,
    updateSunriseHours(hours: WatchNumber): void,
    updateSunriseMinutes(hours: WatchNumber): void,
    updateSunsetHours(hours: WatchNumber): void,
    updateSunsetMinutes(hours: WatchNumber): void,
    updateSunriseHoursNoData(hours: WatchImage): void,
    updateSunriseMinutesNoData(hours: WatchImage): void,
    updateSunsetHoursNoData(hours: WatchImage): void,
    updateSunsetMinutesNoData(hours: WatchImage): void,
    updateAmPm(ampm: WatchAmPmIcon): void,
    toggleAnalog(): void,
    updateAnalogHours(n: WatchClockHand): void,
    updateAnalogMinutes(n: WatchClockHand): void,
    updateAnalogSeconds(n: WatchClockHand): void,
    updateAnalogAmPm(ampm: WatchAmPmIcon): void,
    toggleDate(): void,
    toggleDateAlt(): void,
    toggleDateExt(): void,
    updateDay(n: WatchNumber): void,
    updateMonth(n: WatchNumber): void,
    updateMonthAsWord(n: WatchImageSet): void,
    updateWeekday(n: WatchImageSet): void,
    updateOneLineDateMonth(val: boolean): void,
    updateOneLineDateDelimiter(val: number): void,
    updateTwoDigitsMonth(val: boolean): void,
    updateTwoDigitsDay(val: boolean): void,
    updateDaySeparated(d: WatchTwoDigitsSeparated): void
    updateMonthSeparated(m: WatchTwoDigitsSeparated): void
    updateYearSeparated(y: WatchFourDigitsSeparated): void
    updateWeekdayProgress(d: WatchWeekdayStatus): void,
    updateMonthAlt(d: WatchNumberExt): void,
    updateDayAlt(d: WatchNumberExt): void,
    toggleActivity(): void,
    toggleActivityNumber(): void,
    toggleStepProgress(): void,
    togglePulseProgress(): void,
    updateSteps(a: WatchStepsFormatedNumber): void,
    updateStepProgress(a: WatchStepsProgress): void,
    updatePulseProgress(a: WatchPulseProgress): void,
    updateCalories(a: WatchCaloriesFormatedNumber): void,
    updateStepPercentage(a: WatchStepPercentageFormatedNumber): void,
    updateHearthrate(a: WatchPulseFormatedNumber): void,
    updateDistance(a: WatchDistanceFormatedNumber): void, 
    updateStepsGoal(a: WatchStepsFormatedNumber): void,
    toggleActivityAlt(): void,
    updateActivityAltSteps(a: WatchNumberExt): void,
    updateActivityAltCalories(a: WatchNumberExt): void,
    updateActivityAltHearthrate(a: WatchNumberExt): void,
    updateActivityAltDistance(a: WatchNumberExt): void,
    updateActivityAltBattery(a: WatchNumberExt): void,
    onChangeActivityAltBatterySuffix(a: number): void,
    onChangeActivityAltPulseNoData(a: number): void,
    onChangeActivityAltDistanceDecimalPointer(a: number): void,
    onChangeActivityAltDistanceSuffix(a: WatchImage): void,
    onChangeActivityAltIcon1(a: WatchImage): void,
    onChangeActivityAltIcon2(a: WatchImage): void,
    onChangeActivityAltIcon3(a: WatchImage): void,
    onChangeActivityAltIcon4(a: WatchImage): void,
    onChangeActivityAltIcon5(a: WatchImage): void,
    toggleStatus(): void,
    updateBluetooth(v: WatchSwitch): void,
    updateAlarm(v: WatchSwitch): void,
    updateLock(v: WatchSwitch): void,
    updateDnD(v: WatchSwitch): void,
    toggleBattery(): void,
    udpateBatteryDigit(fn: WatchBatteryFormatedNumber): void,
    updateBatteryImageSet(iconset: WatchImageSet): void,
    updateBatteryIconSet(is: WatchLinearIconSet): void,
    updateBatteryCircle(c: WatchCircleScale): void,
    toggleWeather(): void,
    toggleWeatherTemp(): void,
    udpateWeatherCurrent(d: WatchTextTemperature): void,
    updateWeatherOneLine(d: WatchOneLineTemperature): void,
    udpateWeatherNight(d: WatchTextTemperature): void,
    udpateWeatherDay(d: WatchTextTemperature): void,
    udpateWeatherNightAltCoords(d: WatchCoordinates): void,
    udpateWeatherDayAltCoords(d: WatchCoordinates): void,
    updateWeatherIcon(d: WatchImageSet): void,
    updateWeatherAqi(d: WatchAQI): void,
    updateWeatherHumidity(d: WatchHumidity): void,
    togglePai(): void,
    updatePaiImageLow(i: WatchImage): void,
    updatePaiImageNormal(i: WatchImage): void,
    updatePaiImageHigh(i: WatchImage): void,
    updatePaiImageNoData(i: WatchImage): void,
    updatePaiNumberLow(i: WatchNumber): void,
    updatePaiNumberNormal(i: WatchNumber): void,
    updatePaiNumberHigh(i: WatchNumber): void,
    updatePaiNumberGeneral(i: WatchNumber): void,
    toggleCaloriesProgress(): void,
    updateCaloriesGoalImage(i: WatchImage): void,
    updateCaloriesIcon(i: WatchImageSet): void,
    updateCaloriesCircle(i: WatchCircleScale): void,
}

export const WatchfaceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchfaceReducer, watchfaceInitialState);

  const value: IWatchContext ={
    watchface: state.watchface,
    toggleBackground: () => {
      dispatch({ type: watchfaceActionsEnum.TOGGLE_BACKGROUND });
    },
    updateBackground: (background: WatchBackground) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_BACKGROUND, value: background });
    },
    toggleTimeDigital: () => {
      dispatch({ type: watchfaceActionsEnum.TOGGLE_TIME_DIGITAL });
    },
    updateDrawingOrder: (drawingOrder: string) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_DRAWING_ORDER_TIME, value: drawingOrder });
    },
    updateHoursDigital: (hours: WatchTwoDigitsSeparated) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_HOURS_DIGITAL, value: hours });
    },
    updateMinutesDigital: (minutes: WatchTwoDigitsSeparated) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_MINUTES_DIGITAL, value: minutes });
    },
    updateSecondsDigital: (sec: WatchTwoDigitsSeparated) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SECONDS_DIGITAL, value: sec });
    },
    toggleSunrise: () => {
      dispatch({ type: watchfaceActionsEnum.TOGGLE_SUNRISE})
    },
    updateSunriseHours: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNRISE_HOURS, value: n });
    },
    updateSunriseMinutes: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNRISE_MINUTES, value: n });
    },
    updateSunsetHours: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNSET_HOURS, value: n });
    },
    updateSunsetMinutes: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNSET_MINUTES, value: n });
    },
    updateSunriseHoursNoData: (n: WatchImage) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNRISE_HOURS_NODATA, value: n });
    },
    updateSunriseMinutesNoData: (n: WatchImage) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNRISE_MINUTES_NODATA, value: n });
    },
    updateSunsetHoursNoData: (n: WatchImage) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNSET_HOURS_NODATA, value: n });
    },
    updateSunsetMinutesNoData: (n: WatchImage) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_SUNSET_MINUTES_NODATA, value: n });
    },
    updateAmPm: (n: WatchAmPmIcon) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_AMPM, value: n });
    },
    toggleAnalog: () => {
      dispatch( {type: watchfaceActionsEnum.TOGGLE_ANALOG})
    },
    updateAnalogHours: (n: WatchClockHand) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_ANALOG_HOURS, value: n });
    },
    updateAnalogMinutes: (n: WatchClockHand) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_ANALOG_MINUTES, value: n });
    },
    updateAnalogSeconds: (n: WatchClockHand) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_ANALOG_SECONGS, value: n });
    },
    updateAnalogAmPm: (n: WatchAmPmIcon) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_ANALOG_AMPM, value: n });
    },
    toggleDate: () => {
      dispatch( {type: watchfaceActionsEnum.TOGGLE_DATE})
    },
    toggleDateAlt: () => {
      dispatch( {type: watchfaceActionsEnum.TOGGLE_DATEALT})
    },
    toggleDateExt: () => {
      dispatch( {type: watchfaceActionsEnum.TOGGLE_DATEEXT})
    },
    updateDay: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_DAY, value: n });
    },
    updateMonth: (n: WatchNumber) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_MONTH, value: n });
    },
    updateMonthAsWord: (n: WatchImageSet) => {
      dispatch({ type: watchfaceActionsEnum.UPDATE_MONTH_AS_WORD, value: n });
    },
    updateWeekday: (n: WatchImageSet)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEEKDAY, value: n });},
    updateOneLineDateMonth: (n: boolean)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ONELINE_MONTH, value: n });},
    updateOneLineDateDelimiter: (n: number)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ONELINE_DATE_DELIMITER, value: n });},
    updateTwoDigitsMonth: (n: boolean)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_TWODIGITS_MONTH, value: n });},
    updateTwoDigitsDay: (n: boolean)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_TWODIGITS_DAY, value: n });},
    updateDaySeparated: (d: WatchTwoDigitsSeparated)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_SEPARATED_DAY, value: d });},
    updateMonthSeparated: (m: WatchTwoDigitsSeparated)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_SEPARATED_MONTH, value: m });},
    updateYearSeparated: (y: WatchFourDigitsSeparated)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_SEPARATED_YEAR, value: y });},
    updateWeekdayProgress: (d: WatchWeekdayStatus)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEEKDAY_PROGRESS, value: d });},
    updateMonthAlt: (n: WatchNumberExt)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_MONTH_ALT, value: n });},
    updateDayAlt: (n: WatchNumberExt)  =>  {dispatch({ type: watchfaceActionsEnum.UPDATE_DAY_ALT, value: n });},

    toggleActivity:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_ACTIVITY });},
    toggleActivityNumber:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_ACTIVITY_NUMBER });},
    toggleStepProgress:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_STEP_PROGRESS });},
    togglePulseProgress:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_PULSE_PROGRESS });},
    updateSteps:(a: WatchStepsFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_STEPS, value: a });},
    updateStepProgress:(a: WatchStepsProgress)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_STEPPROGRESS, value: a });},
    updatePulseProgress:(a: WatchPulseProgress)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PULSE_PROGRESS, value: a });},
    updateCalories:(a: WatchCaloriesFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_CALORIES, value: a });},
    updateStepPercentage:(a: WatchStepPercentageFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_STEPSPERCENTAGE, value: a });},
    updateHearthrate:(a: WatchPulseFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PULSE, value: a });},
    updateDistance:(a: WatchDistanceFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_DISTANCE, value: a });}, 
    updateStepsGoal:(a: WatchStepsFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_STEP_GOAL, value: a });},

    toggleActivityAlt:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_ACTIVITY_ALT });},
    updateActivityAltSteps:(a: WatchNumberExt)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_STEPS, value: a });},
    updateActivityAltCalories:(a: WatchNumberExt)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_CALORIES, value: a });},
    updateActivityAltHearthrate:(a: WatchNumberExt)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_PULSE, value: a });},
    updateActivityAltDistance:(a: WatchNumberExt)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_DISTANCE, value: a });},
    updateActivityAltBattery:(a: WatchNumberExt)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_BATTERY, value: a });},
    onChangeActivityAltBatterySuffix:(a: number)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_BATTERY_SUFFIX, value: a });},
    onChangeActivityAltPulseNoData:(a: number)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_PULSE_NO_DATA, value: a });},
    onChangeActivityAltDistanceDecimalPointer:(a: number)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_DISTANCE_DECIMAL_POINTER, value: a });},
    onChangeActivityAltDistanceSuffix:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_DISTANCE_SUFFIX, value: a });},
    onChangeActivityAltIcon1:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_ICON1, value: a });},
    onChangeActivityAltIcon2:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_ICON2, value: a });},
    onChangeActivityAltIcon3:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_ICON3, value: a });},
    onChangeActivityAltIcon4:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_ICON4, value: a });},
    onChangeActivityAltIcon5:(a: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALT_ICON5, value: a });},

    toggleStatus:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_STATUS });},
    updateBluetooth:(v: WatchSwitch)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_BLUETOOTH, value: v });},
    updateAlarm:(v: WatchSwitch)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_ALARM, value: v });},
    updateLock:(v: WatchSwitch)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_LOCK, value: v });},
    updateDnD:(v: WatchSwitch)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_DND, value: v });},

    toggleBattery: ()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_BATTERY});},
    udpateBatteryDigit: (fn: WatchBatteryFormatedNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_BATTERY_DIGIT, value: fn });},
    updateBatteryImageSet: (iconset: WatchImageSet)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_BATTERY_ICON, value: iconset });},
    updateBatteryIconSet: (is: WatchLinearIconSet)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_BATTERY_ICON_PROGRESS, value: is });},
    updateBatteryCircle: (c: WatchCircleScale)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_BATTERY_CIRCLE, value: c });},

    toggleWeather:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_WEATHER });},
    toggleWeatherTemp:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_WEATHER_TEMP });},
    udpateWeatherCurrent:(d: WatchTextTemperature)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_CURRENT, value: d });},
    updateWeatherOneLine:(d: WatchOneLineTemperature)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_ONE_LINE, value: d });},
    udpateWeatherNight:(d: WatchTextTemperature)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_NIGHT, value: d });},
    udpateWeatherDay:(d: WatchTextTemperature)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_DAY, value: d });},
    udpateWeatherNightAltCoords:(d: WatchCoordinates)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_NIGHT_ALT_COORDS, value: d });},
    udpateWeatherDayAltCoords:(d: WatchCoordinates)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_DAY_ALT_COORDS, value: d });},
    updateWeatherIcon:(d: WatchImageSet)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_ICON, value: d });},
    updateWeatherAqi:(d: WatchAQI)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_AQI, value: d });},
    updateWeatherHumidity:(d: WatchHumidity)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_WEATHER_HUMIDITY, value: d });},

    togglePai:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_PAI});},
    updatePaiImageLow:(i: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_IMAGE_LOW, value: i });},
    updatePaiImageNormal:(i: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_IMAGE_NORMAL, value: i });},
    updatePaiImageHigh:(i: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_IMAGE_HIGH, value: i });},
    updatePaiImageNoData:( n: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_IMAGE_NODATA, value: n });},
    updatePaiNumberLow:(n: WatchNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_NUMBER_LOW, value: n });},
    updatePaiNumberNormal:(n: WatchNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_NUMBER_NORMAL, value: n });},
    updatePaiNumberHigh:(n: WatchNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_NUMBER_HIGH, value: n });},
    updatePaiNumberGeneral:(n: WatchNumber)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_PAI_NUMBER_GENERAL, value: n });},

    toggleCaloriesProgress:()=>  {dispatch({ type: watchfaceActionsEnum.TOGGLE_CALORIES_PROGRESS});},
    updateCaloriesGoalImage:(i: WatchImage)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_CALORIES_GOALIMAGE, value: i });},
    updateCaloriesIcon:(i: WatchImageSet)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_CALORIES_ICON, value: i });},
    updateCaloriesCircle:(i: WatchCircleScale)=>  {dispatch({ type: watchfaceActionsEnum.UPDATE_CALORIES_CIRCLE, value: i });},

    setWatchfaceFromJson: (json: WatchJson) => {
      dispatch({ type: watchfaceActionsEnum.SET_WATCHFACE_FROM_JSON, value: json });
    },
    clearWatchface: () => {
      dispatch({ type: watchfaceActionsEnum.CLEAR_WATCHFACE });
    },
  }

  return (
    <WatchfaceContext.Provider value={value}>
      {children}
    </WatchfaceContext.Provider>
  );
};