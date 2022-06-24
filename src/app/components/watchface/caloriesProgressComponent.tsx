import { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { IWatchContext, WatchfaceContext } from '../../context/watchface.context';
import CircleProgressComponent from './circleProgress.component';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';


const CaloriesProgressComponent: FC = () => {

    const { watchface, toggleCaloriesProgress, updateCaloriesCircle, updateCaloriesIcon, updateCaloriesGoalImage
    } = useContext<IWatchContext>(WatchfaceContext);

    return (
        <Card>
            <Card.Header
            title='Click to open / close'
            onClick={() => toggleCaloriesProgress()}
            >
              Calories Progress
            </Card.Header>
            { !watchface.caloriesProgress.collapsed  ? (
              <Card.Body>
                <ImageComponent
                  title="Goal Image"
                  image={{...watchface.caloriesProgress.goalImage}}
                  onUpdate={updateCaloriesGoalImage}
                />
                <ImageSetComponent
                  title='Image progress'
                  onUpdate={updateCaloriesIcon}
                  imageSet={{...watchface.caloriesProgress.icon}}
                /> 
                <CircleProgressComponent
                  title='Circle progress'
                  onUpdate={updateCaloriesCircle}
                  scale={{...watchface.caloriesProgress.circle}}
                /> 
            </Card.Body>
            ) : "" }
          </Card>
    )
}

export default CaloriesProgressComponent;