import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchAmPmIcon, WatchImage, WatchNumber, WatchTwoDigitsSeparated } from "../../model/watchFace.bips.model";
import AmPmComponent from "./ampm.component";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import SeparatedDigitsComponent from "./separatedDigits.component";

const TimeDigitalComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

    function updateAmPm(d: WatchAmPmIcon) {
      const w = {...watchface}
      w.time.ampm = d;
      setWatchface(w);
    }

  function updateHours(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.hours = h;
    setWatchface(w);
  }
  
  function updateMinutes(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.minutes = h;
    setWatchface(w);
  }

  function updateSeconds(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.seconds = h;
    setWatchface(w);
  }

  function updateSunriseHours(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunriseHours = h;
    setWatchface(w);
  }
  function updateSunriseMinutes(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunriseMinutes = h;
    setWatchface(w);
  }
  function updateSunsetHours(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunsetHours = h;
    setWatchface(w);
  }
  function updateSunsetMinutes(h: WatchNumber) {
    const w = {...watchface};
    w.time.sunsetMinutes = h;
    setWatchface(w);
  }
  function updateSunriseHoursNoData(h: WatchImage) {
    const w = {...watchface};
    w.time.sunriseHoursNoData = h;
    setWatchface(w);
  }
    function updateSunriseMinutesNoData(h: WatchImage) {
    const w = {...watchface};
    w.time.sunriseMinutesNoData = h;
    setWatchface(w);
  }
  function updateSunsetHoursNoData(h: WatchImage) {
    const w = {...watchface};
    w.time.sunsetHoursNoData = h;
    setWatchface(w);
  }
  function updateSunsetMinutesNoData(h: WatchImage) {
    const w = {...watchface};
    w.time.sunsetMinutesNoData = h;
    setWatchface(w);
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.collapsed = !watchface.time.collapsed;
          setWatchface(w);
        }}
      >
        Time Digital
      </Card.Header>
      <Card.Body className={`${watchface.time.collapsed ? "collapse" : ""}`}>
        <SeparatedDigitsComponent
          title="Hours"
          digit={{...watchface.time.hours}}
          amountOfDigits={2}
          onUpdate={updateHours}
        />
        <SeparatedDigitsComponent
          title="Minutes"
          digit={{...watchface.time.minutes}}
          amountOfDigits={2}
          onUpdate={updateMinutes}
        />
        <SeparatedDigitsComponent
          title="Seconds"
          digit={{...watchface.time.seconds}}
          amountOfDigits={2}
          onUpdate={updateSeconds}
        />
        <AmPmComponent
            title='AmPm' 
            ampm={{...watchface.time.ampm}}
            onUpdate={updateAmPm}
            />
        <Card>
          <Card.Header
            onClick={() => {
              let w = { ...watchface };
              w.time.collapsedSunrise = !watchface.time.collapsedSunrise;
              setWatchface(w);
            }}
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
