import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import NumberBlockComponent from "../../blocks/numberBlock.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchAQI, WatchCoordinates, WatchHumidity, WatchImageSet, WatchOneLineTemperature, WatchTextTemperature } from "../../model/watchFace.bips.model";
import WatchWeatherAqiComponent from "./aqi.component";
import CoordinatesComponent from "./coordinates.component";
import WatchWeatherHumidityComponent from "./humidity.component";
import ImageSetComponent from "./imageSet.component";
import WatchWeatherFormatedNumberComponent from "./weatherFormatedNumber.component";
import WatchWeatherOneLineTemperatureComponent from "./weatherOneLineTemperature.component";


const WeatherComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function udpateCurrent(d: WatchTextTemperature) {
    const w = {...watchface};
    w.weather.current = d
    setWatchface(w)
  }
  function updateOneLine(d: WatchOneLineTemperature) {
    const w = {...watchface};
    w.weather.todayOneLine = d
    setWatchface(w)
  }

  function udpateNight(d: WatchTextTemperature) {
    const w = {...watchface};
    w.weather.night = d
    setWatchface(w)
  }

  function udpateDay(d: WatchTextTemperature) {
    const w = {...watchface};
    w.weather.day = d
    setWatchface(w)
  }

  function udpateNightAltCoords(d: WatchCoordinates) {
    const w = {...watchface};
    w.weather.nightAltCoords = d
    setWatchface(w)
  }
  
  function udpateDayAltCoords(d: WatchCoordinates) {
    const w = {...watchface};
    w.weather.dayAltCoords = d
    setWatchface(w)
  }  
  

  function updateIcon(d: WatchImageSet) {
    const w = {...watchface};

    w.weather.icon.customIcon = d
    setWatchface(w)
  }
  function updateAqi(d: WatchAQI) {
    const w = {...watchface};

    w.weather.aqi = d
    setWatchface(w)
  }
  function updateHumidity(d: WatchHumidity) {
    const w = {...watchface};

    w.weather.humidity = d
    setWatchface(w)
  }


  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weather.collapsed = !w.weather.collapsed;
          setWatchface(w);
        }}>
        Weather
      </Card.Header>
      {!watchface.weather.collapsed ? (
        <Card.Body>
          <ImageSetComponent
            title='Icon'
            imageSet={{...watchface.weather.icon.customIcon}}
            onUpdate={updateIcon}
          />
      <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weather.temperatureCollapsed = !w.weather.temperatureCollapsed;
          setWatchface(w);
        }}>
        Temperature
      </Card.Header>
      {!watchface.weather.temperatureCollapsed ? (
        <Card.Body>
          <WatchWeatherFormatedNumberComponent
            title='Current'
            digit={{...watchface.weather.current}}
            onUpdate={udpateCurrent}
          />
          <WatchWeatherOneLineTemperatureComponent
            title='Today One Line'
            digit={{...watchface.weather.todayOneLine}}
            onUpdate={updateOneLine}
          />
          <WatchWeatherFormatedNumberComponent
            title='Today Separate Day'
            digit={{...watchface.weather.day}}
            onUpdate={udpateDay}
          />
          <WatchWeatherFormatedNumberComponent
            title='Today Separate Night'
            digit={{...watchface.weather.night}}
            onUpdate={udpateNight}
          />
          <CoordinatesComponent
            title='Alt Day Coordinates'
            coords={{...watchface.weather.dayAltCoords}}
            onUpdate={udpateDayAltCoords}
          />
          <CoordinatesComponent
            title='Alt Night Coordinates'
            coords={{...watchface.weather.nightAltCoords}}
            onUpdate={udpateNightAltCoords}
          />
          </Card.Body>
          ) : (
            ""
          )}
        </Card>
          <WatchWeatherAqiComponent
            aqi={{...watchface.weather.aqi}}
            onUpdate={updateAqi}
          />
          <WatchWeatherHumidityComponent
            humidity={{...watchface.weather.humidity}}
            onUpdate={updateHumidity}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default WeatherComponent;
