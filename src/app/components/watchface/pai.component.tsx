import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";


const PaiComponent: FC = () => {
  const { watchface, togglePai, updatePaiImageLow, updatePaiImageNormal, updatePaiImageHigh, updatePaiImageNoData,
  updatePaiNumberLow, updatePaiNumberNormal, updatePaiNumberHigh, updatePaiNumberGeneral } =
  useContext<IWatchContext>(WatchfaceContext);



  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => togglePai()}>
        PAI
      </Card.Header>
      {!watchface.pai.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number General (only one number needed)'
            digit={{...watchface.pai.numberGeneral}}
            onUpdate={updatePaiNumberGeneral}
          />
          <div>
            &nbsp;
          </div>
          <WatchNumberComponent
            title='Number Low (should all 3 Number declared: Low, Normal and High)'
            digit={{...watchface.pai.numberLow}}
            onUpdate={updatePaiNumberLow}
          />
          <WatchNumberComponent
            title='Number Normal (should all 3 Number declared: Low, Normal and High)'
            digit={{...watchface.pai.numberNormal}}
            onUpdate={updatePaiNumberNormal}
          />
          <WatchNumberComponent
            title='Number High (should all 3 Number declared: Low, Normal and High)'
            digit={{...watchface.pai.numberHigh}}
            onUpdate={updatePaiNumberHigh}
          />
          
          <ImageComponent
            title='Icon Low'
            image={{...watchface.pai.imageLow}}
            onUpdate={updatePaiImageLow}
          />
          <ImageComponent
            title='Icon Normal'
            image={{...watchface.pai.imageNormal}}
            onUpdate={updatePaiImageNormal}
          />
          <ImageComponent
            title='Icon High'
            image={{...watchface.pai.imageHigh}}
            onUpdate={updatePaiImageHigh}
          />
          <ImageComponent
            title='Icon NoData'
            image={{...watchface.pai.imageNoData}}
            onUpdate={updatePaiImageNoData}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default PaiComponent;
