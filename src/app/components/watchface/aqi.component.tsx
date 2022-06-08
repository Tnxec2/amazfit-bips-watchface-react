import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchAQI, WatchImage, WatchNumber } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";

interface IProps {
  aqi: WatchAQI;
  onUpdate(aqi: WatchAQI): void;
}

const WatchWeatherAqiComponent: FC<IProps> = ({
  aqi,
  onUpdate,
}) => {

  function onUpdateNumber(number: WatchNumber) {
    const d = {...aqi};
    d.number = number;
    onUpdate(d);
  }

  function onUpdateIcon(icon: WatchImage) {
    const d = {...aqi};
    d.icon = icon;
    onUpdate(d);
  }

  return (
    <Card>
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...aqi };
          w.collapsed = !w.collapsed;
          onUpdate(w);
        }}>
          Air Quaility
      </Card.Header>
      {aqi.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={aqi.number}
            onUpdate={onUpdateNumber} 
            showDelimiter={false}
            paddingDisabled={true}
          />
          <ImageComponent
            title="Icon"
            image={{...aqi.icon}}
            onUpdate={onUpdateIcon}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchWeatherAqiComponent;
