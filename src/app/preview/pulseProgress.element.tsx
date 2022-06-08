import { IImage } from "../model/image.model";
import { WatchPulseProgress } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import drawCircleProgress from "./circleProgress.element";
import drawImage from "./image.element";

export function drawPulseProgress(ctx: CanvasRenderingContext2D,
    images: IImage[],
    progress: WatchPulseProgress,
    watchState: WatchState,
    ) {
    if (!progress) return;

    if(watchState.hearthrate <= 100) drawImage(ctx, images, progress.image1.json)
    else if(watchState.hearthrate <= 120) drawImage(ctx, images, progress.image2.json)
    else if(watchState.hearthrate <= 140) drawImage(ctx, images, progress.image3.json)
    else if(watchState.hearthrate <= 160) drawImage(ctx, images, progress.image4.json)
    else if(watchState.hearthrate <= 180) drawImage(ctx, images, progress.image5.json)
    else drawImage(ctx, images, progress.image6.json)
    
    if (progress.circle.enabled) {
        drawCircleProgress(ctx, images, progress.circle.json, watchState.hearthrate, watchState.hearthrateGoal)
    }
}