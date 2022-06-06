import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchFormatedNumber, WatchStepsProgress } from "../../model/watchFace.bips.model";
import WatchFormatedNumberComponent from "./formatedNumber.component";
import StepProgressComponent from "./stepProgress.component";

const ActivityListComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateSteps(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.steps = a;
    setWatchface(w);
  }
  function updateStepProgress(a: WatchStepsProgress) {
    const w = {...watchface};
    w.stepsProgress = a;
    setWatchface(w);
  }
  function updateCaloris(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.calories = a;
    setWatchface(w);
  }
  function updateHearthrate(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.pulse = a;
    setWatchface(w);
  }
  function updateDistance(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.distance = a;
    setWatchface(w);
  }
  function updatePai(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.pai = a;
    setWatchface(w);
  }
  function updateStepsGoal(a: WatchFormatedNumber) {
    const w = {...watchface};
    w.activity.stepsGoals = a;
    setWatchface(w);
  }
  return (
    <>
    <Card>
      <Card.Header 
        title='Click to open / close'
        onClick={() => {
          const w = {...watchface};
          w.activity.collapsed = !w.activity.collapsed
          setWatchface(w)
        }}
      >
        Activity
    
      </Card.Header>
      { !watchface.activity.collapsed  ? (
      <Card.Body>
            <WatchFormatedNumberComponent
              title='Steps'
              digit={watchface.activity.steps}
              onUpdate={updateSteps}
            />
            <WatchFormatedNumberComponent
              title='Steps goal'
              digit={watchface.activity.stepsGoals}
              onUpdate={updateStepsGoal}
            />
            <WatchFormatedNumberComponent
              title='Calories'
              digit={watchface.activity.calories}
              onUpdate={updateCaloris}
            />
            <WatchFormatedNumberComponent
              title='Hearthrate'
              digit={watchface.activity.pulse}
              onUpdate={updateHearthrate}
            />
            <WatchFormatedNumberComponent
              title='Distance'
              digit={watchface.activity.distance}
              onUpdate={updateDistance}
              showSuffix={true}
              showDecimal={true}
            />
            <WatchFormatedNumberComponent
              title='PAI'
              digit={watchface.activity.pai}
              onUpdate={updatePai}
            />
            <Card>
              <Card.Header
              title='Click to open / close'
              onClick={() => {
                const w = {...watchface};
                w.stepsProgress.collapsed = !w.stepsProgress.collapsed
                setWatchface(w)
              }}
              >
                Step Progress
              </Card.Header>
              { !watchface.stepsProgress.collapsed  ? (
                <Card.Body>
                  <StepProgressComponent
                    progress={watchface.stepsProgress}
                    title='Step progress'
                    onUpdate={updateStepProgress}
                    showImageProgress={true}
                    showIconProgress={true}
                    showPointerProgress={true}
                    showCircleScaleProgress={true}
                  />
              </Card.Body>
              ) : "" }
            </Card>
      </Card.Body>
      ) : ""
      }
    </Card>

  </>
  );
};

export default ActivityListComponent;
