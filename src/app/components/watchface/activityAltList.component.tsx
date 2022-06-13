import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { BlockType } from "../../model/blocks.model";
import { WatchImage, WatchNumberExt } from "../../model/watchFace.bips.model";
import ImageComponent from "./image.component";
import WatchNumberExtendedComponent from "./numberExt.component";


const ActivityAltListComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateSteps(a: WatchNumberExt) {
    const w = {...watchface};
    w.activityAlt.steps = a;
    setWatchface(w);
  }
  function updateCaloris(a: WatchNumberExt) {
    const w = {...watchface};
    w.activityAlt.calories = a;
    setWatchface(w);
  }
  function updateHearthrate(a: WatchNumberExt) {
    const w = {...watchface};
    w.activityAlt.pulse = a;
    setWatchface(w);
  }
  function updateDistance(a: WatchNumberExt) {
    const w = {...watchface};
    w.activityAlt.distance = a;
    setWatchface(w);
  }

  function updateBattery(a: WatchNumberExt) {
    const w = {...watchface};
    w.activityAlt.battery = a;
    setWatchface(w);
  }
  function onChangeBatterySuffix(a: number) {
    const w = {...watchface};
    w.activityAlt.batterySuffix = a;
    setWatchface(w);
  }
  function onChangePulseNoData(a: number) {
    const w = {...watchface};
    w.activityAlt.pulseNoData = a;
    setWatchface(w);
  }
  function onChangeDistanceDecimalPointer(a: number) {
    const w = {...watchface};
    w.activityAlt.distanceDecimalPointer = a;
    setWatchface(w);
  }
  function onChangeDistanceSuffix(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.distanceSuffixKM = a;
    setWatchface(w);
  }
  function onChangeIcon1(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.icon1 = a;
    setWatchface(w);
  }
  function onChangeIcon2(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.icon2 = a;
    setWatchface(w);
  }
  function onChangeIcon3(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.icon3 = a;
    setWatchface(w);
  }
  function onChangeIcon4(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.icon4 = a;
    setWatchface(w);
  }
  function onChangeIcon5(a: WatchImage) {
    const w = {...watchface};
    w.activityAlt.icon5 = a;
    setWatchface(w);
  }
  return (
    <>
    <Card>
      <Card.Header 
        title='Click to open / close'
        onClick={() => {
          const w = {...watchface};
          w.activityAlt.collapsed = !w.activityAlt.collapsed
          setWatchface(w)
        }}
      >
        Activity Alt (with vertical offset)
      </Card.Header>
      { !watchface.activityAlt.collapsed  ? (
          <Card.Body>
            <WatchNumberExtendedComponent
              title='Battery'
              digit={watchface.activityAlt.battery}
              onUpdate={updateBattery}
            />
            { watchface.activityAlt.battery.enabled ?
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Battery suffix', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.batterySuffix, onChange: onChangeBatterySuffix },
                  ]
                },
              ]}
            /> : '' }
            <WatchNumberExtendedComponent
              title='Steps'
              digit={watchface.activityAlt.steps}
              onUpdate={updateSteps}
            />
            <WatchNumberExtendedComponent
              title='Calories'
              digit={watchface.activityAlt.calories}
              onUpdate={updateCaloris}
            />
            <WatchNumberExtendedComponent
              title='Heartrate'
              digit={watchface.activityAlt.pulse}
              onUpdate={updateHearthrate}
            />
            { watchface.activityAlt.pulse.enabled ?
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Pulse no data', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.pulseNoData, onChange: onChangePulseNoData },
                  ]
                },
              ]}
            /> :''}
            <WatchNumberExtendedComponent
              title='Distance'
              digit={watchface.activityAlt.distance}
              onUpdate={updateDistance}
            />
            { watchface.activityAlt.distance.enabled ?
            <>
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Distance decimal pointer', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.distanceDecimalPointer, onChange: onChangeDistanceDecimalPointer, error: watchface.activityAlt?.distance.enabled && !watchface.activityAlt?.distanceDecimalPointer ? 'Decimal pointer is not set' : null },
                  ]
                },
              ]}
            />
            <ImageComponent
              title="Distance Suffix KM"
              image={{...watchface.activityAlt.distanceSuffixKM}}
              onUpdate={onChangeDistanceSuffix}
            />
            </> : '' }
            <ImageComponent
              title="Icon 1"
              image={{...watchface.activityAlt.icon1}}
              onUpdate={onChangeIcon1}
            />
            <ImageComponent
              title="Icon 2"
              image={{...watchface.activityAlt.icon2}}
              onUpdate={onChangeIcon2}
            />
            <ImageComponent
              title="Icon 3"
              image={{...watchface.activityAlt.icon3}}
              onUpdate={onChangeIcon3}
            />
            <ImageComponent
              title="Icon 4"
              image={{...watchface.activityAlt.icon4}}
              onUpdate={onChangeIcon4}
            />
            <ImageComponent
              title="Icon 5"
              image={{...watchface.activityAlt.icon5}}
              onUpdate={onChangeIcon5}
            />
          </Card.Body>
        ) : ""
      }
    </Card>

  </>
  );
};

export default ActivityAltListComponent;
