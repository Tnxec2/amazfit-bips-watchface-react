import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchHumidity, WatchImage, WatchNumber } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  humidity: WatchHumidity;
  onUpdate(aqi: WatchHumidity): void;
  onCopyFromNormal?(): void,

}

const WatchWeatherHumidityComponent: FC<IProps> = ({
  title,
  humidity,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: humidity.suffix, onChange: onChangeSuffix },
      ]
    },
  ], [humidity]) // eslint-disable-line react-hooks/exhaustive-deps


  function onUpdateNumber(number: WatchNumber) {
    const d = {...humidity};
    d.number = number;
    onUpdate(d);
  }

  function onUpdateIcon(icon: WatchImage) {
    const d = {...humidity};
    d.icon = icon;
    onUpdate(d);
  }
  function onChangeSuffix(n: number) {
    const d = {...humidity};
    d.suffix = n;
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
              checked={humidity.collapsed}
              onChange={() => {
                const d = { ...humidity };
                d.collapsed = !d.collapsed;
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {humidity.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={humidity.number}
            onUpdate={onUpdateNumber} 
            showDelimiter={false}
            paddingDisabled={true}
          />
          <ImageComponent
            title="Icon"
            image={{...humidity.icon}}
            onUpdate={onUpdateIcon}
          />
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchWeatherHumidityComponent;
