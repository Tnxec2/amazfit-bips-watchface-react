import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchNumber, WatchTextTemperature } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  digit: WatchTextTemperature;
  onUpdate(digit: WatchTextTemperature): void;
  onCopyFromNormal?(): void,

}

const WatchWeatherFormatedNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'minus', type: BlockType.SelectFile, imageIndex: digit.minus, onChange: onUpdateMinus , imagesCount: 1},
        { title: 'degrees', type: BlockType.SelectFile, imageIndex: digit.degrees, onChange: onChangeDegrees , imagesCount: 1},
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onUpdateMinus(index: number) {
    const d = {...digit};
    d.minus = index;
    onUpdate(d);
  }

  function onChangeDegrees(index: number) {
    const d = {...digit};
    d.degrees = index;
    onUpdate(d);
  }
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
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchWeatherFormatedNumberComponent;
