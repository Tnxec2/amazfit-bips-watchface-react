import { FC, useContext, useMemo } from "react";
import { IWatchStateContext, WatchStateContext } from "../../context/watchstate.context";
import { WeatherStates } from "../../model/weather.states";

const PreviewStatesComponent: FC = () => {
  const { watchState, 
    updateDate, updateTime,
    changeSunriseHours, changeSunriseMinutes,
    changeSunsetHours, changeSunsetMinutes,
    changeBattery, changeSteps, changeCalories, changeStepsGoal,
    changeHeartrate, changeDistance, changePai,
    changeWeatherIcon, changeTemp, changeTempMax, changeTempMin,
    changeAQI, changeHumidity, 
    toggleAlarm, toggleBluetooth,
    toggleDND, toggleLock,
    toggleHeartrateNodata,
    togglePaiNodata,
    toggleSunsetNodata,
  } = useContext<IWatchStateContext>(WatchStateContext)
   
  const date = useMemo(
    () =>
      `${watchState.year.toString().padStart(4, "0")}-${watchState.month
        .toString()
        .padStart(2, "0")}-${watchState.day.toString().padStart(2, "0")}`,
    [watchState]
  );

  const time = useMemo(
    () =>
      `${watchState.hours.toString().padStart(2, "0")}:${watchState.minutes
        .toString()
        .padStart(2, "0")}:${watchState.seconds.toString().padStart(2, "0")}`,
    [watchState]
  );

  return (
    <div>
      <>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Date</span>
          <input
            type="date"
            className="form-control form-control-sm"
            value={date}
            onChange={(e) => updateDate(e.target.value)}
          />
          <span className="input-group-text">Time</span>
          <input
            type="time"
            className="form-control form-control-sm"
            step="1"
            value={time}
            onChange={(e) => updateTime(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Sunrise</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="23"
            value={watchState.sunriseHours}
            onChange={(e) => changeSunriseHours(e.target.value)}
          />
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="59"
            value={watchState.sunriseMinutes}
            onChange={(e) => changeSunriseMinutes(e.target.value)}
          />
          <span className="input-group-text">Sunset</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="23"
            value={watchState.sunsetHours}
            onChange={(e) => changeSunsetHours(e.target.value)}
          />
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="59"
            value={watchState.sunsetMinutes}
            onChange={(e) => changeSunsetMinutes(e.target.value)}
          />
          <span className="input-group-text" id="addon-wrapping">
            No data
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.sunsetNoData}
              onChange={toggleSunsetNodata}
            />
          </div>
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Battery</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="100"
            value={watchState.battery}
            onChange={(e) => changeBattery(e.target.value)}
          />
          <span className="input-group-text">Calories</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="9999"
            value={watchState.calories}
            onChange={(e) => changeCalories(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Steps</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="99999"
            value={watchState.steps}
            onChange={(e) => changeSteps(e.target.value)}
          />
          <span className="input-group-text">Steps Goal</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="99999"
            value={watchState.stepsGoal}
            onChange={(e) => changeStepsGoal(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Hearthrate</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max={watchState.hearthrateGoal}
            value={watchState.hearthrate}
            onChange={(e) => changeHeartrate(e.target.value)}
          />
          <span className="input-group-text" id="addon-wrapping">
            No data
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.hearthrateNoData}
              onChange={toggleHeartrateNodata}
            />
          </div>
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Distance</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="9999"
            value={watchState.distance}
            onChange={(e) => changeDistance(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">PAI</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max={watchState.paiGoal}
            value={watchState.pai}
            onChange={(e) => changePai(e.target.value)}
          />
          <span className="input-group-text" id="addon-wrapping">
            No data
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.paiNoData}
              onChange={togglePaiNodata}
            />
          </div>
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Weather Icon</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="25"
            value={watchState.weatherIcon}
            onChange={(e) => changeWeatherIcon(e.target.value)}
          />
          <span className="input-group-text">{WeatherStates.ar[watchState.weatherIcon]}</span>
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Current</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperature}
            onChange={(e) => changeTemp(e.target.value)}
          />
          <span className="input-group-text">Min</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperatureMin}
            onChange={(e) => changeTempMin(e.target.value)}
          />
          <span className="input-group-text">Max</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperatureMax}
            onChange={(e) => changeTempMax(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Air Quality</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="500"
            value={watchState.airQuality}
            onChange={(e) => changeAQI(e.target.value)}
          />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Humidity</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="100"
            value={watchState.humidity}
            onChange={(e) => changeHumidity(e.target.value)}
          />
        </div>

        <div className="input-group input-group-sm">
          <span className="input-group-text" id="addon-wrapping">
            Blutooth
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.bluetooth}
              onChange={toggleBluetooth}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            DnD
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.dnd}
              onChange={toggleDND}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            Alarm
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.alarm}
              onChange={toggleAlarm}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            Lock
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.lock}
              onChange={toggleLock}
            />
          </div>
        </div>
        
      </>
    </div>
  );
};

export default PreviewStatesComponent;
