import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import CircleProgressComponent from "./circleProgress.component";
import ImageSetComponent from "./imageSet.component";
import PulseProgressComponent from "./pulseProgress.component";
import StepProgressComponent from "./stepProgress.component";
import WatchStepsFormatedNumberComponent from "./stepsFormatedNumber.component";
import WatchCaloriesFormatedNumberComponent from "./caloriesFormatedNumber.component";
import WatchDistanceFormatedNumberComponent from "./distanceFormatedNumber.component";
import WatchPulseFormatedNumberComponent from "./pulseFormatedNumber.component";

const ActivityListComponent: FC = () => {
  const { watchface, toggleActivity, toggleActivityNumber,
    toggleStepProgress, togglePulseProgress,
    updateSteps, updateStepProgress, updateStepsGoal,
updatePulseProgress, updateHearthrate,
updateCalories,  updateDistance,
toggleCaloriesProgress, updateCaloriesCircle, updateCaloriesIcon
} =
  useContext<IWatchContext>(WatchfaceContext);


  return (
    <>
    <Card>
      <Card.Header 
        title='Click to open / close'
        onClick={() => toggleActivity()}
      >
        Activity
      </Card.Header>
      { !watchface.collapsedActivityBlock  ? (
        <Card.Body>
        <Card>
          <Card.Header 
              title='Click to open / close'
              onClick={() => toggleActivityNumber()}
            >
            Activity Numbers
          </Card.Header>
            { !watchface.activity.collapsed  ? (
          <Card.Body>
            <WatchStepsFormatedNumberComponent
              title='Steps'
              digit={{...watchface.activity.steps}}
              onUpdate={updateSteps}
            />
            <WatchStepsFormatedNumberComponent
              title='Steps goal'
              digit={{...watchface.activity.stepsGoals}}
              onUpdate={updateStepsGoal}
            />
            <WatchCaloriesFormatedNumberComponent
              title='Calories'
              digit={{...watchface.activity.calories}}
              onUpdate={updateCalories}
            />
            <WatchPulseFormatedNumberComponent
              title='Hearthrate'
              digit={{...watchface.activity.pulse}}
              onUpdate={updateHearthrate}
            />
            <WatchDistanceFormatedNumberComponent
              title='Distance'
              digit={{...watchface.activity.distance}}
              onUpdate={updateDistance}
            />
          </Card.Body>
            ) : '' }
        </Card>
        <Card>
          <Card.Header
            title='Click to open / close'
            onClick={() => toggleStepProgress()}
            >
              Step Progress
            </Card.Header>
            { !watchface.stepsProgress.collapsed  ? (
              <Card.Body>
                <StepProgressComponent
                  progress={{...watchface.stepsProgress}}
                  title='Step progress'
                  onUpdate={updateStepProgress}
                />
            </Card.Body>
            ) : "" }
          </Card>
          <Card>
            <Card.Header
            title='Click to open / close'
            onClick={() => togglePulseProgress()}
            >
              Pulse Progress
            </Card.Header>
            { !watchface.pulseProgress.collapsed  ? (
              <Card.Body>
                <PulseProgressComponent
                  progress={{...watchface.pulseProgress}}
                  title='Pulse Progress'
                  onUpdate={updatePulseProgress}
                  
                />
            </Card.Body>
            ) : "" }
          </Card>
          <Card>
            <Card.Header
            title='Click to open / close'
            onClick={() => toggleCaloriesProgress()}
            >
              Calories Progress
            </Card.Header>
            { !watchface.caloriesProgress.collapsed  ? (
              <Card.Body>
                <ImageSetComponent
                  title='Image progress'
                  onUpdate={updateCaloriesIcon}
                  imageSet={{...watchface.caloriesProgress.icon}}
                /> 
                <CircleProgressComponent
                  title='Circle progress'
                  onUpdate={updateCaloriesCircle}
                  scale={{...watchface.caloriesProgress.circle}}
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
