import React, { FC } from 'react';
import { WatchCircleScale, WatchIconSet, WatchImage, WatchLinearIconSet, WatchStepsProgress } from '../../model/watchFace.bips.model';
import CircleProgressComponent from './circleProgress.component';
import IconSetComponent from './iconSet.component';
import ImageComponent from './image.component';
import LinearIconSetComponent from './lineariconset.component';

interface IProps {
    title: string;
    progress: WatchStepsProgress;
    onUpdate(digit: WatchStepsProgress): void;
  }

const StepProgressComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {

    function updateIconSet(ip: WatchIconSet) {
      const p = {...progress};
      p.iconSet = ip;
      onUpdate(p);
    }
    function updateGauge(ip: WatchLinearIconSet) {
      const p = {...progress};
      p.gauge = ip;
      onUpdate(p);
    }
    function updateGoalImage(ip: WatchImage) {
      const p = {...progress};
      p.goalImage = ip;
      onUpdate(p);
    }
    function updateCircle(ip: WatchCircleScale ) {
      const p = {...progress};
      p.circle = ip;
      onUpdate(p);
    }

    return (
        <div>

            <ImageComponent
              title='Goal image'
              onUpdate={updateGoalImage}
              image={{...progress.goalImage}}
            />
            <IconSetComponent
              title='Image progress'
              onUpdate={updateIconSet}
              iconSet={{...progress.iconSet}}
            /> 
            <LinearIconSetComponent
              title='Icon set progress'
              onUpdate={updateGauge}
              linearIconSet={{...progress.gauge}}
            /> 
            <CircleProgressComponent
              title='Circle progress'
              onUpdate={updateCircle}
              scale={{...progress.circle}}
            /> 
        </div>
    );
};

export default StepProgressComponent