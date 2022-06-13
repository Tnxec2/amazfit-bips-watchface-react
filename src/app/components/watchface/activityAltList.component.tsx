import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { BlockType } from "../../model/blocks.model";
import ImageComponent from "./image.component";
import WatchNumberExtendedComponent from "./numberExt.component";


const ActivityAltListComponent: FC = () => {
  const { watchface, toggleActivityAlt,
  updateActivityAltSteps, updateActivityAltBattery,
  updateActivityAltHearthrate, updateActivityAltCalories,
  updateActivityAltDistance, onChangeActivityAltBatterySuffix,
  onChangeActivityAltDistanceDecimalPointer,
  onChangeActivityAltDistanceSuffix,
  onChangeActivityAltIcon1,
  onChangeActivityAltIcon2,
  onChangeActivityAltIcon3,
  onChangeActivityAltIcon4,
  onChangeActivityAltIcon5,
  onChangeActivityAltPulseNoData } =
    useContext<IWatchContext>(WatchfaceContext);


  return (
    <>
    <Card>
      <Card.Header 
        title='Click to open / close'
        onClick={() => toggleActivityAlt()}
      >
        Activity Alt (with vertical offset)
      </Card.Header>
      { !watchface.activityAlt.collapsed  ? (
          <Card.Body>
            <WatchNumberExtendedComponent
              title='Battery'
              digit={watchface.activityAlt.battery}
              onUpdate={updateActivityAltBattery}
            />
            { watchface.activityAlt.battery.enabled ?
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Battery suffix', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.batterySuffix, onChange: onChangeActivityAltBatterySuffix },
                  ]
                },
              ]}
            /> : '' }
            <WatchNumberExtendedComponent
              title='Steps'
              digit={watchface.activityAlt.steps}
              onUpdate={updateActivityAltSteps}
            />
            <WatchNumberExtendedComponent
              title='Calories'
              digit={watchface.activityAlt.calories}
              onUpdate={updateActivityAltCalories}
            />
            <WatchNumberExtendedComponent
              title='Heartrate'
              digit={watchface.activityAlt.pulse}
              onUpdate={updateActivityAltHearthrate}
            />
            { watchface.activityAlt.pulse.enabled ?
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Pulse no data', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.pulseNoData, onChange: onChangeActivityAltPulseNoData },
                  ]
                },
              ]}
            /> :''}
            <WatchNumberExtendedComponent
              title='Distance'
              digit={watchface.activityAlt.distance}
              onUpdate={updateActivityAltDistance}
            />
            { watchface.activityAlt.distance.enabled ?
            <>
            <BlocksArrayComponent
              ar={[
                {
                  blocks: [
                    { title: 'Distance decimal pointer', type: BlockType.SelectFile, nvalue: watchface.activityAlt?.distanceDecimalPointer, onChange: onChangeActivityAltDistanceDecimalPointer, error: watchface.activityAlt?.distance.enabled && !watchface.activityAlt?.distanceDecimalPointer ? 'Decimal pointer is not set' : null },
                  ]
                },
              ]}
            />
            <ImageComponent
              title="Distance Suffix KM"
              image={{...watchface.activityAlt.distanceSuffixKM}}
              onUpdate={onChangeActivityAltDistanceSuffix}
            />
            </> : '' }
            <ImageComponent
              title="Icon 1"
              image={{...watchface.activityAlt.icon1}}
              onUpdate={onChangeActivityAltIcon1}
            />
            <ImageComponent
              title="Icon 2"
              image={{...watchface.activityAlt.icon2}}
              onUpdate={onChangeActivityAltIcon2}
            />
            <ImageComponent
              title="Icon 3"
              image={{...watchface.activityAlt.icon3}}
              onUpdate={onChangeActivityAltIcon3}
            />
            <ImageComponent
              title="Icon 4"
              image={{...watchface.activityAlt.icon4}}
              onUpdate={onChangeActivityAltIcon4}
            />
            <ImageComponent
              title="Icon 5"
              image={{...watchface.activityAlt.icon5}}
              onUpdate={onChangeActivityAltIcon5}
            />
          </Card.Body>
        ) : ""
      }
    </Card>

  </>
  );
};

export default ActivityAltListComponent;
