import { IImage } from "../model/image.model";
import {  WatchCaloriesProgress } from "../model/watchFace.bips.model";
import drawCircleProgress from "./circleProgress.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";

export function drawCalorieProgress(ctx: CanvasRenderingContext2D,
    images: IImage[],
    progress: WatchCaloriesProgress,
    value: number,
    total: number
    ) {
    if (!progress) return;
    
    if (progress.goalImage.enabled && value >= total){
        drawImage(ctx, images, progress.goalImage.json)
    }
    if (progress.icon.enabled) {
        drawImageSet(ctx, images, progress.icon.json, value, total)
    } 
    if (progress.circle.enabled) {
        drawCircleProgress(ctx, images, progress.circle.json, value, total)
    }
    
    
}