import { IImage } from "../model/image.model";
import {  WatchStepsProgress } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawCircleProgress from "./circleProgress.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import drawLinearIconSet from "./linearIconSet.element";

export function drawStepProgress(ctx: CanvasRenderingContext2D,
    images: IImage[],
    stepProgress: WatchStepsProgress,
    watchState: WatchState,
    drawBorder: boolean,
    ) {
    if (!stepProgress) return;

    if (stepProgress.goalImage.enabled && watchState.steps >= watchState.stepsGoal){
        drawImage(ctx, images, stepProgress.goalImage.json)
    }
    if (stepProgress.gauge.enabled) {
        drawLinearIconSet(ctx, images, stepProgress.gauge.json, watchState.steps, watchState.stepsGoal)
    }
    if (stepProgress.circle.enabled) {
        drawCircleProgress(ctx, images, stepProgress.circle.json, watchState.steps, watchState.stepsGoal)
    }
    if (stepProgress.iconSet.enabled) {
        drawImageSet(ctx, images, stepProgress.iconSet.json, watchState.steps, watchState.stepsGoal, true)
    }
}