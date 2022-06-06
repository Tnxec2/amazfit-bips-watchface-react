import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchAmPmIcon, WatchTwoDigitsSeparated } from "../../model/watchFace.bips.model";
import AmPmComponent from "./ampm.component";
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
               
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalComponent;
