import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchAOD, WatchAodDate, WatchImageSet, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";


const DateAODComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateDay(d: WatchNumber) {
    const _date = { ...watchface.aod.date };
    _date.day = d;
    onUpdate(_date);
  }
  function updateMonth(d: WatchNumber) {
    const _date = { ...watchface.aod.date };
    _date.month = d;
    onUpdate(_date);
  }
  function onChangeSeparator(value: number) {
    const _date = { ...watchface.aod.date };
    _date.separator = value;
    onUpdate(_date);
  }

  function updateWeekday(d: WatchImageSet) {
    const w = { ...watchface };
    w.aod.weekday = d;
    setWatchface(w)
  }
  
  function onUpdate(d: WatchAodDate) {
    const w = {...watchface}
    w.aod.date = d;
    setWatchface(w);
  }

  return (
    <>
      <Card>
        <Card.Header
                  onClick={() => {
                    let w = {...watchface};
                    if (!w.aod) w.aod = new WatchAOD()
                    if (!w.aod.date) w.aod.date = new WatchAodDate()
                    w.aod.date.enabled = !watchface.aod.date.enabled;
                    setWatchface(w);
                  }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.aod?.date?.enabled ? "collapse" : ""}`}>

          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'Separator', type: BlockType.SelectFile, nvalue: watchface.aod?.date?.separator, onChange: onChangeSeparator },
              ]
            }
          ]} />
          <WatchNumberComponent
            title="Month"
            digit={watchface.aod?.date?.month}
            onUpdate={updateMonth}
            followDisabled={true}
            showDelimiter={true}
            showDataType={true}
          />
          <WatchNumberComponent
            title="Day Digit"
            digit={watchface.aod?.date?.day}
            onUpdate={updateDay}
            followDisabled={true}
            showDelimiter={true}
            showDataType={true}
          />          
          <ImageSetComponent
            title="Weekday"
            imageSet={watchface.aod?.weekday}
            onUpdate={updateWeekday}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateAODComponent;