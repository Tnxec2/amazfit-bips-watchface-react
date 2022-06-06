import { FC } from "react";
import ActivityListComponent from "../watchface/activitylist.component";
import BackgroundComponent from "../watchface/background.component";
import DateComponent from "../watchface/date.component";
import StatusComponent from "../watchface/status.component";
import TimeAnalogComponent from "../watchface/timeAnalog.component";
import TimeDigitalComponent from "../watchface/timeDigital.component";
import BatteryComponent from "./battery.component";
import WeatherComponent from "./weather.component";

const ScreenNormalcomponent: FC = () => {

  return (
    <>
      <BackgroundComponent />
      <TimeDigitalComponent />
      <TimeAnalogComponent />
      <DateComponent />
      <ActivityListComponent />
      <StatusComponent />
      <BatteryComponent /> 
      <WeatherComponent />
    </>
  );
};

export default ScreenNormalcomponent;
