import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import ClockHandComponent from "./clockHand.component";

const TimeAnalogComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.analogTime.collapsed = !watchface.analogTime.collapsed;
          setWatchface(w);
        }}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${watchface.analogTime.collapsed ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={{...watchface.analogTime.hours}}
          showAngle={false}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.analogTime.hours = ch;
            setWatchface(w);
          }}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={{...watchface.analogTime.minutes}}
          onUpdate={(ch) => {
            const d = { ...watchface };
            d.analogTime.minutes = ch;
            setWatchface(d);
          }}
          showAngle={false}
        />

        <ClockHandComponent
          title="Seconds"
          clockHand={{...watchface.analogTime.seconds}}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.analogTime.seconds = ch;
            setWatchface(w);
          }}
          showAngle={false}
        />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogComponent;
