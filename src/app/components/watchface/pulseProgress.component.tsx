import { FC } from 'react';
import { WatchCircleScale, WatchImage, WatchPulseProgress } from '../../model/watchFace.bips.model';
import CircleProgressComponent from './circleProgress.component';
import ImageComponent from './image.component';

interface IProps {
    title: string;
    progress: WatchPulseProgress;
    onUpdate(digit: WatchPulseProgress): void;
  }

const PulseProgressComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {

    // function updateImageProgress(ip: WatchImageSet) {
    //   const p = {...progress};
    //   p.gauge = ip;
    //   onUpdate(p);
    // }
    // function updateIconSet(ip: WatchIconSet) {
    //   const p = {...progress};
    //   p.linear = ip;
    //   onUpdate(p);
    // }
    function updateImage(n: number, ip: WatchImage) {
      const p = {...progress};
      switch(n){
        case 1:
          p.image1 = ip
          break
        case 2:
          p.image2 = ip
          break
        case 3:
          p.image3 = ip
          break
        case 4:
          p.image4 = ip
          break
        case 5:
          p.image5 = ip
          break
        case 6:
          p.image6 = ip
          break
      }

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
              title='Image 1'
              onUpdate={(e) => updateImage(1, e)}
              image={progress.image1}
          /> 
          <ImageComponent
              title='Image 2'
              onUpdate={(e) => updateImage(2, e)}
              image={progress.image2}
          /> 
          <ImageComponent
              title='Image 3'
              onUpdate={(e) => updateImage(3, e)}
              image={progress.image3}
          /> 
          <ImageComponent
              title='Image 4'
              onUpdate={(e) => updateImage(4, e)}
              image={progress.image4}
          /> 
          <ImageComponent
              title='Image 5'
              onUpdate={(e) => updateImage(5, e)}
              image={progress.image5}
          /> 
          <ImageComponent
              title='Image 6'
              onUpdate={(e) => updateImage(6, e)}
              image={progress.image6}
          /> 
          <CircleProgressComponent
            title='Circle progress'
            onUpdate={updateCircle}
            scale={progress.circle}
          /> 
        </div>
    );
};

export default PulseProgressComponent