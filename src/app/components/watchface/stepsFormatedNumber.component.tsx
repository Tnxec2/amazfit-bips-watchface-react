import { FC} from "react";
import { Card } from "react-bootstrap";
import { WatchStepsFormatedNumber, WatchNumber } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  digit: WatchStepsFormatedNumber;
  onUpdate(digit: WatchStepsFormatedNumber): void;
}

const WatchStepsFormatedNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  function onUpdateNumber(number: WatchNumber) {
    const d = {...digit};
    d.number = number;
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
              checked={digit.enabled}
              onChange={() => {
                const d = { ...digit };
                d.enabled = !d.enabled;
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabled ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={{...digit.number}}
            onUpdate={onUpdateNumber} 
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchStepsFormatedNumberComponent;
