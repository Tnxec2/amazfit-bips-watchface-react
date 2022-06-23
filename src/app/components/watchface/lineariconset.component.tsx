import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchLinearIconSet } from "../../model/watchFace.bips.model";

interface IProps {
  title: string;
  linearIconSet: WatchLinearIconSet;
  onUpdate(iconSet: WatchLinearIconSet): void;
  disableCount?: boolean;
}

const LinearIconSetComponent: FC<IProps> = ({ title, linearIconSet, onUpdate, disableCount }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, imageIndex: linearIconSet.json?.StartImageIndex, 
        onChange: onChangeImageIndex, imagesCount: linearIconSet.json?.Segments ? linearIconSet.json.Segments.length : 0 },
      { title: 'Add coordinates', type: BlockType.Button, onClick: addCoordinates, className: 'btn-outline-success' },
      ]
    },
  ], [linearIconSet]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...linearIconSet };
    ip.json.StartImageIndex = index;
    onUpdate(ip);
  }
  function addCoordinates() {
    const ip = { ...linearIconSet };
    if (!ip.json.Segments) ip.json.Segments = []
    let lastCoords = ip.json.Segments[ip.json.Segments.length-1]
    ip.json.Segments.push( {
      X: lastCoords ? lastCoords.X : 0,
      Y: lastCoords ? lastCoords.Y : 0,
      Unknown3: lastCoords ? lastCoords.Unknown3 : 0,
      Unknown4: lastCoords ? lastCoords.Unknown4 : 0,
    })
    onUpdate(ip);
  }

  function deleteCoordinates(index: number) {
    if ( window.confirm('Are you sure to delete this?')) {
      const ip = { ...linearIconSet };
      ip.json.Segments.splice(index, 1);
      onUpdate(ip);
    }
  }

  function onChangeX(index: number, val: number) {
    const ip = { ...linearIconSet };
    if (!ip.json.Segments) ip.json.Segments = []
    ip.json.Segments[index].X = val
    onUpdate(ip);
  }

  function onChangeY(index: number, val: number) {
    const ip = { ...linearIconSet };
    if (!ip.json.Segments) ip.json.Segments = []
    ip.json.Segments[index].Y = val
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
              checked={linearIconSet.enabled}
              onChange={() => {
                const ic = { ...linearIconSet };
                if (!ic.json.Segments) ic.json.Segments = [ { X: 0, Y: 0, Unknown3: 0, Unknown4: 0}]
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {linearIconSet.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
          { linearIconSet.json.Segments.map((item, index) => 
            <BlocksArrayComponent ar={[
              {
                blocks: [
                  { title: (index + 1).toString(), type: BlockType.Empty },
                  { title: 'X', type: BlockType.Number, numberValue: item.X, onChange: (val) => onChangeX(index, val) },
                  { title: 'Y', type: BlockType.Number, numberValue: item.Y, onChange: (val) => onChangeY(index, val) },
                  { title: 'Del', type: BlockType.Button, disabled: linearIconSet.json.Segments.length <= 1, className: 'btn-outline-danger', onClick: (e) => deleteCoordinates(index) },
                ]
              }
            ]} />
          ) }
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default LinearIconSetComponent;
