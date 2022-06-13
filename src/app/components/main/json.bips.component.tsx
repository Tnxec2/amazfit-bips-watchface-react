import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { AppContext, IAppContext } from "../../context/app.context";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { Activity, ActivityAlt, AnalogDialFace, Background, Battery, CaloriesProgress, Date, DateExtended, Pai, PulseProgress, Status, StepsProgress, TextTemperature, Time, WatchJson, Weather, WeekdayIcon } from "../../model/json.bips.model";
import { WatchActivityAlt, WatchActivityList, WatchBackground, WatchBattery, WatchCaloriesProgress, WatchDate, WatchDateExtended, WatchFace, WatchPai, WatchPulseProgress, WatchStatus, WatchStepsProgress, WatchTextTemperature, WatchTime, WatchTimeAnalog, WatchWeather, WatchWeekdayStatus } from "../../model/watchFace.bips.model";
import Color from "../../shared/color";

import cl from './JsonComponent.module.css';

const JsonComponent: FC = () => {

    const {watchface} = useContext<IWatchContext>(WatchfaceContext);
    const {jsonName } = useContext<IAppContext>(AppContext);
    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface]) // eslint-disable-line react-hooks/exhaustive-deps

    function generateJson(w: WatchFace): string {
        let j: WatchJson = {
            Background: getBackground(w.background),
            Time: getTimeDigital(w.time),
            Activity: getActivity(w.activity),
            Date: getDate(w.date),
            Weather: getWeather(w.weather),
            StepsProgress: getStepsProgress(w.stepsProgress),
            Status: getStatus(w.status),
            Battery: getBattery(w.battery),
            AnalogDialFace: getAnalogTime(w.analogTime),
            Shortcuts: null,
            DateExtended: getDateExt(w.dateExtended),
            PulseProgress: getPulseProgress(w.pulseProgress,),
            PAI: getPAI(w.pai),
            WeekdayIcon: getWeekdayProgress(w.weekdayicon),
            ActivityAlt: getActivityAlt(w.activityAlt),
            CaloriesProgress: getCaloriesProgress(w.caloriesProgress),
        }
        return JSON.stringify(j, (key, value) => {
            if (value !== null && value !== undefined) return value
          }, "  ")
    }
    
    function saveJson(json: string) {
        if (json.length > 0) {
            var a = document.getElementById("saveJson") as HTMLAnchorElement;
            if (a) {
                var file = new Blob([json], {type: 'text/plain'});
                let filename = jsonName ? jsonName : 'watchface.json'
                a.href = URL.createObjectURL(file);
                a.download = filename;
            }
        }
    }

    return (
        <>
        <Card className={cl.json}>
            <pre>
                {json}
            </pre>
        </Card>
        <br/>
        <a href="a" id="saveJson">download json file</a>
        </>
    )
    
};

export default JsonComponent;

function getBackground(background: WatchBackground): Background {
    return {
        Image: background.image.enabled ? background.image.json : null ,
        BackgroundColor: background.image.enabled ? null : Color.colorWrite(background.color),
        Preview: background.preview.enabled ? background.preview.json : null,
        FrontImage: background.frontImage.enabled ? background.frontImage.json : null,
    }
}


function getTimeDigital(time: WatchTime): Time {
    const enabledTime= time.hours.enabled || time.minutes.enabled || time.seconds.enabled
    const enabled= enabledTime || time.ampm.enabled
    return enabled ? {
        Hours: time.hours.enabled ? time.hours.json : null,
        Minutes: time.minutes.enabled ? time.minutes.json : null,
        Seconds: time.seconds.enabled ? time.seconds.json : null,
        AmPm: time.ampm.enabled ? time.ampm.json : null,
        DrawingOrder: enabledTime ? time.drawingOrder : null,
        SunriseHours: time.sunriseHours.enabled ? time.sunriseHours.json: null,
        SunriseMinutes: time.sunriseMinutes.enabled ? time.sunriseMinutes.json: null,
        SunsetHours: time.sunsetHours.enabled ? time.sunsetHours.json: null,
        SunsetMinutes: time.sunsetMinutes.enabled ? time.sunsetMinutes.json: null,
        SunriseHoursNoDataImage: time.sunriseHoursNoData.enabled ? time.sunriseHoursNoData.json: null,
        SunriseMinutesNoDataImage: time.sunriseMinutesNoData.enabled ? time.sunriseMinutesNoData.json: null,
        SunsetHoursNoDataImage: time.sunsetHoursNoData.enabled ? time.sunsetHoursNoData.json: null,
        SunsetMinutesNoDataImage: time.sunsetMinutesNoData.enabled ? time.sunsetMinutesNoData.json: null,
    } : null
}


function getActivity(a: WatchActivityList): Activity {
    const enabled = (a.steps.enabled && a.steps.number.enabled) ||
                    (a.stepsGoals.enabled && a.stepsGoals.number.enabled) ||
                    (a.calories.enabled && a.calories.number.enabled) ||
                    (a.pulse.enabled  && a.pulse.number.enabled) ||
                    (a.distance.enabled  && a.distance.number.enabled)
    return enabled ? {
        Steps: a.steps.enabled && a.steps.number.enabled ? {
            Number: a.steps.number.json,
            SuffixImageIndex: a.steps.suffix,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        StepsGoal: a.stepsGoals.enabled && a.stepsGoals.number.enabled ? {
            Number: a.stepsGoals.number.json,
            SuffixImageIndex: a.stepsGoals.suffix,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Calories: a.calories.enabled  && a.calories.number.enabled? {
            Number: a.calories.number.json,
            SuffixImageIndex: a.calories.suffix,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Pulse: a.pulse.enabled && a.pulse.number.enabled ? {
            Number: a.pulse.number.json,
            SuffixImageIndex: a.pulse.suffix,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Distance: a.distance.enabled && a.distance.number.enabled ? {
            Number: a.distance.number.json,
            SuffixImageIndex: a.distance.suffix,
            DecimalPointImageIndex: a.distance.decimalPointer,
            SuffixMilesImageIndex: null
        } : null,
    } : null
}


function getDate(d: WatchDate): Date {
    const enabledDate = d.day.enabled || d.month.enabled || d.montName.enabled || d.monthAlt.enabled || d.dayAlt.enabled
    const enabled = enabledDate || d.weekday.enabled
    if (!enabled ) return null
    return {
        MonthAndDay: enabledDate ? {
            Separate: ! d.oneLine ? {
                Month: d.month.enabled ? d.month.json : null,
                MonthName: d.montName.enabled ? d.montName.json : null,
                Day: d.day.enabled ? d.day.json :null
            } : null,
            OneLine: d.oneLine ? {
                Number: d.month.enabled ? d.month.json: null,
                DelimiterImageIndex: d.oneLineDelimiter
            } : null,
            TwoDigitsDay: d.twoDigitsDay ? true : false,
            TwoDigitsMonth: d.twoDigitsMonth ? true : false,
        } : null,
        WeekDay: d.weekday.enabled ? d.weekday.json : null,
        MonthAlt: d.monthAlt.enabled ? d.monthAlt.json:null,
        DayAlt: d.dayAlt.enabled ? d.dayAlt.json:null,
    }
}


function getWeather(w: WatchWeather): Weather {
    const enabledTemp = w.current.enabled || w.day.enabled || w.night.enabled || w.todayOneLine.enabled
    const enabledAqi = w.aqi.icon.enabled || w.aqi.number.enabled
    const enabledHumidity = w.humidity.icon.enabled || w.humidity.number.enabled
    const enabled = w.customIcon.enabled || enabledTemp || enabledAqi || enabledHumidity

    if (!enabled) return null
    return {
        Icon: w.customIcon.enabled ? {
            CustomIcon: w.customIcon.enabled ? w.customIcon.json : null
        } : null,
        Temperature: enabledTemp ? {
            Current: w.current.enabled ? {
                Number: w.current.number.enabled ? w.current.number.json : null,
                MinusImageIndex: w.current.minus,
                DegreesImageIndex: w.current.degrees,
            } : null,
            Today: w.day.enabled || w.night.enabled || w.todayOneLine.enabled ? {
                SeparateTemperature: w.day.enabled || w.night.enabled ? {
                    Day: w.day.enabled ? getTextTemperature(w.day) : null,
                    Night: w.day.enabled ? getTextTemperature(w.night) : null,
                    DayAlt: w.day.enabled && w.dayAltCoords.enabled ? w.dayAltCoords.json : null, 
                    NightAlt: w.night.enabled && w.nightAltCoords.enabled ? w.nightAltCoords.json : null, 
                } : null,
                OneLine: w.todayOneLine.enabled ? {
                    Number: w.todayOneLine.number.enabled ? w.todayOneLine.number.json : null,
                    MinusImageIndex: w.todayOneLine.minus,
                    DelimiterImageIndex: w.todayOneLine.delimiter,
                    AppendDegresForBoth: w.todayOneLine.appendDegreesToBoth,
                    DegreesImageIndex: w.todayOneLine.degrees,
                } : null,
            } : null,
        } : null,
        AQI: enabledAqi ? {
            Number: w.aqi.number.enabled ? w.aqi.number.json : null,
            Icon: w.aqi.icon.enabled ? w.aqi.icon.json : null,
        } : null,
        Humidity: enabledHumidity ? {
            Number: w.humidity.number.enabled ? w.humidity.number.json : null,
            Icon: w.humidity.icon.enabled ? w.humidity.icon.json : null,
            SuffixImageIndex: w.humidity.suffix,
        } : null,
    }
}


function getStepsProgress(p: WatchStepsProgress): StepsProgress {
    const enabled = p.goalImage.enabled || p.linear.enabled || p.gauge.enabled || p.circle.enabled
    if (!enabled) return null
    return {
        GoalImage: p.goalImage.enabled ? p.goalImage.json : null,
        Linear: p.linear.enabled ? p.linear.json : null,
        Gauge: p.gauge.enabled ? p.gauge.json : null,
        Circle: p.circle.enabled ? p.circle.json : null,
    }
}
function getCaloriesProgress(p: WatchCaloriesProgress): CaloriesProgress {
    const enabled = p.icon.enabled || p.circle.enabled
    if (!enabled) return null
    return {
        Icon: p.icon.enabled ? p.icon.json : null,
        Circle: p.circle.enabled ? p.circle.json : null,
    }
}

function getPulseProgress(p: WatchPulseProgress): PulseProgress {
    const enabled = p.image1.enabled || p.image2.enabled || p.image3.enabled || p.image4.enabled || p.image5.enabled || p.image6.enabled || p.circle.enabled
    if (!enabled) return null
    return {
        Image1: p.image1.enabled ? p.image1.json : null,
        Image2: p.image2.enabled ? p.image2.json : null,
        Image3: p.image3.enabled ? p.image3.json : null,
        Image4: p.image4.enabled ? p.image4.json : null,
        Image5: p.image5.enabled ? p.image5.json : null,
        Image6: p.image6.enabled ? p.image6.json : null,
        Circle: p.circle.enabled ? p.circle.json : null,
    }
}

function getStatus(s: WatchStatus): Status {
    const enabled = s.doNotDisturb.enabled || s.lock.enabled || s.bluetooth.enabled || s.alarm.enabled
    if (!enabled) return null
    return {
        DoNotDisturb: s.doNotDisturb.enabled ? s.doNotDisturb.json : null,
        Lock: s.lock.enabled ? s.lock.json : null,
        Bluetooth: s.bluetooth.enabled ? s.bluetooth.json : null,
        Alarm: s.alarm.enabled ? s.alarm.json : null,
    }
}


function getBattery(b: WatchBattery): Battery {
    const enabled = b.text.enabled || b.icon.enabled || b.scale.enabled || b.circle.enabled
    if (!enabled) return null
    return {
        Text: b.text.enabled ? {
            Number: b.text.number.enabled ? b.text.number.json : null,
            SuffixImageIndex: b.text.suffix,
            Unknown3: null,
            IconImageIndex: b.text.iconimageindex
        } : null,
        Icon: b.icon.enabled ? b.icon.json : null,
        Scale: b.scale.enabled ? b.scale.json : null,
        Circle: b.circle.enabled ? b.circle.json : null,
    }
}


function getAnalogTime(t: WatchTimeAnalog): AnalogDialFace {
    const enabled = t.hours.enabled || t.minutes.enabled || t.seconds.enabled
    if (!enabled) return null
    return {
        Hours: t.hours.enabled ? t.hours.json : null,
        Minutes: t.minutes.enabled ? t.minutes.json : null,
        Seconds: t.seconds.enabled ? t.seconds.json : null,
    }
}

function getTextTemperature(t: WatchTextTemperature): TextTemperature {
    return t.number.enabled ? {
        Number:  t.number.json,
        MinusImageIndex: t.minus,
        DegreesImageIndex: t.degrees,
    } : null
}

function getDateExt(t: WatchDateExtended): DateExtended {
    const enabled = t.years.enabled || t.month.enabled || t.day.enabled
    if (!enabled) return
    return {
        YearSeparate:  t.years.enabled ? t.years.json : null,
        MonthSeparate: t.month.enabled? t.month.json : null,
        DaySeparate: t.day.enabled ? t.day.json : null,
    } 
}
function getPAI(t: WatchPai): Pai {
    const enabled = t.imageLow.enabled || t.imageNormal.enabled || t.imageHigh.enabled ||
                     t.numberLow.enabled || t.numberNormal.enabled || t.numberHigh.enabled ||
                     t.numberGeneral.enabled || t.imageNoData.enabled
    if (!enabled) return
    return {
        IconLow:  t.imageLow.enabled ? t.imageLow.json : null,
        IconNormal:  t.imageNormal.enabled ? t.imageNormal.json : null,
        IconHigh:  t.imageHigh.enabled ? t.imageHigh.json : null,
        NoDataImage:  t.imageNoData.enabled ? t.imageNoData.json : null,
        NumberLow:  t.numberLow.enabled ? t.numberLow.json : null,
        NumberNormal:  t.numberNormal.enabled ? t.numberNormal.json : null,
        NumberHigh:  t.numberHigh.enabled ? t.numberHigh.json : null,
        NumberGeneral:  t.numberGeneral.enabled ? t.numberGeneral.json : null,

    } 
}

function getWeekdayProgress(p: WatchWeekdayStatus): WeekdayIcon {
    const enabled = p.Monday.enabled || p.Tuesday.enabled || p.Wednesday.enabled || 
                p.Thursday.enabled || p.Friday.enabled || p.Saturday.enabled || 
                p.Sunday.enabled
      if (!enabled) return null
      return {
        Monday: p.Monday.enabled ? p.Monday.json : null,
        Tuesday: p.Tuesday.enabled ? p.Tuesday.json : null,
        Wednesday: p.Wednesday.enabled ? p.Wednesday.json : null,
        Thursday: p.Thursday.enabled ? p.Thursday.json : null,
        Friday: p.Friday.enabled ? p.Friday.json : null,
        Saturday: p.Saturday.enabled ? p.Saturday.json : null,
        Sunday: p.Sunday.enabled ? p.Sunday.json : null,
      }
}

function getActivityAlt(p: WatchActivityAlt): ActivityAlt {
    const enabled = p.pulse.enabled || p.battery.enabled || p.calories.enabled || 
                p.steps.enabled || p.distance.enabled || p.icon1.enabled || 
                p.icon2.enabled || p.icon3.enabled || p.icon4.enabled || p.icon5.enabled
      if (!enabled) return null
      return {
        Pulse: p.pulse.enabled ? p.pulse.json : null,
        Battery: p.battery.enabled ? p.battery.json : null,
        Calories: p.calories.enabled ? p.calories.json : null,
        Steps: p.steps.enabled ? p.steps.json : null,
        BatterySuffixImageIndex: p.battery.enabled ? p.batterySuffix : null,
        PulseNoDataImageIndex: p.pulse.enabled ? p.pulseNoData : null,
        Distance: p.distance.enabled ? {
            Number: p.distance.json,
            DecimalPointerImageIndex: p.distanceDecimalPointer,
            SuffixKMIcon: p.distanceSuffixKM.enabled ? p.distanceSuffixKM.json : null,
            SuffixMIIcon: p.distanceSuffixMi.enabled ? p.distanceSuffixMi.json : null,
        }:null,
        Icon1: p.icon1.enabled ? p.icon1.json : null,
        Icon2: p.icon2.enabled ? p.icon2.json : null,
        Icon3: p.icon3.enabled ? p.icon3.json : null,
        Icon4: p.icon4.enabled ? p.icon4.json : null,
        Icon5: p.icon5.enabled ? p.icon5.json : null,
        
      }
}


