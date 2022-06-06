import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Activity, AnalogDialFace, Background, Battery, Date, Status, StepsProgress, TextTemperature, Time, WatchJson, Weather } from "../../model/json.bips.model";
import { WatchActivityList, WatchBackground, WatchBattery, WatchDate, WatchFace, WatchStatus, WatchStepsProgress, WatchTextTemperature, WatchTime, WatchTimeAnalog, WatchWeather } from "../../model/watchFace.bips.model";

import cl from './JsonComponent.module.css';

const JsonComponent: FC = () => {

    const {watchface, jsonName } = useContext<IWatchContext>(WatchfaceContext);

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
            Shortcuts: null
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
        BackgroundColor: background.color,
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
    } : null
}


function getActivity(a: WatchActivityList): Activity {
    const enabled = a.steps.enabled ||
                    a.stepsGoals.enabled ||
                    a.calories.enabled ||
                    a.pulse.enabled ||
                    a.distance.enabled ||
                    a.pai.enabled
    return enabled ? {
        Steps: a.steps.enabled ? {
            Number: a.steps.number.json,
            SuffixImageIndex: null,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        StepsGoal: a.stepsGoals.enabled ? {
            Number: a.stepsGoals.number.json,
            SuffixImageIndex: null,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Calories: a.calories.enabled ? {
            Number: a.calories.number.json,
            SuffixImageIndex: null,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Pulse: a.pulse.enabled ? {
            Number: a.pulse.number.json,
            SuffixImageIndex: null,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
        Distance: a.distance.enabled ? {
            Number: a.distance.number.json,
            SuffixImageIndex: a.distance.suffix,
            DecimalPointImageIndex: a.distance.decimalPointer,
            SuffixMilesImageIndex: null
        } : null,
        PAI: a.pai.enabled ? {
            Number: a.pai.number.json,
            SuffixImageIndex: null,
            DecimalPointImageIndex: null,
            SuffixMilesImageIndex: null
        } : null,
    } : null
}


function getDate(d: WatchDate): Date {
    const enabledDate = d.day.enabled || d.month.enabled || d.montName.enabled
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
            TwoDigitsDay: d.twoDigitsDay,
            TwoDigitsMonth: d.twoDigitsMonth
        } : null,
        WeekDay: d.weekday.enabled ? d.weekday.json : null,
    }
}


function getWeather(w: WatchWeather): Weather {
    const enabledTemp = w.current.enabled || w.day.enabled || w.night.enabled || w.todayOneLine.enabled
    const enabledAqi = w.aqi.icon.enabled || w.aqi.number.enabled
    const enabledHumidity = w.humidity.icon.enabled || w.humidity.number.enabled
    const enabled = w.icon.customIcon.enabled || enabledTemp || enabledAqi || enabledHumidity

    if (!enabled) return null
    return {
        Icon: w.icon.enabled ? {
            CustomIcon: w.icon.customIcon.enabled ? w.icon.customIcon.json : null
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



