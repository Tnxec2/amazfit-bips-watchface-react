export class WatchState {
  _date = new Date();
  year = this._date.getFullYear();
  month = this._date.getMonth() + 1;
  monthasword = this._date.getMonth();
  day = this._date.getDate();
  hours = this._date.getHours();
  minutes = this._date.getMinutes();
  
  sunsetHours = 17;
  sunsetMinutes = 42;
  sunsetNoData = false;

  sunriseHours = 5;
  sunriseMinutes = 38;


  seconds = this._date.getSeconds();
  weekday = this._date.getDay() > 0 ? this._date.getDay() - 1 : 6;
  batteryGoal = 100;
  battery = Math.round(Math.random() * this.batteryGoal);
  stepsGoal = (Math.round(Math.random() * 5) + 5) * 1000;
  steps = Math.round(Math.random() * this.stepsGoal);
  caloriesGoal = 200;
  calories = Math.round(Math.random() * this.caloriesGoal);
  
  hearthrateGoal = 220
  hearthrate = Math.round(Math.random() * 200);
  hearthrateNoData = false;

  distance = Math.round(Math.random() * 1000) + 1000;
  
  paiGoal = 999;
  pai = Math.round(Math.random() * this.paiGoal);
  paiNoData = false;

  bluetooth = true;
  dnd = true;
  lock = false;
  alarm = true;
  
  temperature = Math.round(Math.random() * 10);

  temperatureMin = this.temperature - Math.round(Math.random() * 10)
  temperatureMax = this.temperature + Math.round(Math.random() * 10)
  weatherIcon = Math.round(Math.random() * 29);
  temperatureAlt = false;

  airQualityGoal = 500
  airQuality = Math.round(Math.random() * this.airQualityGoal)
  humidityGoal = 100
  humidity = Math.round(Math.random() * this.humidityGoal)
  
}
