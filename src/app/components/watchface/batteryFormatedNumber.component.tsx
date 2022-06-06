import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchBatteryFormatedNumber, WatchNumber } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  digit: WatchBatteryFormatedNumber;
  onUpdate(digit: WatchBatteryFormatedNumber): void;
}

const WatchBatteryFormatedNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'suffix', type: BlockType.SelectFile, nvalue: digit.suffix, onChange: onChangeSuffix },
        { title: 'icon', type: BlockType.SelectFile, nvalue: digit.iconimageindex, onChange: onChangeIcon },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeSuffix(index: number) {
    const d = {...digit};
    d.suffix = index;
    onUpdate(d);
  }

  function onChangeIcon(index: number) {
    const d = {...digit};
    d.iconimageindex = index;
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
            digit={digit.number}
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

export default WatchBatteryFormatedNumberComponent;