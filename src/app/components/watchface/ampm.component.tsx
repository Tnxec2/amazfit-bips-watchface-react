import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchAmPmIcon } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  ampm: WatchAmPmIcon;
  onUpdate(ampm: WatchAmPmIcon): void;
}

const AmPmComponent: FC<IProps> = ({ title, ampm, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'AM', type: BlockType.SelectFile, nvalue: ampm.json.ImageIndexAMEN, onChange: onChangeAmImageIndex },
        { title: 'PM', type: BlockType.SelectFile, nvalue: ampm.json.ImageIndexPMEN, onChange: onChangePmImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Coordinates', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: ampm.json.X ? ampm.json.X : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: ampm.json.Y ? ampm.json.Y : 0, onChange: onChangeY },
      ]
    },
  ], [ampm]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeAmImageIndex(index: number) {
    const ip = { ...ampm };
    ip.json.ImageIndexAMEN = index;
    onUpdate(ip);
  }

  function onChangePmImageIndex(index: number) {
    const ip = { ...ampm };
    ip.json.ImageIndexPMEN = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...ampm };
    ip.json.X = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...ampm };
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
              checked={ampm.enabled}
              onChange={() => {
                const ic = { ...ampm };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {ampm.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default AmPmComponent;
