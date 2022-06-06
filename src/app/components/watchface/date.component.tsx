import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchImageSet, WatchNumber } from "../../model/watchFace.bips.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";


const DateComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);



  function updateDay(d: WatchNumber) {
    const w = { ...watchface }
    w.date.day = d;
    setWatchface(w);
  }

  function updateMonth(d: WatchNumber) {
    const w = { ...watchface }
    w.date.month = d;
    setWatchface(w);
  }
  function updateMonthAsWord(d: WatchImageSet) {
    const w = { ...watchface }
    w.date.montName = d;
    setWatchface(w);
  }

  function updateWeekday(d: WatchImageSet) {
    const w = { ...watchface }
    w.date.weekday = d;
    setWatchface(w);
  }

  function onChangeOneLineMonth(val: boolean) {
    const w = { ...watchface }
    w.date.oneLine = val;
    setWatchface(w);
  }

  function onChangeDelimiter(val: number) {
    const w = { ...watchface }
    w.date.oneLineDelimiter = val;
    setWatchface(w);
  }
  function onChangeTwoDigitsMonth(val: boolean) {
    const w = { ...watchface }
    w.date.twoDigitsMonth = val;
    setWatchface(w);
  }
  function onChangeTwoDigitsDay(val: boolean) {
    const w = { ...watchface }
    w.date.twoDigitsDay = val;
    setWatchface(w);
  }

  return (
    <>
      <Card>
        <Card.Header
          onClick={() => {
            let w = { ...watchface };
            w.date.collapsed = !watchface.date.collapsed;
            setWatchface(w);
          }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.date.collapsed ? "collapse" : ""}`}>

          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'One Line Mont/Day', type: BlockType.Checkbox, checked: watchface.date.oneLine, onChange: onChangeOneLineMonth },
                { title: 'Delimiter', type: BlockType.SelectFile, nvalue: watchface.date.oneLineDelimiter, onChange: onChangeDelimiter },
              ]
            },
            {
              blocks: [
                { title: 'Two Digits for Month', type: BlockType.Checkbox, checked: watchface.date.twoDigitsMonth, onChange: onChangeTwoDigitsMonth },
                { title: 'Two Digits for Day', type: BlockType.Checkbox, checked: watchface.date.twoDigitsDay, onChange: onChangeTwoDigitsDay },
              ]
            }
          ]} />


          <WatchNumberComponent
            title="Month"
            digit={{ ...watchface.date.month }}
            onUpdate={updateMonth}
            showDelimiter={!watchface.date.oneLine}
          />
          {!watchface.date.oneLine ?
            <WatchNumberComponent
              title="Day"
              digit={{ ...watchface.date.day }}
              onUpdate={updateDay}
              showDelimiter={true}
              showDataType={true}
            /> : ''}

          <ImageSetComponent
            title="Month as word"
            imageSet={{ ...watchface.date.montName }}
            onUpdate={updateMonthAsWord}
          />

          <ImageSetComponent
            title="Weekday"
            imageSet={{ ...watchface.date.weekday }}
            onUpdate={updateWeekday}
          />


        </Card.Body>
      </Card>
    </>
  );
};

export default DateComponent;
