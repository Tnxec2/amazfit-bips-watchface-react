import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchFormatedNumber, WatchPulseProgress, WatchStepsProgress } from "../../model/watchFace.bips.model";
import WatchFormatedNumberComponent from "./formatedNumber.component";
import PulseProgressComponent from "./pulseProgress.component";
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
  function updatePulseProgress(a: WatchPulseProgress) {
    const w = {...watchface};
    w.pulseProgress = a;
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
  // function updatePai(a: WatchFormatedNumber) {
  //   const w = {...watchface};
  //   w.activity.pai = a;
  //   setWatchface(w);
  // }
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
          w.collapsedActivityBlock = !w.collapsedActivityBlock
          setWatchface(w)
        }}
      >
        Activity
      </Card.Header>
      { !watchface.collapsedActivityBlock  ? (
        <Card.Body>
        <Card>
          <Card.Header 
              title='Click to open / close'
              onClick={() => {
                const w = {...watchface};
                w.activity.collapsed = !w.activity.collapsed
                setWatchface(w)
              }}
            >
            Activity Numbers
          </Card.Header>
            { !watchface.activity.collapsed  ? (
          <Card.Body>
            <WatchFormatedNumberComponent
              title='Steps'
              digit={watchface.activity.steps}
              onUpdate={updateSteps}
              showSuffix={true}
            />
            <WatchFormatedNumberComponent
              title='Steps goal'
              digit={watchface.activity.stepsGoals}
              onUpdate={updateStepsGoal}
              showSuffix={true}
            />
            <WatchFormatedNumberComponent
              title='Calories'
              digit={watchface.activity.calories}
              onUpdate={updateCaloris}
              showSuffix={true}
            />
            <WatchFormatedNumberComponent
              title='Hearthrate'
              digit={watchface.activity.pulse}
              onUpdate={updateHearthrate}
              showSuffix={true}
            />
            <WatchFormatedNumberComponent
              title='Distance'
              digit={watchface.activity.distance}
              onUpdate={updateDistance}
              showSuffix={true}
              showDecimal={true}
            />
          </Card.Body>
            ) : '' }
        </Card>
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
                />
            </Card.Body>
            ) : "" }
          </Card>
            <Card>
              <Card.Header
              title='Click to open / close'
              onClick={() => {
                const w = {...watchface};
                w.pulseProgress.collapsed = !w.pulseProgress.collapsed
                setWatchface(w)
              }}
              >
                Pulse Progress
              </Card.Header>
              { !watchface.pulseProgress.collapsed  ? (
                <Card.Body>
                  <PulseProgressComponent
                    progress={watchface.pulseProgress}
                    title='Pulse Progress'
                    onUpdate={updatePulseProgress}
                    
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
