import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { WatchBatteryFormatedNumber, WatchCircleScale, WatchIconSet, WatchImageSet } from "../../model/watchFace.bips.model";
import WatchBatteryFormatedNumberComponent from "./batteryFormatedNumber.component";
import CircleProgressComponent from "./circleProgress.component";
import IconSetComponent from "./iconSet.component";
import ImageSetComponent from "./imageSet.component";


const BatteryComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);


  function udpateDigit(fn: WatchBatteryFormatedNumber) {
    const w = {...watchface};
    w.battery.text = fn
    setWatchface(w)
  }

  function updateImageSet(iconset: WatchImageSet) {
    const w = {...watchface};
    w.battery.icon = iconset
    setWatchface(w)
  }
  
  function updateIconSet(is: WatchIconSet) {
    const w = {...watchface};
    w.battery.scale = is
    setWatchface(w)
  }

  function updateCircle(c: WatchCircleScale) {
    const w = {...watchface};
    w.battery.circle = c
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.battery.collapsed = !w.battery.collapsed;
          setWatchface(w);
        }}>
        Battery
      </Card.Header>
      {!watchface.battery.collapsed ? (
        <Card.Body>
          <WatchBatteryFormatedNumberComponent
            title='Number'
            digit={{...watchface.battery.text}}
            onUpdate={udpateDigit}
          />
          
          <ImageSetComponent 
            title='Image set'
            imageSet={{...watchface.battery.icon}}
            onUpdate={updateImageSet}
          />
          <IconSetComponent
            title='Icon set'
            iconSet={{...watchface.battery.scale}}
            onUpdate={updateIconSet}
            />
          <CircleProgressComponent
            title='Circle'
            scale={{...watchface.battery.circle}}
            onUpdate={updateCircle}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default BatteryComponent;
