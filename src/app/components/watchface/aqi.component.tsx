import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchAQI, WatchImage, WatchNumber } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  aqi: WatchAQI;
  onUpdate(aqi: WatchAQI): void;
  onCopyFromNormal?(): void,

}



const WatchWeatherAqiComponent: FC<IProps> = ({
  title,
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
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={aqi.collapsed}
              onChange={() => {
                const d = { ...aqi };
                d.collapsed = !d.collapsed;
                onUpdate(d);
              }}
            />
          </div>
        </div>
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
