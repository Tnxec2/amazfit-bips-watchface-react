import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchFormatedNumber, WatchNumber } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  digit: WatchFormatedNumber;
  onUpdate(digit: WatchFormatedNumber): void;
  onCopyFromNormal?(): void,
  showSuffix?: boolean,
  showDecimal?: boolean,
}

const WatchFormatedNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  onCopyFromNormal,
  showSuffix,
  showDecimal,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      disabled: !showSuffix,
      blocks: [
        { title: 'suffix', type: BlockType.SelectFile, imageIndex: digit.suffix, onChange: onChangeSuffix, imagesCount: 1  }
      ]
    },
    {
      disabled: !showDecimal,
      blocks: [
        { title: 'desimal pointer', type: BlockType.SelectFile, imageIndex: digit.decimalPointer, onChange: onChangeDecimalPointer, error: digit.number?.enabled && showDecimal && !digit.decimalPointer ? 'Decimal pointer is not set' : null, imagesCount: 1 },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeSuffix(index: number) {
    const d = {...digit};
    d.suffix = index;
    onUpdate(d);
  }

  function onChangeDecimalPointer(index: number) {
    const d = {...digit};
    d.decimalPointer = index;
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

export default WatchFormatedNumberComponent;
