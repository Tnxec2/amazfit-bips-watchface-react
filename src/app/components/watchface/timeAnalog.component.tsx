import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import ClockHandComponent from "./clockHand.component";

const TimeAnalogComponent: FC = () => {
  const { watchface, toggleAnalog, updateAnalogHours, updateAnalogMinutes, updateAnalogSeconds } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => toggleAnalog()}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${watchface.analogTime.collapsed ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={{...watchface.analogTime.hours}}
          showAngle={false}
          onUpdate={updateAnalogHours}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={{...watchface.analogTime.minutes}}
          onUpdate={updateAnalogMinutes}
          showAngle={false}
        />

        <ClockHandComponent
          title="Seconds"
          clockHand={{...watchface.analogTime.seconds}}
          onUpdate={updateAnalogSeconds}
          showAngle={false}
        />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogComponent;
