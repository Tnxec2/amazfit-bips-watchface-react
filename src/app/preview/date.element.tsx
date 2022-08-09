import { IImage } from "../model/image.model";
import { WatchDate, WatchDateExtended, WatchWeekdayStatus } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { drawDigitExtendedImage, drawDigitsOneLine } from "./digitImage.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import { drawFourDigits, drawTwoDigits } from "./separateDigits.element";


export default function drawDate(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    watchState: WatchState,
    drawborder: boolean
    ) {
    if (!date) return
    if (date.oneLine) {
        if (date.month.enabled) {
            let ar = [
                date.twoDigitsMonth ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                date.twoDigitsDay ? watchState.day.toString().padStart(2, '0') : watchState.day.toString(),
            ]
            drawDigitsOneLine(ctx, images, date.month, ar, date.oneLineDelimiter, drawborder)
        }
    } else {
        if (date.month.enabled) {
            drawDigitImage(ctx, images, date.month, watchState.month, drawborder, date.twoDigitsMonth ? 2 : 1, null, null, null, null)
        } 
        if (date.day.enabled) {
            drawDigitImage(ctx, images, date.day, watchState.day, drawborder, date.twoDigitsDay ? 2 : 1, null, null, null, null)
        }
    }
    
    if (date.montName.enabled) 
        drawImageSet(ctx, images, date.montName.json, watchState.month-1, 12)

    if (date.weekday.enabled) 
        drawImageSet(ctx, images, date.weekday.json, watchState.weekday, 7)


    if (date.monthAlt.enabled)
        drawDigitExtendedImage(ctx, images, date.monthAlt, watchState.month, drawborder, 2, null, null, null, null)
    
    if (date.dayAlt.enabled)
        drawDigitExtendedImage(ctx, images, date.dayAlt, watchState.day, drawborder, 2, null, null, null, null)
    
}

export function drawDateExt(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDateExtended,
    watchState: WatchState,
    drawborder: boolean
    ) {
    if (!date) return    
    if (date.years.enabled) 
        drawFourDigits(ctx, images, date.years.json, watchState.year, true)

    if (date.month.enabled) 
        drawTwoDigits(ctx, images, date.month.json, watchState.month, true)

    if (date.day.enabled) 
        drawTwoDigits(ctx, images, date.day.json, watchState.day, true)
    
}

export function drawWeekdayIconProgress(ctx: CanvasRenderingContext2D,
    images: IImage[],
    progress: WatchWeekdayStatus,
    watchState: WatchState,
    ) {
    if (!progress) return;

    switch (watchState.weekday) {
        case 0:
            drawImage(ctx, images, progress.Monday.json)
            break;
        case 1:
            drawImage(ctx, images, progress.Tuesday.json)
            break;
        case 2:
            drawImage(ctx, images, progress.Wednesday.json)
            break;
        case 3:
            drawImage(ctx, images, progress.Thursday.json)
            break;
        case 4:
            drawImage(ctx, images, progress.Friday.json)
            break;
        case 5:
            drawImage(ctx, images, progress.Saturday.json)
            break;
        case 6:
            drawImage(ctx, images, progress.Sunday.json)
            break;    
        default:
            break;
    }
    
}