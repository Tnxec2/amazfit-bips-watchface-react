import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import AmPmComponent from "./ampm.component";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import SeparatedDigitsComponent from "./separatedDigits.component";

const TimeDigitalComponent: FC = () => {
  const { watchface, toggleTimeDigital, updateHoursDigital, updateMinutesDigital, updateSecondsDigital,
    updateAmPm, updateSunriseHours, updateSunriseHoursNoData, updateSunriseMinutes, updateSunriseMinutesNoData,
    updateSunsetHours, updateSunsetHoursNoData, updateSunsetMinutes, updateSunsetMinutesNoData, toggleSunrise
   } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => {toggleTimeDigital()}}
      >
        Time Digital
      </Card.Header>
      <Card.Body className={`${watchface.time.collapsed ? "collapse" : ""}`}>
        <SeparatedDigitsComponent
          title="Hours"
          digit={{...watchface.time.hours}}
          amountOfDigits={2}
          onUpdate={updateHoursDigital}
        />
        <SeparatedDigitsComponent
          title="Minutes"
          digit={{...watchface.time.minutes}}
          amountOfDigits={2}
          onUpdate={updateMinutesDigital}
        />
        <SeparatedDigitsComponent
          title="Seconds"
          digit={{...watchface.time.seconds}}
          amountOfDigits={2}
          onUpdate={updateSecondsDigital}
        />
        <AmPmComponent
            title='AmPm' 
            ampm={{...watchface.time.ampm}}
            onUpdate={updateAmPm}
            />
        <Card>
          <Card.Header
            onClick={() => toggleSunrise()}
          >
            Sunrise / Sunset
          </Card.Header>
          <Card.Body className={`${watchface.time.collapsedSunrise ? "collapse" : ""}`}>
            <WatchNumberComponent
              title="Sunrise Hours"
              digit={{...watchface.time.sunriseHours}}
              onUpdate={updateSunriseHours}
            />
            <WatchNumberComponent
              title="Sunrise Minutes"
              digit={{...watchface.time.sunriseMinutes}}
              onUpdate={updateSunriseMinutes}
            />
            <ImageComponent
              title="Sunrise Hours NoData"
              image={{...watchface.time.sunriseHoursNoData}}
              onUpdate={updateSunriseHoursNoData}
            />
            <ImageComponent
              title="Sunrise Minutes NoData"
              image={{...watchface.time.sunriseMinutesNoData}}
              onUpdate={updateSunriseMinutesNoData}
            />

            <WatchNumberComponent
              title="Sunset Hours"
              digit={{...watchface.time.sunsetHours}}
              onUpdate={updateSunsetHours}
            />
            <WatchNumberComponent
              title="Sunset Minutes"
              digit={{...watchface.time.sunsetMinutes}}
              onUpdate={updateSunsetMinutes}
            />
            <ImageComponent
              title="Sunset Hours NoData"
              image={{...watchface.time.sunsetHoursNoData}}
              onUpdate={updateSunsetHoursNoData}
            />
            <ImageComponent
              title="Sunset Minutes NoData"
              image={{...watchface.time.sunsetMinutesNoData}}
              onUpdate={updateSunsetMinutesNoData}
            />
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalComponent;
