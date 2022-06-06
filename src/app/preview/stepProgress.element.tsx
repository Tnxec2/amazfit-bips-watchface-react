import { IImage } from "../model/image.model";
import { WatchFormatedNumber, WatchStepsProgress } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawCircleProgress from "./circleProgress.element";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";

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
        drawImageSet(ctx, images, stepProgress.gauge.json, watchState.steps, watchState.stepsGoal)
    }
    if (stepProgress.circle.enabled) {
        drawCircleProgress(ctx, images, stepProgress.circle.json, watchState.steps, watchState.stepsGoal)
    }
    if (stepProgress.linear.enabled) {
        drawIconSet(ctx, images, stepProgress.linear.json, watchState.steps, watchState.stepsGoal)
    }
}