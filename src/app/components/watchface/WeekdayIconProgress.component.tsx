import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { WatchImage,  WatchWeekdayStatus } from '../../model/watchFace.bips.model';
import ImageComponent from './image.component';

interface IProps {
    progress: WatchWeekdayStatus;
    onUpdate(digit: WatchWeekdayStatus): void;
  }

const WeekdayIconProgressComponent: FC<IProps> = ({
    progress,
    onUpdate,
  }) => {


    function updateImage(n: number, ip: WatchImage) {
      const p = {...progress};
      switch(n){
        case 1:
          p.Monday = ip
          break
        case 2:
          p.Tuesday = ip
          break
        case 3:
          p.Wednesday = ip
          break
        case 4:
          p.Thursday = ip
          break
        case 5:
          p.Friday = ip
          break
        case 6:
          p.Saturday = ip
          break
        case 7:
          p.Sunday = ip
          break
      }

      onUpdate(p);
    }


    return (
      <Card>
        <Card.Header
          onClick={() => {
            let w = { ...progress };
            w.collapsed = !progress.collapsed;
            onUpdate(w);
          }}
        >
          Weekday Icon Progress
        </Card.Header>
        <Card.Body className={`${progress.collapsed ? "collapse" : ""}`}>
          <ImageComponent
              title='Monday'
              onUpdate={(e) => updateImage(1, e)}
              image={{...progress.Monday}}
          /> 
          <ImageComponent
              title='Tuesday'
              onUpdate={(e) => updateImage(2, e)}
              image={{...progress.Tuesday}}
          /> 
          <ImageComponent
              title='Wednesday'
              onUpdate={(e) => updateImage(3, e)}
              image={{...progress.Wednesday}}
          /> 
          <ImageComponent
              title='Thursday'
              onUpdate={(e) => updateImage(4, e)}
              image={{...progress.Thursday}}
          /> 
          <ImageComponent
              title='Friday'
              onUpdate={(e) => updateImage(5, e)}
              image={{...progress.Friday}}
          /> 
          <ImageComponent
              title='Saturday'
              onUpdate={(e) => updateImage(6, e)}
              image={{...progress.Saturday}}
          /> 
          <ImageComponent
              title='Sunday'
              onUpdate={(e) => updateImage(7, e)}
              image={{...progress.Sunday}}
          /> 

        </Card.Body>

      </Card>
    );
};

export default WeekdayIconProgressComponent