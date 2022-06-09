import { IImage } from "../model/image.model";
import { WatchWeather } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { drawDigitsOneLine } from "./digitImage.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";


export function drawWeather(ctx: CanvasRenderingContext2D,
    images: IImage[],
    weather: WatchWeather,
    watchState: WatchState,
    drawBorder: boolean,
    ) {
    if (!weather) return;
    
    if (weather.icon?.enabled && weather.icon?.customIcon?.enabled) {
        drawImageSet(ctx, images, weather.icon.customIcon.json, watchState.weatherIcon, 26);
    }
    if (weather.current.enabled) {
        drawDigitImage(ctx, images, weather.current.number, watchState.temperature, drawBorder, 
            1, weather.current.minus, null, null, weather.current.degrees, null)
    }
    if (weather.todayOneLine.enabled) {
        let min = watchState.temperatureMin
        let max = watchState.temperatureMax
        let ar = [
            min.toString(),
            max.toString()
        ]
        drawDigitsOneLine(ctx, images, weather.todayOneLine.number, ar, weather.todayOneLine.delimiter, 
            drawBorder, weather.todayOneLine.degrees, null, weather.todayOneLine.minus, weather.todayOneLine.appendDegreesToBoth)
    } else {
        if ( weather.day.enabled) {
            drawDigitImage(ctx, images, weather.day.number, watchState.temperatureMax, drawBorder, 
                1, weather.day.minus, null, null, weather.day.degrees)
        }
        if ( weather.night.enabled) {
            drawDigitImage(ctx, images, weather.night.number, watchState.temperatureMin, drawBorder, 
                1, weather.night.minus, null, null, weather.night.degrees)
        }
    }
    // 
    if (weather.humidity?.icon?.enabled) {
        drawImage(ctx, images, weather.humidity.icon.json)
    }
    if (weather.humidity?.number?.enabled) {
        drawDigitImage(ctx, images, weather.humidity.number, watchState.humidity, drawBorder, 
            1, null, null, null, weather.humidity.suffix)
    }

    if (weather.aqi?.icon?.enabled) {
        drawImage(ctx, images, weather.aqi.icon.json)
    }
    if (weather.aqi.number.enabled) {
        drawDigitImage(ctx, images, weather.aqi.number, watchState.airQuality, drawBorder, 
            1, null, null, null, null)
    }
    

}