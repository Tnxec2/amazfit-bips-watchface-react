import { IImage } from "../model/image.model";
import { WatchCaloriesFormatedNumber, WatchDistanceFormatedNumber, WatchPulseFormatedNumber, WatchStepPercentageFormatedNumber, WatchStepsFormatedNumber } from "../model/watchFace.bips.model";
import drawDigitImage from "./digitImage.element";

export function drawStepsGoal(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStepsFormatedNumber,
    value: number,
    drawBorder: boolean,
    ) {
    if (activity.number.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1)
    }
}

export function drawSteps(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStepsFormatedNumber ,
    value: number,
    drawBorder: boolean,
    ) {
    if (activity?.number?.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1, null, activity.prefix)
    }
}
export function drawCalories(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchCaloriesFormatedNumber ,
    value: number,
    drawBorder: boolean,
    ) {
    if (activity?.number?.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1, null, activity.prefix)
    }
}
export function drawPulse(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchPulseFormatedNumber ,
    value: number,
    drawBorder: boolean,
    noData: boolean,
    ) {
    if (activity?.number?.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1, null, null, null, activity.suffix, null, noData ? activity.noData : null)
    }
}
export function drawDistance(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchDistanceFormatedNumber ,
    value: number,
    drawBorder: boolean,
    ) {
    if (activity?.number?.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1, null, null, activity.decimalPointer, null, activity.suffix)
    }
}
export function drawStepPercentage(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStepPercentageFormatedNumber ,
    value: number,
    drawBorder: boolean,
    ) {
    if (activity?.number?.enabled) {
        drawDigitImage(ctx, images, activity.number, value, drawBorder, 1, null, null, null, activity.suffix)
    }
}