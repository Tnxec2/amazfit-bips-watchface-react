import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import WatchWeatherAqiComponent from "./aqi.component";
import CoordinatesComponent from "./coordinates.component";
import WatchWeatherHumidityComponent from "./humidity.component";
import ImageSetComponent from "./imageSet.component";
import WatchWeatherFormatedNumberComponent from "./weatherFormatedNumber.component";
import WatchWeatherOneLineTemperatureComponent from "./weatherOneLineTemperature.component";


const WeatherComponent: FC = () => {
  const { watchface, toggleWeather, toggleWeatherTemp,
    udpateWeatherCurrent, updateWeatherIcon, updateWeatherOneLine,
  udpateWeatherNight, udpateWeatherNightAltCoords,
udpateWeatherDay, udpateWeatherDayAltCoords,
updateWeatherAqi, updateWeatherHumidity } =
  useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => toggleWeather()}>
        Weather
      </Card.Header>
      {!watchface.weather.collapsed ? (
        <Card.Body>
          <ImageSetComponent
            title='Icon'
            imageSet={{...watchface.weather.customIcon}}
            onUpdate={updateWeatherIcon}
            disableCount={true}
          />
      <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => toggleWeatherTemp()}>
        Temperature
      </Card.Header>
      {!watchface.weather.temperatureCollapsed ? (
        <Card.Body>
          <WatchWeatherFormatedNumberComponent
            title='Current'
            digit={{...watchface.weather.current}}
            onUpdate={udpateWeatherCurrent}
          />
          <WatchWeatherOneLineTemperatureComponent
            title='Today One Line'
            digit={{...watchface.weather.todayOneLine}}
            onUpdate={updateWeatherOneLine}
          />
          <WatchWeatherFormatedNumberComponent
            title='Today Separate Day'
            digit={{...watchface.weather.day}}
            onUpdate={udpateWeatherDay}
          />
          <WatchWeatherFormatedNumberComponent
            title='Today Separate Night'
            digit={{...watchface.weather.night}}
            onUpdate={udpateWeatherNight}
          />
          <CoordinatesComponent
            title='Alt Day Coordinates'
            coords={{...watchface.weather.dayAltCoords}}
            onUpdate={udpateWeatherDayAltCoords}
          />
          <CoordinatesComponent
            title='Alt Night Coordinates'
            coords={{...watchface.weather.nightAltCoords}}
            onUpdate={udpateWeatherNightAltCoords}
          />
          </Card.Body>
          ) : (
            ""
          )}
        </Card>
          <WatchWeatherAqiComponent
            aqi={{...watchface.weather.aqi}}
            onUpdate={updateWeatherAqi}
          />
          <WatchWeatherHumidityComponent
            humidity={{...watchface.weather.humidity}}
            onUpdate={updateWeatherHumidity}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default WeatherComponent;
