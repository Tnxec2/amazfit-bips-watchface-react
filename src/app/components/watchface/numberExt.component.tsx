import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsAlignmentBipS } from "../../model/blocks.model";
import { AlignmentType } from "../../model/types.bips.model";
import { WatchNumberExt } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  digit: WatchNumberExt;
  onUpdate(digit: WatchNumberExt): void;
}

const WatchNumberExtendedComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: digit.json?.ImageIndex, onChange: onChangeImageIndex },
        { title: `Count: ${digit.json?.ImagesCount}`, type: BlockType.Empty },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: digit.json?.TopLeftX ? digit.json.TopLeftX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.json?.TopLeftY ? digit.json.TopLeftY : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'Bottom Right X', type: BlockType.Number, nvalue: digit.json?.BottomRightX ? digit.json.BottomRightX : 0, onChange: onChangeBottomRightX },
        { title: 'Bottom Right Y', type: BlockType.Number, nvalue: digit.json?.BottomRightX ? digit.json.BottomRightY : 0, onChange: onChangeBottomRightY },
      ]
    },
    {
      blocks: [
        { title: 'spacing', type: BlockType.Number, nvalue: digit.json?.Spacing ? digit.json.Spacing : 0, onChange: onChangeSpacing },
        { title: 'vertical offset', type: BlockType.Number, nvalue: digit.json?.VerticalOffset ? digit.json.VerticalOffset : 0, onChange: onChangeVerticalOffset },
        { title: 'alignment', type: BlockType.Select, svalue: digit.json?.Alignment, selectOptions: OptionsAlignmentBipS,  onChange: onChangeAlignment, error: digit.json?.VerticalOffset && AlignmentType.fromJson(digit.json?.Alignment) === AlignmentType.BottomRight.index ? 'BottomRight don\'t works properly with vertical offset on watch':'' },
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
  function onChangeVerticalOffset(val: number) {
    const d = {...digit};
    d.json.VerticalOffset = val;
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

export default WatchNumberExtendedComponent;
