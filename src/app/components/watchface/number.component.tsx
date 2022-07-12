import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsAlignmentBipS } from "../../model/blocks.model";
import { WatchNumber } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  digit: WatchNumber;
  onUpdate(digit: WatchNumber): void;
}

const WatchNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, imageIndex: digit.json?.ImageIndex, onChange: onChangeImageIndex, error: digit.enabled && !digit.json?.ImageIndex ? 'Image not set' : '', imagesCount: digit.json?.ImagesCount },
        { title: `Count: ${digit.json?.ImagesCount}`, type: BlockType.Empty },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, numberValue: digit.json?.TopLeftX ? digit.json.TopLeftX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, numberValue: digit.json?.TopLeftY ? digit.json.TopLeftY : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'Bottom Right X', type: BlockType.Number, numberValue: digit.json?.BottomRightX ? digit.json.BottomRightX : 0, onChange: onChangeBottomRightX, error: digit.json.BottomRightX <= digit.json.TopLeftX ? 'set box border correct' : null},
        { title: 'Bottom Right Y', type: BlockType.Number, numberValue: digit.json?.BottomRightX ? digit.json.BottomRightY : 0, onChange: onChangeBottomRightY, error: digit.json.BottomRightY <= digit.json.TopLeftY ? 'set box border correct' : null },
      ]
    },
    {
      blocks: [
        { title: 'spacing', type: BlockType.Number, numberValue: digit.json?.Spacing ? digit.json.Spacing : 0, onChange: onChangeSpacing },
        { title: 'alignment', type: BlockType.Select, selectedValue: digit.json?.Alignment, selectOptions: OptionsAlignmentBipS,  onChange: onChangeAlignment },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const d = {...digit};
    d.json.ImageIndex = index;
    onUpdate(d);
  }

  function onChangeX(val: number) {
    const d = {...digit};
    
    d.json.TopLeftX = val;
    d.json.BottomRightX = val + d.width
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...digit};
    d.json.TopLeftY = val;
    d.json.BottomRightY = val + d.height
    onUpdate(d);
  }

  function onChangeBottomRightX(val: number) {
    const d = {...digit};
    d.json.BottomRightX = val;
    d.width = val - d.json.TopLeftX
    onUpdate(d);
  }

  function onChangeBottomRightY(val: number) {
    const d = {...digit};
    d.json.BottomRightY = val;
    d.height = val - d.json.TopLeftY
    onUpdate(d);
  }

  function onChangeAlignment(val: string) {
    const d = {...digit};
    d.json.Alignment = val;
    onUpdate(d);
  }

  function onChangeSpacing(val: number) {
    const d = {...digit};
    d.json.Spacing = val;
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
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchNumberComponent;
