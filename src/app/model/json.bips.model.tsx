import Color from "../shared/color";
import { AlignmentType } from "./types.bips.model";

export class DeviceId {
  DeviceId: number;
}

export class Image {
  X: number = 0
  Y: number = 0
  ImageIndex: number
}

export class Background {
  Image: Image;
  BackgroundColor: string = Color.DEFAULT_COLOR;
  Preview: Image
  FrontImage: Image
}

export class ImageSet { 
  X: number = 0;
  Y: number = 0;
  ImageIndex: number;
  ImagesCount: number = 1;
  Unknown5: number;
  Unknown6: number;
}

export class TwoDigits {
    Tens: ImageSet
    Ones: ImageSet
}

export class FourDigits {
  Thousands: ImageSet
  Hundreds: ImageSet
  Tens: ImageSet
  Ones: ImageSet
}

export class NumberJson {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 0
  BottomRightY: number = 0
  Alignment: string = AlignmentType.TopLeft.json
  Spacing: number = 0
  ImageIndex: number
  ImagesCount: number = 1
}

export class NumberExtendedJson {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 0
  BottomRightY: number = 0
  Alignment: string = AlignmentType.TopLeft.json
  Spacing: number = 0
  VerticalOffset: number = 0
  ImageIndex: number
  ImagesCount: number = 1
}

export class ShortcutElement {
  TopLeftX: number = 0
  TopLeftY: number = 0
  Width: number = 0
  Height: number = 0
}

export class Time {
  Hours: TwoDigits
  Minutes: TwoDigits
  Seconds: TwoDigits
  AmPm: AmPmIcon
  DrawingOrder: string
  //Unknown9: number = 0
  SunriseHours: NumberJson
  SunriseMinutes: NumberJson
  SunsetHours: NumberJson
  SunsetMinutes: NumberJson
  SunriseHoursNoDataImage: Image
  SunriseMinutesNoDataImage: Image
  SunsetHoursNoDataImage: Image
  SunsetMinutesNoDataImage: Image
}



export class Coordinates {
  X: number = 0;
  Y: number = 0;
  Unknown3: number = 0;
  Unknown4: number = 0;
}

export class FormatedNumber {
  Number: NumberJson
  SuffixImageIndex: number
  DecimalPointImageIndex: number
  SuffixMilesImageIndex: number
}

export class Activity {
  Steps: FormatedNumber
  StepsGoal: FormatedNumber
  Calories: FormatedNumber
  Pulse: FormatedNumber
  Distance: FormatedNumber
}

export class Pai {
  IconLow: Image
  IconNormal: Image
  IconHigh: Image
  NoDataImage: Image
  NumberLow: NumberJson
  NumberNormal: NumberJson
  NumberHigh: NumberJson
  NumberGeneral: NumberJson
}


export class OneLineMonthAndDay{
  Number: NumberJson
  DelimiterImageIndex: number
}

export class SeparateMonthAndDay{
  Month: NumberJson
  MonthName: ImageSet
  Day: NumberJson
}

export class MonthAndDay{
  Separate: SeparateMonthAndDay
  OneLine: OneLineMonthAndDay
  TwoDigitsMonth: boolean = false
  TwoDigitsDay: boolean = false
}

export class Date{
  MonthAndDay: MonthAndDay
  WeekDay: ImageSet
  MonthAlt: NumberExtendedJson
  DayAlt: NumberExtendedJson
}

export class DistanceAlt{
  Number: NumberExtendedJson
  DecimalPointerImageIndex: number
  SuffixKMIcon: Image
  SuffixMIIcon: Image
}

export class ActivityAlt{
  Pulse: NumberExtendedJson
  Battery: NumberExtendedJson
  Calories: NumberExtendedJson
  Steps: NumberExtendedJson
  BatterySuffixImageIndex: number
  PulseNoDataImageIndex: number
  Distance: DistanceAlt
  Icon1: Image
  Icon2: Image
  Icon3: Image
  Icon4: Image
  Icon5: Image
}

export class AmPmIcon{
  X: number
  Y: number
  ImageIndexAMCN: number
  ImageIndexPMCN: number
  ImageIndexAMEN: number
  ImageIndexPMEN: number
}

export class IconSet{
  ImageIndex: number
  Coordinates: Coordinates[] = []
}

export class CircleScale{
  CenterX:  number = 0
  CenterY:  number = 0
  RadiusX:  number = 0
  RadiusY:  number = 0
  StartAngle:  number = 0
  EndAngle:  number = 360
  Width:  number = 0
  Color: string
}

export class PointerScale{
  CenterX: number = 0
  CenterY: number = 0
  RangeFrom: number = 0
  RangeTo: number = 360
  PointerImageIndex: number
  PointerCenterOfRotationY: number
}

export class Scale{
  PointerScale: PointerScale
}

export class StepsProgress{
  GoalImage: Image
  Linear: IconSet
  Gauge: ImageSet
  Circle: CircleScale
}

export class PulseProgress{
  Image1: Image
  Image2: Image
  Image3: Image
  Image4: Image
  Image5: Image
  Image6: Image
  Circle: CircleScale
}

export class Icon{
  Images: ImageSet
}
export class WeatherIcon{
  CustomIcon: ImageSet
}

export class TextTemperature{
  Number: NumberJson
  MinusImageIndex:  number
  DegreesImageIndex:  number
}

export class OneLineMinMax {
  Number: NumberJson
  MinusImageIndex:  number
  DelimiterImageIndex:  number
  AppendDegresForBoth:  boolean
  DegreesImageIndex:  number
}

export class Separate {
  Day: TextTemperature
  Night: TextTemperature
  DayAlt:  Coordinates
  NightAlt:  Coordinates
}

export class TodayTemperature {
  SeparateTemperature: Separate
  OneLine: OneLineMinMax
}
export class Temperature{
  Current: TextTemperature
  Today: TodayTemperature
}

export class AirQuality{
  Number: NumberJson
  Icon: Image
}

export class Humidity{
  Number: NumberJson
  SuffixImageIndex: number
  Icon: Image
}

export class UVindex{
  UVindexNumber: NumberJson
  SuffixImageIndex: number
  Shortcut: ShortcutElement
  UVindexIcon: Image
}

export class Weather{
  Icon: WeatherIcon
  Temperature: Temperature
  AQI: AirQuality
  Humidity: Humidity
  // UVindex: UVindex
}

export class Switch{
  Coordinates: Coordinates = new Coordinates()
  ImageIndexOn: number
  ImageIndexOff: number
}

export class Status{
  DoNotDisturb: Switch
  Lock: Switch
  Bluetooth: Switch
  Alarm: Switch
}

export class BatteryFormatedNumber {
  Number: NumberJson
  SuffixImageIndex: number
  Unknown3: number
  IconImageIndex: number
}

export class Battery{
  Text: BatteryFormatedNumber
  Icon: ImageSet
  Scale: IconSet
  Circle: CircleScale
}

export class Shortcut{
  Element: ShortcutElement
}

export class Shortcuts{
  State: Shortcut
  Pulse: Shortcut
  Weather: Shortcut
 }

export class ClockHand{
  OnlyBorder: boolean
  Color: string
  Center: Coordinates = new Coordinates()
  Shape: Coordinates[] = []
  CenterImage: Image 
}

export class AnalogDialFace{
  Hours: ClockHand
  Minutes: ClockHand
  Seconds: ClockHand
}

export class DateExtended{
  YearSeparate: FourDigits
  MonthSeparate: TwoDigits
  DaySeparate: TwoDigits
}

export class WeekdayIcon {
  Monday: Image
  Tuesday: Image
  Wednesday: Image
  Thursday: Image
  Friday: Image
  Saturday: Image
  Sunday: Image

}

export class CaloriesProgress {
  Icon: ImageSet
  Circle: CircleScale
}

export class WatchJson{
  Background: Background;
  Time: Time;
  Activity: Activity;
  Date: Date;
  Weather: Weather;
  StepsProgress: StepsProgress;
  Status: Status;
  Battery: Battery;
  AnalogDialFace: AnalogDialFace;
  Shortcuts: Shortcuts;
  DateExtended: DateExtended;
  PulseProgress: PulseProgress;
  PAI: Pai;
  WeekdayIcon: WeekdayIcon;
  ActivityAlt: ActivityAlt;
  CaloriesProgress: CaloriesProgress;
}
