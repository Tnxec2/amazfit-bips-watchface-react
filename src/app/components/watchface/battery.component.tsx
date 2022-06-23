import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import WatchBatteryFormatedNumberComponent from "./batteryFormatedNumber.component";
import CircleProgressComponent from "./circleProgress.component";
import ImageSetComponent from "./imageSet.component";
import LinearIconSetComponent from "./lineariconset.component";


const BatteryComponent: FC = () => {
  const { watchface, toggleBattery,
    udpateBatteryDigit, updateBatteryIconSet, updateBatteryImageSet, updateBatteryCircle } =
  useContext<IWatchContext>(WatchfaceContext);



  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => toggleBattery()}>
        Battery
      </Card.Header>
      {!watchface.battery.collapsed ? (
        <Card.Body>
          <WatchBatteryFormatedNumberComponent
            title='Number'
            digit={{...watchface.battery.text}}
            onUpdate={udpateBatteryDigit}
          />
          
          <ImageSetComponent 
            title='Image set'
            imageSet={{...watchface.battery.icon}}
            onUpdate={updateBatteryImageSet}
          />
          <LinearIconSetComponent
            title='Icon set'
            linearIconSet={{...watchface.battery.scale}}
            onUpdate={updateBatteryIconSet}
            />
          <CircleProgressComponent
            title='Circle'
            scale={{...watchface.battery.circle}}
            onUpdate={updateBatteryCircle}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default BatteryComponent;
