import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import PulseProgressComponent from "./pulseProgress.component";
import StepProgressComponent from "./stepProgress.component";
import WatchStepsFormatedNumberComponent from "./stepsFormatedNumber.component";
import WatchCaloriesFormatedNumberComponent from "./caloriesFormatedNumber.component";
import WatchDistanceFormatedNumberComponent from "./distanceFormatedNumber.component";
import WatchPulseFormatedNumberComponent from "./pulseFormatedNumber.component";
import CaloriesProgressComponent from "./caloriesProgressComponent";
import WatchStepsPercentageFormatedNumberComponent from "./stepsPercentageFormatedNumber.component";

const ActivityListComponent: FC = () => {
  const { watchface, 
    toggleActivity, 
    toggleActivityNumber,
    updateSteps, 
    updateStepsGoal,
    updateHearthrate,
    updateCalories,  
    updateDistance,
    updateStepPercentage,
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
            <WatchStepsPercentageFormatedNumberComponent
              title='Steps Percentage'
              digit={{...watchface.activity.stepsPercentage}}
              onUpdate={updateStepPercentage}
            />
          </Card.Body>
            ) : '' }
        </Card>
          <StepProgressComponent />
          <PulseProgressComponent />
          <CaloriesProgressComponent />
        </Card.Body>
      ) : ""
      }
    </Card>

  </>
  );
};

export default ActivityListComponent;
