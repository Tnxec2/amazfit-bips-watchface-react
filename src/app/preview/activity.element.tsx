import { IImage } from "../model/image.model";
import { WatchFormatedNumber } from "../model/watchFace.bips.model";
import drawDigitImage from "./digitImage.element";

export function drawActivity(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchFormatedNumber,
    value: number,
    drawBorder: boolean,
    ) {
    if (!activity.enabled) return;
    if (activity.number.enabled) {
        drawDigitImage(ctx, images, activity.number, value, 
        null, drawBorder, 1, null,
        null, 
        activity.decimalPointer, 
        activity.suffix,
        activity.suffix)
    }
    
}