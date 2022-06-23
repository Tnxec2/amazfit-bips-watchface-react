import { IImage } from "../model/image.model";
import { WatchBattery } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawCircleProgress from "./circleProgress.element";
import drawDigitImage from "./digitImage.element";
import drawImageSet from "./imageSet.element";
import drawLinearIconSet from "./linearIconSet.element";

export function drawBattery(ctx: CanvasRenderingContext2D,
    images: IImage[],
    battery: WatchBattery,
    watchState: WatchState,
    drawBorder: boolean,
    ) {
    if (!battery) return;
    if (battery.text.enabled) {
        drawDigitImage(ctx, images, battery.text.number, watchState.battery, drawBorder, 1, null,
            battery.text.iconimageindex, null, battery.text.suffix) 
    }
    if (battery.icon.enabled) {
        if (battery.icon.json.ImageIndex) {
            let img = findImageById(battery.icon.json.ImageIndex, images)
            if (img) ctx.drawImage(img, battery.icon.json.X, battery.icon.json.Y)
        }
    }
    if (battery.icon.enabled) {
        drawImageSet(ctx, images, battery.icon.json, watchState.battery, watchState.batteryGoal);
    }
    if (battery.scale.enabled) {
        drawLinearIconSet(ctx, images, battery.scale.json, watchState.battery, watchState.batteryGoal);
    }
    if (battery.circle.enabled) {
        drawCircleProgress(ctx, images, battery.circle.json, watchState.battery, watchState.batteryGoal);
    }


}