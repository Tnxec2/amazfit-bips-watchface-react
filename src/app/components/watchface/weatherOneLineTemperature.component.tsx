import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchNumber, WatchOneLineTemperature } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  digit: WatchOneLineTemperature;
  onUpdate(digit: WatchOneLineTemperature): void;
  onCopyFromNormal?(): void,

}

const WatchWeatherOneLineTemperatureComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'minus', type: BlockType.SelectFile, nvalue: digit.minus, onChange: onUpdateMinus },
        { title: 'degrees', type: BlockType.SelectFile, nvalue: digit.degrees, onChange: onChangeDegrees },
      ]
    },
    {
      blocks: [
        { title: 'delimiter', type: BlockType.SelectFile, nvalue: digit.delimiter, onChange: onUpdateDelimiter },
        { title: 'append degrees to both', type: BlockType.Checkbox, checked: digit.appendDegreesToBoth, onChange: onChangeAppendDegreesToBoth },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onUpdateMinus(index: number) {
    const d = {...digit};
    d.minus = index;
    onUpdate(d);
  }

  function onUpdateDelimiter(index: number) {
    const d = {...digit};
    d.delimiter = index;
    onUpdate(d);
  }

  function onChangeDegrees(index: number) {
    const d = {...digit};
    d.degrees = index;
    onUpdate(d);
  }

  function onChangeAppendDegreesToBoth(checked: boolean) {
    const d = {...digit};
    d.appendDegreesToBoth = checked;
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
            showDelimiter={false}
            paddingDisabled={true}
          />
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchWeatherOneLineTemperatureComponent;
