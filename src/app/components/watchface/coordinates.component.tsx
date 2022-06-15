import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchCoordinates } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  coords: WatchCoordinates;
  onUpdate(coords: WatchCoordinates): void;
}

const CoordinatesComponent: FC<IProps> = ({ title, coords, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, numberValue: coords.json?.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, numberValue: coords.json?.Y, onChange: onChangeY },
      ]
    }
  ], [coords]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeX(val: number) {
    const ip = { ...coords };
    ip.json.X = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...coords };
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
              checked={coords.enabled}
              onChange={() => {
                const ic = { ...coords };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {coords.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default CoordinatesComponent;
