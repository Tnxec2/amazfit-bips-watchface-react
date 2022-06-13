import React, { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImage } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import Color from "../../shared/color";

const BackgroundComponent: FC = () => {
  const { watchface, setWatchface } = useContext<IWatchContext>(WatchfaceContext)

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, svalue: watchface.background.color, onChange: onChangeBackgroundColor },
      ]
    }
  ], [watchface.background])  // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePreview(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, preview: i },
    });
  }
  function onChangeImage(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, image: i },
    });
  }
  function onChangeFrontImage(i: WatchImage) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, frontImage: i },
    });
  }

  function onChangeBackgroundColor(value: string) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, color: value },
    });
  }

  return (
    <Card>
      <Card.Header
        className="clickable"
        onClick={() => {
          let w = { ...watchface };
          w.background.collapsed = !w.background.collapsed;
          setWatchface(w);
        }}
      >
        Background
      </Card.Header>
      {!watchface.background.collapsed ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
          <ImageComponent 
            title='Preview'
            image={{...watchface.background.preview}}
            onUpdate={onChangePreview}
            />
          <ImageComponent 
            title='Background'
            image={{...watchface.background.image}}
            onUpdate={onChangeImage}
            />
          <ImageComponent 
            title='Front image'
            image={{...watchface.background.frontImage}}
            onUpdate={onChangeFrontImage}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
