import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { BlockType } from "../../model/blocks.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";
import SeparatedDigitsComponent from "./separatedDigits.component";
import WeekdayIconProgressComponent from "./WeekdayIconProgress.component";
import WatchNumberExtendedComponent from "./numberExt.component";


const DateComponent: FC = () => {
  const { watchface, toggleDate, toggleDateAlt, toggleDateExt,
  updateDay, updateMonth, updateMonthAsWord, updateWeekday,
  updateDayAlt, updateMonthAlt, updateOneLineDateMonth, updateOneLineDateDelimiter,
  updateTwoDigitsDay, updateTwoDigitsMonth, 
  updateDaySeparated, updateMonthSeparated, updateYearSeparated,
  updateWeekdayProgress } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <>
      <Card>
        <Card.Header
          onClick={() => toggleDate()}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.date.collapsed ? "collapse" : ""}`}>

          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'One Line Mont/Day', type: BlockType.Checkbox, checked: watchface.date.oneLine, onChange: updateOneLineDateMonth },
                { title: 'Delimiter', type: BlockType.SelectFile, imageIndex: watchface.date.oneLineDelimiter, onChange: updateOneLineDateDelimiter, imagesCount: 1 },
              ]
            },
            {
              blocks: [
                { title: 'Two Digits for Month', type: BlockType.Checkbox, checked: watchface.date.twoDigitsMonth, onChange: updateTwoDigitsMonth },
                { title: 'Two Digits for Day', type: BlockType.Checkbox, checked: watchface.date.twoDigitsDay, onChange: updateTwoDigitsDay },
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
            disableCount={true}
          />

          <ImageSetComponent
            title="Weekday"
            imageSet={{ ...watchface.date.weekday }}
            onUpdate={updateWeekday}
            disableCount={true}
          />
          <WeekdayIconProgressComponent
            progress={{...watchface.weekdayicon}}
            onUpdate={updateWeekdayProgress}
            />
            <Card>
              <Card.Header
                onClick={toggleDateExt}
              >
                Separate Digits
              </Card.Header>
              <Card.Body className={`${watchface.dateExtended.collapsed ? "collapse" : ""}`}>
                <SeparatedDigitsComponent
                  title="Year Separate Digits"
                  digit={{...watchface.dateExtended.years}}
                  amountOfDigits={4}
                  onUpdate={updateYearSeparated}
                  />
                <SeparatedDigitsComponent
                  title="Month Separate Digits"
                  digit={{...watchface.dateExtended.month}}
                  amountOfDigits={2}
                  onUpdate={updateMonthSeparated}
                  />
                <SeparatedDigitsComponent
                  title="Day Separate Digits"
                  digit={{...watchface.dateExtended.day}}
                  amountOfDigits={2}
                  onUpdate={updateDaySeparated}
                  />
                  </Card.Body>
            </Card>
            <Card>
              <Card.Header
                onClick={toggleDateAlt}
              >
                Date Alt (with vertical offset)
              </Card.Header>
              <Card.Body className={`${watchface.date.collapsedAlt ? "collapse" : ""}`}>
                <WatchNumberExtendedComponent
                  title="Month Alt"
                  digit={{...watchface.date.monthAlt}}
                  onUpdate={updateMonthAlt}
                />
                <WatchNumberExtendedComponent
                  title="Day Alt"
                  digit={{...watchface.date.dayAlt}}
                  onUpdate={updateDayAlt}
                />
              </Card.Body>
            </Card>
        </Card.Body>
      </Card>
    </>
  );
};

export default DateComponent;
