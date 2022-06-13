import React, { FC } from 'react';
import { WatchCircleScale, WatchIconSet, WatchImage, WatchImageSet, WatchStepsProgress } from '../../model/watchFace.bips.model';
import CircleProgressComponent from './circleProgress.component';
import IconSetComponent from './iconSet.component';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';

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

    function updateImageProgress(ip: WatchImageSet) {
      const p = {...progress};
      p.gauge = ip;
      onUpdate(p);
    }
    function updateIconSet(ip: WatchIconSet) {
      const p = {...progress};
      p.linear = ip;
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
            <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={{...progress.gauge}}
            /> 
            <IconSetComponent
              title='Icon set progress'
              onUpdate={updateIconSet}
              iconSet={{...progress.linear}}
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