import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchHumidity, WatchImage, WatchNumber } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";

interface IProps {
  humidity: WatchHumidity;
  onUpdate(aqi: WatchHumidity): void;
  onCopyFromNormal?(): void,

}

const WatchWeatherHumidityComponent: FC<IProps> = ({
  humidity,
  onUpdate,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Suffix', type: BlockType.SelectFile, imageIndex: humidity.suffix, onChange: onChangeSuffix, imagesCount: 1 },
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
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...humidity };
          w.collapsed = !w.collapsed;
          onUpdate(w);
        }}>
          Humidity
      </Card.Header>
      {humidity.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={{...humidity.number}}
            onUpdate={onUpdateNumber} 
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
