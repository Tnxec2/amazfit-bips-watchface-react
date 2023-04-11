import { IImage } from "../model/image.model";
import { WatchTime } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage from "./digitImage.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import { drawTwoDigits } from "./separateDigits.element";

export default function drawTimeDigital(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    time: WatchTime,
    watchState: WatchState,
    digitBorder: boolean,
    sunsetNoData: boolean,
    ) {
    if (!time) return
   
    if (time.drawingOrder && time.drawingOrder.length === 4) {
        for (const s of time.drawingOrder) {
            switch (s) {
                case '1':
                    let tens = Math.floor(watchState.hours / 10)
                    drawImageSet(ctx, images, time.hours.json.Tens, tens, 10)
                    break;
                case '2':
                    let ones = watchState.hours % 10
                    drawImageSet(ctx, images, time.hours.json.Ones, ones, 10)
                    break;
                case '3':
                    let mtens = Math.floor(watchState.minutes / 10)
                    drawImageSet(ctx, images, time.minutes.json.Tens, mtens, 10)
                    break;
                case '4':
                    let mones = watchState.minutes % 10
                    drawImageSet(ctx, images, time.minutes.json.Ones, mones, 10)
                    break;
            
                default:
                    break;
            }
        }
    } else {
        if (time.hours.enabled) {
            drawTwoDigits(ctx, images, time.hours.json, watchState.hours, true)
        }
        if (time.minutes.enabled) {
            drawTwoDigits(ctx, images, time.minutes.json, watchState.minutes, true)
        }
    }
    if (time.seconds.enabled) {
        drawTwoDigits(ctx, images, time.seconds.json, watchState.seconds, true)
    }


    if (time.ampm.enabled) {
        if (watchState.hours < 12) {
            let img = findImageById(time.ampm.json.ImageIndexAMEN, images)
            if (img) {
                let x = time.ampm.json.X 
                let y = time.ampm.json.Y
                ctx.drawImage(img, x, y)
            }
        } else {
            let img = findImageById(time.ampm.json.ImageIndexPMEN, images)
            if (img) {
                let x = time.ampm.json.X 
                let y = time.ampm.json.Y
                ctx.drawImage(img, x, y)
            }
        }
    }

    if (time.sunriseHours.enabled){
        if (sunsetNoData) {
            if (time.sunriseHoursNoData.enabled) {
                drawImage(ctx, images, time.sunriseHoursNoData.json)
            } 
            if (time.sunriseMinutesNoData.enabled) {
                drawImage(ctx, images, time.sunriseMinutesNoData.json)
            }
            if (time.sunsetHoursNoData.enabled) {
                drawImage(ctx, images, time.sunsetHoursNoData.json)
            } 
            if (time.sunsetMinutesNoData.enabled) {
                drawImage(ctx, images, time.sunsetMinutesNoData.json)
            }
            return
        }
        drawDigitImage(ctx, images, time.sunriseHours, watchState.sunriseHours, digitBorder, 2, null, null, null, null)
    }
    if (time.sunriseMinutes.enabled){
        drawDigitImage(ctx, images, time.sunriseMinutes, watchState.sunriseMinutes, digitBorder, 2, null, null, null, null)
    }
    if (time.sunsetHours.enabled){
        drawDigitImage(ctx, images, time.sunsetHours, watchState.sunsetHours, digitBorder, 2, null, null, null, null)
    }
    if (time.sunsetMinutes.enabled){
        drawDigitImage(ctx, images, time.sunsetMinutes, watchState.sunsetMinutes, digitBorder, 2, null, null, null, null)
    }
}


