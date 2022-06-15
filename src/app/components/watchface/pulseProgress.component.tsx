import { FC } from 'react';
import { WatchImage, WatchPulseProgress } from '../../model/watchFace.bips.model';
import ImageComponent from './image.component';

interface IProps {
    title: string;
    progress: WatchPulseProgress;
    onUpdate(digit: WatchPulseProgress): void;
  }

const PulseProgressComponent: FC<IProps> = ({
    progress,
    onUpdate,
  }) => {


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


    return (
        <div>

          <ImageComponent
              title='Image 1 (Relaxed)'
              onUpdate={(e) => updateImage(1, e)}
              image={{...progress.image1}}
          /> 
          <ImageComponent
              title='Image 2 (Warm Up)'
              onUpdate={(e) => updateImage(2, e)}
              image={{...progress.image2}}
          /> 
          <ImageComponent
              title='Image 3 (Fat Burning)'
              onUpdate={(e) => updateImage(3, e)}
              image={{...progress.image3}}
          /> 
          <ImageComponent
              title='Image 4 (Aerobic)'
              onUpdate={(e) => updateImage(4, e)}
              image={{...progress.image4}}
          /> 
          <ImageComponent
              title='Image 5 (Anaerobic)'
              onUpdate={(e) => updateImage(5, e)}
              image={{...progress.image5}}
          /> 
          <ImageComponent
              title='Image 6 (Maximum)'
              onUpdate={(e) => updateImage(6, e)}
              image={{...progress.image6}}
          /> 

        </div>
    );
};

export default PulseProgressComponent