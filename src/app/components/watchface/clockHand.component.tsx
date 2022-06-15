import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { ClockHand, Coordinates, Image } from "../../model/json.bips.model";
import { WatchClockHand } from "../../model/watchFace.bips.model";
import Color from "../../shared/color";

interface IProps {
  title: string,
  clockHand: WatchClockHand;
  onUpdate(clockHand: WatchClockHand): void;
  showAngle: boolean;
  onCopyFromNormal?(): void
}

const ClockHandComponent: FC<IProps> = ({ title, clockHand, onUpdate, showAngle, onCopyFromNormal }) => {

  const ar = useMemo<IRow[]>(() => [
    // TODO: add shape input
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, colorString: Color.colorRead(clockHand.json?.Color), onChange: onChangeColor },
        { title: 'Only Border', type: BlockType.Checkbox, checked: clockHand.json?.OnlyBorder, onChange: onChangeOnlyBorder },
      ]
    },
    {
      blocks: [
        { title: 'Center of rotation', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, numberValue: clockHand.json?.Center?.X ? clockHand.json.Center.X : 0, onChange: onChangeCenterX },
        { title: 'Y', type: BlockType.Number, numberValue: clockHand.json?.Center?.Y ? clockHand.json.Center.Y : 0, onChange: onChangeCenterY },
      ]
    },
    {
      blocks: [
        { title: 'Center Image', type: BlockType.SelectFile, imageIndex: clockHand.json?.CenterImage?.ImageIndex, onChange: onChangeCenterImageIndex, imagesCount: 1 },
        { title: 'X', type: BlockType.Number, numberValue: clockHand.json?.Center?.X ? clockHand.json.CenterImage?.X : 0, onChange: onChangeCenterImageX },
        { title: 'Y', type: BlockType.Number, numberValue: clockHand.json?.Center?.Y ? clockHand.json.CenterImage?.Y : 0, onChange: onChangeCenterImageY },
      ]
    },
    {
      blocks: [
      { title: 'Add coordinates', type: BlockType.Button, onClick: addCoordinates, className: 'btn-outline-success' },
      ]
    }
  ], [clockHand]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeColor(value: string) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    ch.json.Color = value
    onUpdate(ch)
  }

  function onChangeOnlyBorder(value: boolean) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    ch.json.OnlyBorder = value
    onUpdate(ch)
  }

  function onChangeCenterX(value: number) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    ch.json.Center.X = value
    onUpdate(ch)
  }

  function onChangeCenterY(value: number) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    if (!ch.json.Center) ch.json.Center = new Coordinates()
    ch.json.Center.Y = value
    onUpdate(ch)
  }

  function onChangeCenterImageIndex(value: number) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    if (!ch.json.CenterImage) ch.json.CenterImage = new Image()
    ch.json.CenterImage.ImageIndex = value
    onUpdate(ch)
  }

  function onChangeCenterImageX(value: number) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    if (!ch.json.CenterImage) ch.json.CenterImage = new Image()
    ch.json.CenterImage.X = value
    onUpdate(ch)
  }

  function onChangeCenterImageY(value: number) {
    const ch = {...clockHand}
    if (ch.enabled && !ch.json) ch.json = new ClockHand()
    if (!ch.json.CenterImage) ch.json.CenterImage = new Image()
    ch.json.CenterImage.Y = value
    onUpdate(ch)
  }

  function toggleClockHand(e) {
    const ch = { ...clockHand };
    ch.enabled = !ch.enabled;
    if (ch.enabled && !ch.json) { 
      ch.json = new ClockHand(); 
    }
    onUpdate(ch);
  }

  function addCoordinates() {
    const ch = { ...clockHand };
    if (!ch.json.Shape) ch.json.Shape = []
    let lastCoords = ch.json.Shape[ch.json.Shape.length-1]
    ch.json.Shape.push( {
      X: lastCoords ? lastCoords.X : 0,
      Y: lastCoords ? lastCoords.Y : 0,
      Unknown3: lastCoords ? lastCoords.Unknown3 : 0,
      Unknown4: lastCoords ? lastCoords.Unknown4 : 0,
    })
    onUpdate(ch);
  }

  function deleteCoordinates(index: number) {
    if ( window.confirm('Are you sure to delete this?')) {
      const ch = { ...clockHand };
      ch.json.Shape.splice(index, 1);
      onUpdate(ch);
    }
  }

  function onChangeX(index: number, val: number) {
    const ch = { ...clockHand };
    if (!ch.json.Shape) ch.json.Shape = []
    ch.json.Shape[index].X = val
    onUpdate(ch);
  }

  function onChangeY(index: number, val: number) {
    const ch = { ...clockHand };
    if (!ch.json.Shape) ch.json.Shape = []
    ch.json.Shape[index].Y = val
    onUpdate(ch);
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
              checked={clockHand.enabled}
              onChange={toggleClockHand}
            />
          </div>
        </div>
      </Card.Header>
      {clockHand.enabled ? (
        <Card.Body>
          {!onCopyFromNormal ? '' : <div style={{ clear: 'both' }}><button className='btn btn-sm btn-secondary mb-1' style={{ float: 'right' }} onClick={onCopyFromNormal}>Copy from normal screen</button></div>}
          <BlocksArrayComponent ar={ar} />
          { clockHand.json.Shape.map((item, index) => 
            <BlocksArrayComponent key={'clockhand' + index} ar={[
              {
                blocks: [
                  { title: (index + 1).toString(), type: BlockType.Empty },
                  { title: 'X', type: BlockType.Number, numberValue: item.X, onChange: (val) => onChangeX(index, val) },
                  { title: 'Y', type: BlockType.Number, numberValue: item.Y, onChange: (val) => onChangeY(index, val) },
                  { title: 'Del', type: BlockType.Button, disabled: clockHand.json.Shape.length <= 1, className: 'btn-outline-danger', onClick: (e) => deleteCoordinates(index) },
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

export default ClockHandComponent;
