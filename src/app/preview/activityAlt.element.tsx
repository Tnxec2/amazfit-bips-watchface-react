import { IImage } from "../model/image.model";
import { WatchActivityAlt, WatchTime } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage, { drawDigitExtendedImage } from "./digitImage.element";
import drawImage from "./image.element";
import { drawTwoDigits } from "./separateDigits.element";

export default function drawActivitysAlt(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    al: WatchActivityAlt,
    watchState: WatchState,
    digitBorder: boolean
    ) {


    if (al.steps.enabled){
        drawDigitExtendedImage(ctx, images, al.steps, watchState.steps, digitBorder, 1, null, null, null, null)
    }
    if (al.battery.enabled){
        drawDigitExtendedImage(ctx, images, al.battery, watchState.battery, digitBorder, 1, null, null, null, al.batterySuffix)
    }
    if (al.calories.enabled){
        drawDigitExtendedImage(ctx, images, al.calories, watchState.calories, digitBorder, 1, null, null, null, null)
    }
    if (al.pulse.enabled){
        drawDigitExtendedImage(ctx, images, al.pulse, watchState.hearthrate, digitBorder, 1, null, null, null, null)
    }
    if (al.distance.enabled){
        drawDigitExtendedImage(ctx, images, al.distance, watchState.distance, digitBorder, 1, null, null, al.distanceDecimalPointer, null)
    }
    if (al.distanceSuffixKM.enabled)
        drawImage(ctx, images, al.distanceSuffixKM.json)
    if (al.distanceSuffixMi.enabled)
        drawImage(ctx, images, al.distanceSuffixMi.json)
    if (al.icon1.enabled)
        drawImage(ctx, images, al.icon1.json)
    if (al.icon2.enabled)
        drawImage(ctx, images, al.icon2.json)
    if (al.icon3.enabled)
        drawImage(ctx, images, al.icon3.json)
    if (al.icon4.enabled)
        drawImage(ctx, images, al.icon4.json)
    if (al.icon5.enabled)
        drawImage(ctx, images, al.icon5.json)
}


