import React, { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { IWatchContext, WatchfaceContext } from '../../context/watchface.context';
import { WatchCircleScale, WatchIconSet, WatchImage, WatchLinearIconSet } from '../../model/watchFace.bips.model';
import CircleProgressComponent from './circleProgress.component';
import IconSetComponent from './iconSet.component';
import ImageComponent from './image.component';
import LinearIconSetComponent from './lineariconset.component';

const StepProgressComponent: FC = () => {

  const { watchface, updateStepProgress, toggleStepProgress } = useContext<IWatchContext>(WatchfaceContext);

    function updateIconSet(ip: WatchIconSet) {
      const p = {...watchface.stepsProgress};
      p.iconSet = ip;
      updateStepProgress(p);
    }
    function updateGauge(ip: WatchLinearIconSet) {
      const p = {...watchface.stepsProgress};
      p.gauge = ip;
      updateStepProgress(p);
    }
    function updateGoalImage(ip: WatchImage) {
      const p = {...watchface.stepsProgress};
      p.goalImage = ip;
      updateStepProgress(p);
    }
    function updateCircle(ip: WatchCircleScale ) {
      const p = {...watchface.stepsProgress};
      p.circle = ip;
      updateStepProgress(p);
    }

    return (
        <Card>
          <Card.Header
            title='Click to open / close'
            onClick={() => toggleStepProgress()}
            >
              Step Progress
            </Card.Header>
            { !watchface.stepsProgress.collapsed  ? (
              <Card.Body>
                <ImageComponent
                  title='Goal image'
                  onUpdate={updateGoalImage}
                  image={{...watchface.stepsProgress.goalImage}}
                />
                <IconSetComponent
                  title='Image progress'
                  onUpdate={updateIconSet}
                  iconSet={{...watchface.stepsProgress.iconSet}}
                /> 
                <LinearIconSetComponent
                  title='Icon set progress'
                  onUpdate={updateGauge}
                  linearIconSet={{...watchface.stepsProgress.gauge}}
                /> 
                <CircleProgressComponent
                  title='Circle progress'
                  onUpdate={updateCircle}
                  scale={{...watchface.stepsProgress.circle}}
                /> 
              </Card.Body>
            ) : "" }
          </Card>
    );
};

export default StepProgressComponent