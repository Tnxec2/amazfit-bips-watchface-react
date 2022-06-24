import { FC, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { IWatchContext, WatchfaceContext } from '../../context/watchface.context';
import { WatchImage } from '../../model/watchFace.bips.model';
import ImageComponent from './image.component';

const PulseProgressComponent: FC = () => {

    const { watchface, togglePulseProgress, updatePulseProgress} =useContext<IWatchContext>(WatchfaceContext);

    function updateImage(n: number, ip: WatchImage) {
      const p = {...watchface.pulseProgress};
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

      updatePulseProgress(p);
    }


    return (
          <Card>
            <Card.Header
            title='Click to open / close'
            onClick={() => togglePulseProgress()}
            >
              Pulse Progress
            </Card.Header>
            { !watchface.pulseProgress.collapsed  ? (
              <Card.Body>
          

            <ImageComponent
                title='Image 1 (Relaxed)'
                onUpdate={(e) => updateImage(1, e)}
                image={{...watchface.pulseProgress.image1}}
            /> 
            <ImageComponent
                title='Image 2 (Warm Up)'
                onUpdate={(e) => updateImage(2, e)}
                image={{...watchface.pulseProgress.image2}}
            /> 
            <ImageComponent
                title='Image 3 (Fat Burning)'
                onUpdate={(e) => updateImage(3, e)}
                image={{...watchface.pulseProgress.image3}}
            /> 
            <ImageComponent
                title='Image 4 (Aerobic)'
                onUpdate={(e) => updateImage(4, e)}
                image={{...watchface.pulseProgress.image4}}
            /> 
            <ImageComponent
                title='Image 5 (Anaerobic)'
                onUpdate={(e) => updateImage(5, e)}
                image={{...watchface.pulseProgress.image5}}
            /> 
            <ImageComponent
                title='Image 6 (Maximum)'
                onUpdate={(e) => updateImage(6, e)}
                image={{...watchface.pulseProgress.image6}}
            /> 
          </Card.Body>
          ) : "" }
        </Card>
    );
};

export default PulseProgressComponent