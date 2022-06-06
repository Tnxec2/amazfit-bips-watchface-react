import { IImage } from "../model/image.model";
import { WatchDate } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { drawDigitsOneLine } from "./digitImage.element";
import drawImageSet from "./imageSet.element";


export default function drawDate(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    watchState: WatchState,
    drawborder: boolean
    ) {
        
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
            drawDigitImage(ctx, images, date.month, watchState.month, null, drawborder, date.twoDigitsMonth ? 2 : 1, null, null, null, null)
        } 
        if (date.day.enabled) {
            drawDigitImage(ctx, images, date.day, watchState.day, null, drawborder, date.twoDigitsDay ? 2 : 1, null, null, null, null)
        }
    }
    
    if (date.montName.enabled) 
        drawImageSet(ctx, images, date.montName.json, watchState.month-1, 12)

    if (date.weekday.enabled) 
        drawImageSet(ctx, images, date.weekday.json, watchState.weekday, 7)


    
}