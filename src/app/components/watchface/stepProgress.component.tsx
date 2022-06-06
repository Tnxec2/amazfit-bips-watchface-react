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
    showImageProgress: boolean,
    showIconProgress: boolean,
    showPointerProgress: boolean,
    showCircleScaleProgress: boolean,
  }

const StepProgressComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
    showImageProgress,
    showIconProgress,
    showPointerProgress,
    showCircleScaleProgress,
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
          { showIconProgress ?
            <ImageComponent
              title='Goal image'
              onUpdate={updateGoalImage}
              image={progress.goalImage}
            /> : '' }
          { showImageProgress ?
            <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={progress.gauge}
            /> : '' }
          { showIconProgress ?
            <IconSetComponent
              title='Icon set progress'
              onUpdate={updateIconSet}
              iconSet={progress.linear}
            /> : '' }
          { showCircleScaleProgress ?
            <CircleProgressComponent
              title='Circle progress'
              onUpdate={updateCircle}
              scale={progress.circle}
            /> : '' }
        </div>
    );
};

export default StepProgressComponent