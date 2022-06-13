import { FC, useContext} from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import SwitchComponent from "./switch.component";

const StatusComponent: FC = () => {
  const { watchface, toggleStatus,
    updateBluetooth, updateAlarm,
    updateLock, updateDnD } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => toggleStatus()}
      >
        Status
      </Card.Header>
      <Card.Body className={`${watchface.status.collapsed ? "collapse" : ""}`}>
        <SwitchComponent
          title="Bluetooth"
          sw={{...watchface.status.bluetooth}}
          onUpdate={updateBluetooth}
        />
        <SwitchComponent
          title="Do Not Disturb"
          sw={{...watchface.status.doNotDisturb}}
          onUpdate={updateDnD}
        />
        <SwitchComponent
          title="Alarm"
          sw={{...watchface.status.alarm}}
          onUpdate={updateAlarm}
        />
        <SwitchComponent
          title="Lock"
          sw={{...watchface.status.lock}}
          onUpdate={updateLock}
        />
      </Card.Body>
    </Card>
  );
};
export default StatusComponent;
