import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchIconSet } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  iconSet: WatchIconSet;
  onUpdate(iconSet: WatchIconSet): void;
  disableCount?: boolean;
}

const IconSetComponent: FC<IProps> = ({ title, iconSet, onUpdate, disableCount }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, imageIndex: iconSet.json?.ImageIndex, onChange: onChangeImageIndex, imagesCount: iconSet.json?.ImagesCount },
        { title: 'Count', type: BlockType.Number, numberValue: iconSet.json?.ImagesCount, min: 0, onChange: onChangeCount, disabled: disableCount },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, numberValue: iconSet.json?.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, numberValue: iconSet.json?.Y, onChange: onChangeY },
      ]
    }
  ], [iconSet]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...iconSet };
    ip.json.ImageIndex = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...iconSet };
    ip.json.X = val;
    onUpdate(ip);
  }
  function onChangeCount(val: number) {
    const ip = { ...iconSet };
    ip.json.ImagesCount = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...iconSet };
    ip.json.Y = val;
    onUpdate(ip);
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
              checked={iconSet.enabled}
              onChange={() => {
                const ic = { ...iconSet };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {iconSet.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default IconSetComponent;
