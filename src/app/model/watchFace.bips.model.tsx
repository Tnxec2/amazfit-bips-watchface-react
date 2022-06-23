import Color from "../shared/color";
import { Activity, ActivityAlt, AirQuality, AmPmIcon, AnalogDialFace, Background, Battery, BatteryFormatedNumber, CaloriesProgress, CircleScale, ClockHand, Coordinates, Date, DateExtended, StepsFormatedNumber, FourDigits, Humidity, IconSet, Image, ImageSet, LinearIconSet, NumberExtendedJson, NumberJson, OneLineMinMax, Pai, PointerScale, PulseProgress, Shortcut, ShortcutElement, Shortcuts, Status, StepsProgress, Switch, TextTemperature, Time, TwoDigits, WatchJson, Weather, WeekdayIcon, PulseFormatedNumber, DistanceFormatedNumber, CaloriesFormatedNumber } from "./json.bips.model";

interface IDigitConstructor {
  count: number;
  numberLenght: number;
  title: string;
  decimalDelimiter?: boolean;
  timeDelimiter?: boolean;
  displayAnalog?: boolean;
  imageProgressTotal?: number;
}

export const digitTypes = {
  hour: {
    count: 10,
    numberLenght: 2,
    title: 'Hours',
    timeDelimiter: true,
    displayAnalog: false,
    imageProgressTotal: 12,
  },
  min: {
    count: 10,
    numberLenght: 2,
    title: 'Minutes',
    imageProgressTotal: 60,
    displayAnalog: false,
    timeDelimiter: true,
  },
  sec: {
    count: 10,
    numberLenght: 2,
    title: 'Seconds',
    timeDelimiter: true,
    displayAnalog: false,
    imageProgressTotal: 60,
  },
  year: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Year',
  },
  month: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 12,
    title: 'Month',
  },
  monthasword: {
    count: 12,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: 12,
    title: 'Month as word',
  },
  day: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 30,
    title: 'Day',
  },
  weekday: {
    count: 7,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: 7,
    title: 'Weekday',
  },
  battery: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Battery',
  },
  steps: {
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Steps',
  },
  calories: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Calories',
  },
  heartRate: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: 6,
    title: 'Heart rate'
  },
  pai: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'PAI',
  },
  distance: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    decimalDelimiter: true,
    title: 'Distance',
  },
  standUp: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Standup',
  },
  uvIndex: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'UVIndex',
  },
  airQuality: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Air quality',
  },
  humidity: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Humidity',
  },
  sunrise: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    timeDelimiter: true,
    title: 'Sunrise',
  },

  weather: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 26,
    title: 'Weather',
  },
};

export class Coords {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }
}

export class WatchNumber {
  enabled: boolean = false
  json: NumberJson = new NumberJson()
  width: number
  height: number
  con: IDigitConstructor

  constructor(j?: NumberJson, con?: IDigitConstructor) {
    if (j) {
      this.json = j
      this.enabled = true
      this.width = this.json.BottomRightX && this.json.TopLeftX ? this.json.BottomRightX - this.json.TopLeftX : 1
      this.height = this.json.BottomRightY && this.json.TopLeftY ? this.json.BottomRightY - this.json.TopLeftY : 1
    }
    if ( con ) {
      if (!this.json) this.json = new NumberJson()
      this.json.ImagesCount = con.count
      this.con = con
    }
  }
}

export class WatchNumberExt {
  enabled: boolean = false
  json: NumberExtendedJson = new NumberExtendedJson()
  width: number
  height: number
  con: IDigitConstructor

  constructor(j?: NumberExtendedJson, con?: IDigitConstructor) {
    if (j) {
      this.json = j
      this.enabled = true
      this.width = this.json.BottomRightX ? this.json.BottomRightX - this.json.TopLeftX : this.json.TopLeftX + 1
      this.height = this.json.BottomRightY ? this.json.BottomRightY - this.json.TopLeftY : this.json.TopLeftY + 1
    }
    if ( con ) {
      if (!this.json) this.json = new NumberExtendedJson()
      this.json.ImagesCount = con.count
      this.con = con
    }
  }
}


export class WatchShortcutElement {
  enabled: boolean = false
  json: ShortcutElement = new ShortcutElement()

  constructor(j?: ShortcutElement) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}


export class WatchImageSet {
  enabled: boolean = false

  json: ImageSet = new ImageSet()

  constructor(count: number, j?: ImageSet) {
    if (j) {
      this.enabled = true
      this.json = j
    } else {
      if (count) {
        this.json.ImagesCount = count
      } else {
        this.json.ImagesCount = 1
      }
    }
  }
}

export class WatchCoordinates {
  enabled: boolean = false

  json: Coordinates = new Coordinates()

  constructor(j?: Coordinates) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}



export class WatchImage {
  enabled: boolean = false
  json: Image = new Image()
  constructor(j?: Image) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchIconSet {
  enabled: boolean = false
  json: IconSet = new IconSet()
  constructor(j?: IconSet) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchLinearIconSet {
  enabled: boolean = false
  json: LinearIconSet = new LinearIconSet()
  constructor(j?: LinearIconSet) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchCircleScale {
  enabled: boolean = false
  json: CircleScale = new CircleScale()
  constructor(j?: CircleScale) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchScale {
  enabled: boolean = false
  json: PointerScale = new PointerScale()
  constructor(j?: PointerScale) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchPulseProgress {
  collapsed = true
  
  image1: WatchImage = new WatchImage()
  image2: WatchImage = new WatchImage()
  image3: WatchImage = new WatchImage()
  image4: WatchImage = new WatchImage()
  image5: WatchImage = new WatchImage()
  image6: WatchImage = new WatchImage()

  circle: WatchCircleScale = new WatchCircleScale()

  constructor(j?: PulseProgress) {
    if(j) {
      this.circle = new WatchCircleScale(j.Circle)
      this.image1 = new WatchImage(j.Image1)
      this.image2 = new WatchImage(j.Image2)
      this.image3 = new WatchImage(j.Image3)
      this.image4 = new WatchImage(j.Image4)
      this.image5 = new WatchImage(j.Image5)
      this.image6 = new WatchImage(j.Image6)
    }
  }
}
export class WatchStepsProgress {
  collapsed = true
  
  goalImage: WatchImage = new WatchImage()

  gauge: WatchLinearIconSet = new WatchLinearIconSet()
  iconSet: WatchIconSet = new WatchIconSet()
  circle: WatchCircleScale = new WatchCircleScale()

  constructor(j?: StepsProgress) {
    if(j) {
      this.gauge = new WatchLinearIconSet(j.Gauge)
      this.iconSet = new WatchIconSet(j.IconSet)
      this.circle = new WatchCircleScale(j.Circle)
      this.goalImage = new WatchImage(j.GoalImage)
    }
  }
}
export class WatchCaloriesProgress {
  collapsed = true

  icon: WatchImageSet = new WatchImageSet(digitTypes.calories.imageProgressTotal)
  circle: WatchCircleScale = new WatchCircleScale()

  constructor(j?: CaloriesProgress) {
    if(j) {
      this.icon = new WatchImageSet(digitTypes.calories.imageProgressTotal, j.Icon)
      this.circle = new WatchCircleScale(j.Circle)
    }
  }
}


export class WatchTextTemperature {
  enabled: boolean = false
  number: WatchNumber = new WatchNumber(null, digitTypes.weather)
  minus: number
  degrees: number

  con: IDigitConstructor

  constructor(j?: TextTemperature, con?: IDigitConstructor) {
    if (j) {
      this.number = new WatchNumber(j.Number, digitTypes.weather)
      this.minus = j.MinusImageIndex
      this.degrees = j.DegreesImageIndex
      this.enabled = true

    }
    if ( con ) {
      if (!this.number) this.number = new WatchNumber(null, con)
      this.number.json.ImagesCount = con.count
      this.con = con
    }
  }
}

export class WatchOneLineTemperature {
  enabled: boolean = false
  number: WatchNumber = new WatchNumber(null, digitTypes.weather)
  minus: number
  degrees: number
  delimiter: number
  appendDegreesToBoth: boolean

  con: IDigitConstructor

  constructor(j?: OneLineMinMax, con?: IDigitConstructor) {
    if (j) {
      this.number = new WatchNumber(j.Number, digitTypes.weather)
      this.minus = j.MinusSignImageIndex
      this.degrees = j.DegreesImageIndex
      this.delimiter = j.DelimiterImageIndex
      this.appendDegreesToBoth = j.AppendDegresForBoth
      this.enabled = true
    }
    if ( con ) {
      if (!this.number) this.number = new WatchNumber(null, con)
      this.con = con
    }
  }
}

export class WatchAQI {
  collapsed: boolean

  number: WatchNumber = new WatchNumber(null,  digitTypes.airQuality)
  icon: WatchImage = new WatchImage()


  constructor(j?: AirQuality) {
    if (j) {
      this.icon = new WatchImage(j.Icon)
      this.number = new WatchNumber(j.Number, digitTypes.airQuality)
    }
  }
}

export class WatchHumidity {
  collapsed: boolean

  number: WatchNumber = new WatchNumber(null,  digitTypes.airQuality)
  icon: WatchImage = new WatchImage()
  suffix: number

  constructor(j?: Humidity) {
    if (j) {
      this.icon = new WatchImage(j.Icon)
      this.number = new WatchNumber(j.Number, digitTypes.airQuality)
      this.suffix = j.SuffixImageIndex
    }
  }
}

export class WatchWeather {
  collapsed: boolean = true
  temperatureCollapsed: boolean = true

  customIcon: WatchImageSet = new WatchImageSet(digitTypes.weather.imageProgressTotal)
  current: WatchTextTemperature = new WatchTextTemperature()
  
  todayOneLine: WatchOneLineTemperature = new WatchOneLineTemperature(null, digitTypes.weather)

  day: WatchTextTemperature = new WatchTextTemperature(null, digitTypes.weather)

  dayAltCoords: WatchCoordinates = new WatchCoordinates()
  nightAltCoords: WatchCoordinates = new WatchCoordinates()
  night: WatchTextTemperature = new WatchTextTemperature(null, digitTypes.weather)

  aqi: WatchAQI = new WatchAQI()
  humidity: WatchHumidity = new WatchHumidity()

  constructor(j?: Weather) {
    if (j) {
      this.customIcon = new WatchImageSet(digitTypes.weather.imageProgressTotal, j.Icon?.CustomIcon)
    
      if (j.Temperature) {
        if (j.Temperature.Current)
          this.current = new WatchTextTemperature(j.Temperature.Current, digitTypes.weather)

        if (j.Temperature?.Today) {
          if ( j.Temperature?.Today.OneLine) {
            this.todayOneLine = new WatchOneLineTemperature(j.Temperature.Today.OneLine)
          }
          if (j.Temperature?.Today.SeparateTemperature) {
            this.day = new WatchTextTemperature(j.Temperature.Today.SeparateTemperature.Day, digitTypes.weather)
            this.night = new WatchTextTemperature(j.Temperature.Today.SeparateTemperature.Night, digitTypes.weather)
            this.dayAltCoords = new WatchCoordinates(j.Temperature.Today.SeparateTemperature.DayAlt)
            this.nightAltCoords = new WatchCoordinates(j.Temperature.Today.SeparateTemperature.NightAlt)
          }
        }
        
      }
      if (j.AQI) {
        this.aqi = new WatchAQI(j.AQI)
      }
      if (j.Humidity) {
        this.humidity = new WatchHumidity(j.Humidity)
      }
    }
  }
}

export class WatchClockHand {
  enabled: boolean = false
  json: ClockHand = new ClockHand()
  constructor(j?: ClockHand) {
    if (j) {
      this.json = j
      this.enabled = true
    }
  }
}



export class WatchTwoDigitsSeparated {
  json: TwoDigits = new TwoDigits()
  enabled: boolean = false

  constructor(j?: TwoDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchFourDigitsSeparated {
  json: FourDigits = new FourDigits()
  enabled: boolean = false

  constructor(j?: FourDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}


export class WatchAmPmIcon {
  collapsed = true

  enabled: boolean = false
  json: AmPmIcon = new AmPmIcon()
  constructor(j?: AmPmIcon) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchCaloriesFormatedNumber {
  enabled: boolean

  number: WatchNumber = new WatchNumber()
  prefix: number

  constructor(con?: IDigitConstructor, j?: CaloriesFormatedNumber) {
    if (j) {
      this.enabled = true
      this.number = new WatchNumber(j.Number, con)
      this.prefix = j.PrefixImageIndex
    } else if (con) {
      this.number = new WatchNumber(null, con)
    }
  }
}

export class WatchStepsFormatedNumber {
  enabled: boolean

  number: WatchNumber = new WatchNumber()

  constructor(con?: IDigitConstructor, j?: StepsFormatedNumber) {
    if (j) {
      this.enabled = true
      this.number = new WatchNumber(j.Number, con)
    } else if (con) {
      this.number = new WatchNumber(null, con)
    }
  }
}

export class WatchPulseFormatedNumber {
  enabled: boolean

  number: WatchNumber = new WatchNumber()
  noData: number
  decimalPointer: number
  suffixMiles: number


  constructor(con?: IDigitConstructor, j?: PulseFormatedNumber) {
    if (j) {
      this.enabled = true
      this.number = new WatchNumber(j.Number, con)
      this.noData = j.NoDataImageIndex
    } else if (con) {
      this.number = new WatchNumber(null, con)
    }
  }
}

export class WatchDistanceFormatedNumber {
  enabled: boolean

  number: WatchNumber = new WatchNumber()
  suffix: number
  decimalPointer: number
  suffixMiles: number


  constructor(con?: IDigitConstructor, j?: DistanceFormatedNumber) {
    if (j) {
      this.enabled = true
      this.number = new WatchNumber(j.Number, con)
      this.suffix = j.SuffixImageIndex
      this.decimalPointer = j.DecimalPointImageIndex
      this.suffixMiles = j.SuffixMilesImageIndex
    } else if (con) {
      this.number = new WatchNumber(null, con)
    }
  }
}

export class WatchBatteryFormatedNumber {
  enabled: boolean

  number: WatchNumber = new WatchNumber(null, digitTypes.battery)
  suffix: number
  iconimageindex: number


  constructor(con?: IDigitConstructor, j?: BatteryFormatedNumber) {
    if (j) {
      this.enabled = true
      this.number = new WatchNumber(j.Number, con)
      this.suffix = j.SuffixImageIndex
      this.iconimageindex = j.IconImageIndex
    } else if (con) {
      this.number = new WatchNumber(null, con)
    }
  }
}

export class WatchBattery {
  collapsed: boolean = true

  text: WatchBatteryFormatedNumber = new WatchBatteryFormatedNumber(digitTypes.battery)
  scale: WatchLinearIconSet = new WatchLinearIconSet()
  icon: WatchImageSet = new WatchImageSet(digitTypes.battery.imageProgressTotal)
  circle: WatchCircleScale = new WatchCircleScale()

  constructor(j?: Battery) {
    if (j) {
      if(j.Text) { this.text = new WatchBatteryFormatedNumber(digitTypes.battery, j.Text) }
      if(j.Icon) { this.icon = new WatchImageSet(digitTypes.battery.imageProgressTotal, j.Icon) ;}
      if(j.Scale) { this.scale = new WatchLinearIconSet(j.Scale) ;}
      if(j.Circle) { this.circle = new WatchCircleScale(j.Circle)}
    }
  }
}

export class WatchSwitch {
  enabled: boolean = false
  json: Switch = new Switch()
  constructor(j?: Switch) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchStatus {
  collapsed = true;

  doNotDisturb: WatchSwitch = new WatchSwitch()
  lock: WatchSwitch = new WatchSwitch()
  bluetooth: WatchSwitch = new WatchSwitch()
  alarm: WatchSwitch = new WatchSwitch()

  constructor(j?: Status) {
    if (j) {
      this.doNotDisturb = new WatchSwitch(j.DoNotDisturb)
      this.lock = new WatchSwitch(j.Lock)
      this.bluetooth = new WatchSwitch(j.Bluetooth)
      this.alarm = new WatchSwitch(j.Alarm)
    }
  }
}


export class WatchActivityList {
  collapsed = true

  steps: WatchStepsFormatedNumber = new WatchStepsFormatedNumber(digitTypes.steps)
  stepsGoals: WatchStepsFormatedNumber = new WatchStepsFormatedNumber(digitTypes.steps)
  calories: WatchCaloriesFormatedNumber = new WatchCaloriesFormatedNumber(digitTypes.calories)
  pulse: WatchPulseFormatedNumber = new WatchPulseFormatedNumber(digitTypes.heartRate)
  distance: WatchDistanceFormatedNumber = new WatchDistanceFormatedNumber(digitTypes.distance)
  
    constructor(j?: Activity) {
    if (j) {
      if (j.Steps) this.steps = new WatchStepsFormatedNumber(digitTypes.steps, j.Steps)
      if (j.StepsGoal) this.stepsGoals = new WatchStepsFormatedNumber(digitTypes.steps, j.StepsGoal)
      if (j.Calories) this.calories = new WatchCaloriesFormatedNumber(digitTypes.calories, j.Calories)
      if (j.Pulse) this.pulse = new WatchPulseFormatedNumber(digitTypes.heartRate, j.Pulse)
      if (j.Distance) this.distance = new WatchDistanceFormatedNumber(digitTypes.distance, j.Distance)
    }
  }
}

export class WatchPai {
  collapsed = true

  imageLow: WatchImage = new WatchImage()
  numberLow: WatchNumber = new WatchNumber()
  imageNormal: WatchImage = new WatchImage()
  numberNormal: WatchNumber = new WatchNumber()
  imageHigh: WatchImage = new WatchImage()
  numberHigh: WatchNumber = new WatchNumber()
  imageNoData: WatchImage = new WatchImage()
  numberGeneral: WatchNumber = new WatchNumber()

  
    constructor(j?: Pai) {
    if (j) {
      if (j.IconLow) this.imageLow = new WatchImage(j.IconLow)
      if (j.IconNormal) this.imageNormal = new WatchImage(j.IconNormal)
      if (j.IconHigh) this.imageHigh = new WatchImage(j.IconHigh)
      if (j.NumberLow) this.numberLow = new WatchNumber(j.NumberLow)
      if (j.NumberNormal) this.numberNormal = new WatchNumber(j.NumberNormal)
      if (j.NumberHigh) this.numberHigh = new WatchNumber(j.NumberHigh)
      if (j.NumberGeneral) this.numberGeneral = new WatchNumber(j.NumberGeneral)

      if (j.NoDataImage) this.imageNoData = new WatchImage(j.NoDataImage)
    }
  }
}

export class WatchDate {
  collapsed = true
  
  weekday: WatchImageSet = new WatchImageSet(digitTypes.weekday.imageProgressTotal)
  month: WatchNumber = new WatchNumber(null, digitTypes.month)
  montName: WatchImageSet = new WatchImageSet(digitTypes.monthasword.imageProgressTotal)
  day: WatchNumber = new WatchNumber(null, digitTypes.day)

  oneLine: boolean
  oneLineDelimiter: number

  twoDigitsMonth: boolean
  twoDigitsDay: boolean

  collapsedAlt = true
  monthAlt = new WatchNumberExt(null, digitTypes.month)
  dayAlt = new WatchNumberExt(null, digitTypes.day)

  constructor(j?: Date) {
    if (j) {
        if (j.WeekDay){
          this.weekday = new WatchImageSet(digitTypes.weekday.imageProgressTotal, j.WeekDay)
        }
        if (j.MonthAndDay) {
          if ( j.MonthAndDay.Separate) {
            this.month = new WatchNumber(j.MonthAndDay.Separate.Month, digitTypes.month)
            this.montName = new WatchImageSet(digitTypes.monthasword.imageProgressTotal, j.MonthAndDay.Separate.MonthName)
            this.day =  new WatchNumber(j.MonthAndDay.Separate.Day, digitTypes.day)
          }
          if ( j.MonthAndDay.OneLine) {
            this.month = new WatchNumber(j.MonthAndDay.OneLine.Number, digitTypes.month)
            this.oneLine = true
            this.oneLineDelimiter = j.MonthAndDay.OneLine.DelimiterImageIndex
          }
          
          this.twoDigitsMonth = j.MonthAndDay.TwoDigitsMonth
          this.twoDigitsDay = j.MonthAndDay.TwoDigitsDay
        } 
        if (j.MonthAlt) this.monthAlt = new WatchNumberExt(j.MonthAlt, digitTypes.month)
        if (j.DayAlt) this.dayAlt = new WatchNumberExt(j.DayAlt, digitTypes.day)
      }
    }
  }



  export class WatchActivityAlt{
    collapsed = true
    
    
    pulse = new WatchNumberExt(null, digitTypes.heartRate)
    battery = new WatchNumberExt(null, digitTypes.battery)
    calories = new WatchNumberExt(null, digitTypes.calories)
    steps = new WatchNumberExt(null, digitTypes.steps)
    batterySuffix: number
    pulseNoData: number
    distance = new WatchNumberExt(null, digitTypes.distance)
    distanceDecimalPointer: number
    distanceSuffixKM = new WatchImage()
    distanceSuffixMi = new WatchImage()
    icon1 = new WatchImage()
    icon2 = new WatchImage()
    icon3 = new WatchImage()
    icon4 = new WatchImage()
    icon5 = new WatchImage()
  
    constructor(j?: ActivityAlt) {
      if (j) {
          
          if (j.Pulse) this.pulse = new WatchNumberExt(j.Pulse, digitTypes.heartRate)
          if (j.Battery) this.battery = new WatchNumberExt(j.Battery, digitTypes.battery)
          if (j.Calories) this.calories = new WatchNumberExt(j.Calories, digitTypes.calories)
          if (j.Steps) this.steps = new WatchNumberExt(j.Steps, digitTypes.steps)
          if (j.Distance) this.distance = new WatchNumberExt(j.Distance.Number, digitTypes.distance)
          this.batterySuffix = j.BatterySuffixImageIndex
          this.pulseNoData = j.PulseNoDataImageIndex
          this.distanceDecimalPointer = j.Distance?.DecimalPointerImageIndex
          if (j.Distance?.SuffixKMIcon) this.distanceSuffixKM = new WatchImage(j.Distance.SuffixKMIcon)
          if (j.Distance?.SuffixMIIcon) this.distanceSuffixMi = new WatchImage(j.Distance.SuffixMIIcon)
          
          if (j.Icon1) this.icon1 = new WatchImage(j.Icon1)
          if (j.Icon2) this.icon1 = new WatchImage(j.Icon2)
          if (j.Icon3) this.icon1 = new WatchImage(j.Icon3)
          if (j.Icon4) this.icon1 = new WatchImage(j.Icon4)
          if (j.Icon5) this.icon1 = new WatchImage(j.Icon5)
        }
      }
    }
  

export class WatchTimeAnalog {
  collapsed = true

  hours: WatchClockHand = new WatchClockHand()
  minutes: WatchClockHand = new WatchClockHand()
  seconds: WatchClockHand = new WatchClockHand()

  constructor(j?: AnalogDialFace) {
    if (j) {
      this.hours = new WatchClockHand(j.Hours)
      this.minutes = new WatchClockHand(j.Minutes)
      this.seconds = new WatchClockHand(j.Seconds)
    }
  }
}





export class WatchTime {
  collapsed = true

  hours: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  minutes: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  seconds: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  ampm: WatchAmPmIcon = new WatchAmPmIcon()
  drawingOrder: string

  collapsedSunrise = true
  sunriseHours = new WatchNumber(null, digitTypes.sunrise)
  sunriseMinutes = new WatchNumber(null, digitTypes.sunrise)
  sunsetHours = new WatchNumber(null, digitTypes.sunrise)
  sunsetMinutes = new WatchNumber(null, digitTypes.sunrise)
  sunriseHoursNoData = new WatchImage()
  sunriseMinutesNoData = new WatchImage()
  sunsetHoursNoData = new WatchImage()
  sunsetMinutesNoData = new WatchImage()

  constructor(j?: Time) {
    if (j) {
      this.hours = new WatchTwoDigitsSeparated(j.Hours)
      this.minutes = new WatchTwoDigitsSeparated(j.Minutes)
      this.seconds = new WatchTwoDigitsSeparated(j.Seconds)
      this.ampm = new WatchAmPmIcon(j.AmPm)
      this.drawingOrder = j.DrawingOrder
      this.sunriseHours = new WatchNumber(j.SunriseHours, digitTypes.sunrise)
      this.sunriseMinutes = new WatchNumber(j.SunriseMinutes, digitTypes.sunrise)
      this.sunsetHours = new WatchNumber(j.SunsetHours, digitTypes.sunrise)
      this.sunsetMinutes = new WatchNumber(j.SunsetMinutes, digitTypes.sunrise)
      this.sunriseHoursNoData = new WatchImage(j.SunriseHoursNoDataImage)
      this.sunriseMinutesNoData = new WatchImage(j.SunriseMinutesNoDataImage)
      this.sunsetHoursNoData = new WatchImage(j.SunsetHoursNoDataImage)
      this.sunsetMinutesNoData = new WatchImage(j.SunsetMinutesNoDataImage)
    }
  }
}

export class WatchBackground {
  collapsed = true
  
  image: WatchImage = new WatchImage()
  preview: WatchImage = new WatchImage()
  frontImage: WatchImage = new WatchImage()
  color: string = Color.DEFAULT_COLOR

  constructor(j?: Background) {
    if (j) {
      this.image = new WatchImage(j.Image)
      this.preview = new WatchImage(j.Preview)
      this.frontImage = new WatchImage(j.FrontImage)
      this.color = Color.colorRead(j.BackgroundColor)
    }
  }
}

export class WatchShortcut {
  enabled: boolean
  json: Shortcut = new Shortcut()

  constructor(j?: Shortcut) {
    if (j) {
      this.enabled = true
      this.json = j
    }

  }
}

export class WatchShortcuts {
  collapsed = true
  
  state: WatchShortcut = new WatchShortcut()
  weather: WatchShortcut = new WatchShortcut()
  pulse: WatchShortcut = new WatchShortcut()

  constructor(j?: Shortcuts) {
    if (j) {
      this.state = new WatchShortcut(j.State)
      this.weather = new WatchShortcut(j.Weather)
      this.pulse = new WatchShortcut(j.Weather)
    }
  }
}

export class WatchDateExtended {
  collapsed = true
  
  years: WatchFourDigitsSeparated = new WatchFourDigitsSeparated()
  month: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  day: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()

  constructor(j?: DateExtended) {
    if (j) {
      this.years = new WatchFourDigitsSeparated(j.YearSeparate)
      this.month = new WatchTwoDigitsSeparated(j.MonthSeparate)
      this.day = new WatchTwoDigitsSeparated(j.DaySeparate)
    }
  }
}

export class WatchWeekdayStatus {
    Monday: WatchImage = new WatchImage()
    Tuesday: WatchImage = new WatchImage()
    Wednesday: WatchImage = new WatchImage()
    Thursday: WatchImage = new WatchImage()
    Friday: WatchImage = new WatchImage()
    Saturday: WatchImage = new WatchImage()
    Sunday: WatchImage = new WatchImage()
    collapsed = true;
    constructor(j?: WeekdayIcon) {
      if (j) {
        this.Monday = new WatchImage(j.Monday)
        this.Tuesday = new WatchImage(j.Tuesday)
        this.Wednesday = new WatchImage(j.Wednesday)
        this.Thursday = new WatchImage(j.Thursday)
        this.Friday = new WatchImage(j.Friday)
        this.Saturday = new WatchImage(j.Saturday)
        this.Sunday = new WatchImage(j.Sunday)

      }
    }
}

export class WatchFace {
  collapsedActivityBlock = true
  
  background: WatchBackground = new WatchBackground();
  time: WatchTime = new WatchTime()
  date: WatchDate = new WatchDate();
  activity: WatchActivityList = new WatchActivityList();
  status = new WatchStatus();
  battery = new WatchBattery()
  stepsProgress = new WatchStepsProgress()
  weather: WatchWeather = new WatchWeather()
  analogTime: WatchTimeAnalog = new WatchTimeAnalog()
  shortcuts: WatchShortcuts = new WatchShortcuts()
  dateExtended: WatchDateExtended = new WatchDateExtended()
  pulseProgress = new WatchPulseProgress()
  pai = new WatchPai()
  weekdayicon = new WatchWeekdayStatus()
  activityAlt = new WatchActivityAlt()
  caloriesProgress = new WatchCaloriesProgress()

  constructor(j?: WatchJson) {
    if (!j) return;

    this.background = new WatchBackground(j.Background);
    this.time = new WatchTime(j.Time)
    this.date = new WatchDate(j.Date)
    this.activity = new WatchActivityList(j.Activity)
    this.stepsProgress = new WatchStepsProgress(j.StepsProgress)
    this.status = new WatchStatus(j.Status)
    this.battery = new WatchBattery(j.Battery)
    this.weather = new WatchWeather(j.Weather)
    this.analogTime = new WatchTimeAnalog(j.AnalogDialFace)
    this.shortcuts = new WatchShortcuts(j.Shortcuts)
    this.dateExtended = new WatchDateExtended(j.DateExtended)
    this.pulseProgress = new WatchPulseProgress(j.PulseProgress)
    this.pai = new WatchPai(j.PAI)
    this.weekdayicon = new WatchWeekdayStatus(j.WeekdayIcon)
    this.activityAlt = new WatchActivityAlt(j.ActivityAlt)
    this.caloriesProgress = new WatchCaloriesProgress(j.CaloriesProgress)
  }
}
